// POST /api/estimate-food
// Body: { name: string, grams: string|number }
// Returns: { calories, protein, carbs, fat }
import { rateLimit, clientKey } from "./_ratelimit.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = clientKey(req);
  const { ok } = rateLimit(`estimate:${key}`, 40, 24 * 60 * 60 * 1000);
  if (!ok) {
    res.status(429).json({ error: "Rate limit exceeded" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: ANTHROPIC_API_KEY is not set" });
    return;
  }

  const { name, grams } = req.body || {};
  const cleanName = String(name || "").slice(0, 200).trim();
  const cleanGrams = String(grams || "").slice(0, 20).trim();
  if (!cleanName || !cleanGrams) {
    res.status(400).json({ error: "name and grams are required" });
    return;
  }

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
        max_tokens: 300,
        messages: [{
          role: "user",
          content: `Estimate the nutrition for ${cleanGrams}g of "${cleanName}". Respond with ONLY raw JSON, no markdown fences, no preamble, in exactly this shape: {"calories": number, "protein": number, "carbs": number, "fat": number}.`,
        }],
      }),
    });

    if (!anthropicResp.ok) {
      const errText = await anthropicResp.text();
      console.error("Anthropic API error:", anthropicResp.status, errText);
      res.status(502).json({ error: "Upstream AI request failed" });
      return;
    }

    const data = await anthropicResp.json();
    const text = (data.content || []).map((b) => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      res.status(502).json({ error: "Could not parse AI response" });
      return;
    }
    res.status(200).json(parsed);
  } catch (err) {
    console.error("estimate-food handler error:", err);
    res.status(500).json({ error: "Internal error" });
  }
}
