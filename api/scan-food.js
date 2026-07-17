// POST /api/scan-food
// Body: { image: base64string (no data: prefix), mediaType: "image/jpeg" | "image/png" | ... }
// Returns: { name, calories, protein, carbs, fat, note }
import { rateLimit, clientKey } from "./_ratelimit.js";

const ALLOWED_MEDIA_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BASE64_LENGTH = 8_000_000; // ~6MB decoded, generous for a phone photo

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = clientKey(req);
  const { ok } = rateLimit(`scan:${key}`, 20, 24 * 60 * 60 * 1000);
  if (!ok) {
    res.status(429).json({ error: "Rate limit exceeded" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: ANTHROPIC_API_KEY is not set" });
    return;
  }

  const { image, mediaType } = req.body || {};
  if (!image || typeof image !== "string" || image.length > MAX_BASE64_LENGTH) {
    res.status(400).json({ error: "Invalid or missing image" });
    return;
  }
  if (!ALLOWED_MEDIA_TYPES.has(mediaType)) {
    res.status(400).json({ error: "Unsupported image type" });
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
        max_tokens: 500,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: image } },
            {
              type: "text",
              text: "Identify the food in this photo and estimate its nutrition for the visible portion. Respond with ONLY raw JSON, no markdown fences, no preamble, in exactly this shape: {\"name\": string, \"calories\": number, \"protein\": number, \"carbs\": number, \"fat\": number, \"note\": string}. The note should be one short sentence caveating that this is an estimate.",
            },
          ],
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
    console.error("scan-food handler error:", err);
    res.status(500).json({ error: "Internal error" });
  }
}
