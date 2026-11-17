// Store only a request fingerprint and receipt, never the lead's personal data.
type Receipt = { id: string; qualified: boolean; delivered: boolean };
type Entry = { fingerprint: string; receipt?: Receipt; expires: number };
const local = new Map<string, Entry>();
const retention = 86400;
async function command(args: unknown[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return undefined;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) throw new Error("Receipt store unavailable");
  const body = await response.json();
  if (body.error) throw new Error("Receipt store command failed");
  return { result: body.result };
}
export async function beginLead(
  id: string,
  fingerprint: string,
): Promise<"new" | "pending" | "conflict" | Receipt> {
  const key = `lead-request:${id}`;
  const now = Date.now();
  const entry: Entry = { fingerprint, expires: now + 60000 };
  const result = await command([
    "EVAL",
    "local old=redis.call('GET',KEYS[1]); if old then return old end; redis.call('SET',KEYS[1],ARGV[1],'EX',60); return ''",
    1,
    key,
    JSON.stringify(entry),
  ]);
  let old: Entry | undefined;
  if (result) {
    if (result.result === "") return "new";
    old = JSON.parse(result.result);
  } else {
    if (process.env.VERCEL) throw new Error("Receipt store not configured");
    local.forEach((v, k) => {
      if (v.expires <= now) local.delete(k);
    });
    old = local.get(key);
    if (!old) {
      local.set(key, entry);
      return "new";
    }
  }
  if (old?.fingerprint !== fingerprint) return "conflict";
  return old.receipt || "pending";
}
export async function finishLead(
  id: string,
  fingerprint: string,
  receipt: Receipt,
) {
  const key = `lead-request:${id}`;
  const entry: Entry = {
    fingerprint,
    receipt,
    expires: Date.now() + retention * 1000,
  };
  const result = await command([
    "SET",
    key,
    JSON.stringify(entry),
    "EX",
    retention,
  ]);
  if (!result) {
    if (process.env.VERCEL) throw new Error("Receipt store not configured");
    local.set(key, entry);
  }
}
