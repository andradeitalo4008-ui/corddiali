import { createHash } from "node:crypto";
const attempts = new Map<string, { count: number; reset: number }>();
const windowMs = 15 * 60 * 1000;
export async function rateLimit(ip: string): Promise<boolean> {
  const key = createHash("sha256").update(ip).digest("hex");
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    // Atomic fixed window counter shared across all Vercel function instances.
    const bucket = Math.floor(Date.now() / windowMs);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n",
        1,
        `lead:${key}:${bucket}`,
      ]),
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error("Rate limit storage unavailable");
    const body = await response.json();
    if (body.error || typeof body.result !== "number")
      throw new Error("Rate limit storage invalid response");
    return body.result <= 5;
  }
  // Local development only: never silently disable distributed protection in Vercel.
  if (process.env.VERCEL)
    throw new Error("Configure distributed rate limiting");
  const now = Date.now();
  attempts.forEach((entry, k) => {
    if (entry.reset <= now) attempts.delete(k);
  });
  const entry = attempts.get(key) || { count: 0, reset: now + windowMs };
  entry.count++;
  attempts.set(key, entry);
  return entry.count <= 5;
}
