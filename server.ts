import express from "express";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for RSVP
  app.post("/api/rsvp", async (req, res) => {
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
      console.log("Sending RSVP to Apps Script:", { name, count, note });
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, count, note }),
      });

      const responseText = await response.text();
      console.log("Apps Script response:", response.status, responseText);

      if (!response.ok) {
        throw new Error(`Script returned status ${response.status}: ${responseText}`);
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Apps Script Error:", error);
      res.status(500).json({ error: "Failed to save to Google Sheets", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
