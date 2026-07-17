// Lightweight best-effort rate limiter (in-memory, per serverless instance).
// Good enough to stop a single abusive client from running up your Anthropic
// bill during early testing. NOT distributed — on Vercel each instance has its
// own memory, so a determined abuser could still get multiple instances' worth
// of quota. For real scale, replace this with Upstash Redis (a few lines, see
// README) or move rate-limiting into a proper backend with real user accounts.
const buckets = new Map();

export function rateLimit(key, limit = 20, windowMs = 24 * 60 * 60 * 1000) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return { ok: true };
  }
  if (entry.count >= limit) return { ok: false };
  entry.count += 1;
  return { ok: true };
}

export function clientKey(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}
