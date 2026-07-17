// POST /api/coach
// Body: { system: string, messages: [{role, content}] }
// This is the ONLY place your Anthropic API key should ever live. It must be
// set as an environment variable (ANTHROPIC_API_KEY) in your hosting provider's
// dashboard — never commit it, never send it to the browser.
import { rateLimit, clientKey } from "./_ratelimit.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = clientKey(req);
  const { ok } = rateLimit(`coach:${key}`, 30, 24 * 60 * 60 * 1000); // 30 msgs/day/IP as a stopgap
  if (!ok) {
    res.status(429).json({ error: "Rate limit exceeded" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: ANTHROPIC_API_KEY is not set" });
    return;
  }

  const { system, messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages is required" });
    return;
  }
  // Cap input size defensively — a malicious client could otherwise send a huge
  // payload and burn tokens/money.
  const trimmedMessages = messages.slice(-10).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 4000),
  }));

  try {
    const anthropicResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: String(system || "").slice(0, 4000),
        messages: trimmedMessages,
      }),
    });

    if (!anthropicResp.ok) {
      const errText = await anthropicResp.text();
      console.error("Anthropic API error:", anthropicResp.status, errText);
      res.status(502).json({ error: "Upstream AI request failed" });
      return;
    }

    const data = await anthropicResp.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("coach handler error:", err);
    res.status(500).json({ error: "Internal error" });
  }
}
