import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert full-stack developer specializing in "Vibe Coding" and Tailwind CSS. 
Your task is to analyze the user's uploaded sketch/mockup and their provided design brief (the "vibe").

Based ONLY on the input, you MUST generate a COMPLETE, single-file HTML document using Tailwind CSS via CDN.
The output must be production-ready, responsive, and visually stunning.

RULES:
1. Output ONLY the raw HTML code. Do not wrap it in markdown code blocks (like \`\`\`html). Do not add explanations.
2. The HTML must include <script src="https://cdn.tailwindcss.com"></script> in the <head>.
3. Use FontAwesome or Heroicons SVG strings for icons if needed (do not rely on external icon CSS files unless using a reliable CDN).
4. Use https://picsum.photos/id/{id}/800/600 for placeholder images if the design requires images.
5. Ensure the design is responsive (mobile-first).
6. Interpret the "vibe" creatively. If they say "Cyberpunk", use neons and dark backgrounds. If "Corporate", use clean blues and whites.
`;

export const generateUIFromMultimodal = async (
  imageBase64: string,
  imageMimeType: string,
  promptText: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // High temperature for creative design interpretation
        temperature: 0.4, 
      },
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: imageMimeType
            }
          },
          {
            text: `Design Brief / Vibe: ${promptText || "Recreate this interface exactly as seen in the image, making it modern and responsive."}`
          }
        ]
      }
    });

    let code = response.text || "";

    // Cleanup: Remove markdown code blocks if the model adds them despite instructions
    code = code.replace(/```html/g, '').replace(/```/g, '');

    return code;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate UI.");
  }
};