import {
  createCipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";
import type { LeadInput } from "./lead";

export type Lead = LeadInput & {
  id: string;
  created_at: string;
  qualified: boolean;
};
export type Channel = "email" | "telegram" | "webhook";
type Status = "pending" | "sent" | "failed" | "disabled";
export type RecordEntry = {
  lead: Lead;
  fingerprint: string;
  channels: Record<Channel, Status>;
  status: "pending" | "complete";
};
const index = "corddiali:pending";
const key = (id: string) => "corddiali:lead:" + id;

async function command<T>(...args: (string | number)[]): Promise<T> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Missing lead storage");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(2500),
  });
  if (!response.ok) throw new Error("Storage unavailable");
  const body = await response.json();
  if (body.error || !("result" in body))
    throw new Error("Storage command failed");
  return body.result;
}

export function newEntry(lead: Lead, fingerprint: string): RecordEntry {
  return {
    lead,
    fingerprint,
    status: "pending",
    channels: {
      email: "pending",
      telegram: "pending",
      webhook: process.env.LEAD_WEBHOOK_URL ? "pending" : "disabled",
    },
  };
}

export async function save(entry: RecordEntry) {
  const { id } = entry.lead;
  const old = await command<string | null>(
    "EVAL",
    `
    local old = redis.call('GET', KEYS[1])
    if old then return old end
    redis.call('ZADD', KEYS[2], ARGV[2], ARGV[3])
    redis.call('SET', KEYS[1], ARGV[1])
    return false`,
    2,
    key(id),
    index,
    JSON.stringify(entry),
    Date.now(),
    id,
  );
  return old === null ? null : (JSON.parse(old) as RecordEntry);
}

export function backup(entry: RecordEntry) {
  // A recovery operator can decrypt with the admin secret active at the time.
  const secret = process.env.LEADS_ADMIN_TOKEN;
  if (!secret) throw new Error("Recovery key unavailable");
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    createHash("sha256")
      .update("corddiali-recovery-v1\0")
      .update(secret)
      .digest(),
    iv,
  );
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(entry)),
    cipher.final(),
  ]);
  console.error(
    JSON.stringify({
      event: "lead_recovery_v1",
      id: entry.lead.id,
      iv: iv.toString("base64"),
      tag: cipher.getAuthTag().toString("base64"),
      ciphertext: ciphertext.toString("base64"),
    }),
  );
}

export async function claim(id: string) {
  const token = randomUUID();
  const raw = await command<string | null>(
    "EVAL",
    `
    local raw = redis.call('GET', KEYS[1])
    if not raw or cjson.decode(raw).status ~= 'pending' then return false end
    if not redis.call('SET', KEYS[2], ARGV[1], 'NX', 'EX', 45) then return false end
    return raw`,
    2,
    key(id),
    key(id) + ":lease",
    token,
  );
  return raw ? { entry: JSON.parse(raw) as RecordEntry, token } : null;
}

export async function finish(entry: RecordEntry, token: string) {
  const id = entry.lead.id;
  const result = await command<number>(
    "EVAL",
    `
    if redis.call('GET', KEYS[2]) ~= ARGV[1] then return 0 end
    redis.call('SET', KEYS[1], ARGV[2])
    if ARGV[3] == 'complete' then redis.call('ZREM', KEYS[3], ARGV[4]) end
    redis.call('DEL', KEYS[2])
    return 1`,
    3,
    key(id),
    key(id) + ":lease",
    index,
    token,
    JSON.stringify(entry),
    entry.status,
    id,
  );
  if (result !== 1) throw new Error("Delivery lease expired");
}

export async function pending(offset: number) {
  const ids = await command<string[]>("ZRANGE", index, offset, offset + 49);
  if (!ids.length) return [];
  const records = await command<(string | null)[]>("MGET", ...ids.map(key));
  return records
    .flatMap((raw) => (raw ? [JSON.parse(raw) as RecordEntry] : []))
    .filter((entry) => entry.status === "pending");
}
