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
    const body = JSON.stringify({ name, count, note });

    // Google Apps Script flow:
    // 1. POST to the script URL → data is written, responds with 302 redirect
    // 2. Follow the redirect with GET → returns the JSON response
    let response = await fetch(scriptUrl, {
      method: "POST",
      redirect: "manual",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (response.status >= 300 && response.status < 400) {
      const redirectUrl = response.headers.get("location");
      if (redirectUrl) {
        response = await fetch(redirectUrl, { method: "GET" });
      }
    }

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
