import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, count, note } = req.body;
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL is not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, count, note }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Script returned status ${response.status}: ${responseText}`);
    }

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Apps Script Error:", error);
    return res.status(500).json({ error: "Failed to save RSVP", details: error.message });
  }
}
