import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateImage() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  console.log("Generating twins image...");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            text: "A fun, modern, flat vector illustration of two identical twin brothers standing side-by-side, celebrating their 30th birthday. The man on the left wears a dark navy blue polo shirt with a collar, has short brown hair, hands on his hips, and is smiling broadly. The man on the right wears a dark grey t-shirt, has short brown hair, arms crossed over his chest, and is smiling. Background: simple abstract festive shapes in lime green, yellow, and emerald, suitable for a garden party invitation. Style: clean lines, vibrant colors, friendly cartoon avatar style, high quality vector art.",
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate) {
      throw new Error("No candidates returned");
    }

    let imageBase64: string | undefined;

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        imageBase64 = part.inlineData.data;
        break;
      }
    }

    if (!imageBase64) {
      throw new Error("No image data found in response");
    }

    const buffer = Buffer.from(imageBase64, "base64");
    const publicDir = path.resolve(__dirname, "public");

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, "twins.jpeg");
    fs.writeFileSync(outputPath, buffer);

    console.log(`Image saved to ${outputPath}`);
  } catch (error) {
    console.error("Error generating image:", error);
    process.exit(1);
  }
}

generateImage();
