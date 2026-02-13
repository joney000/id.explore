
import { GoogleGenAI, Type } from "@google/genai";
import { IdentityResult } from "../types";

export const fetchIdentityData = async (name: string): Promise<IdentityResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Perform a deep analysis for the identity: "${name}".
  
  Step 1: Determine if "${name}" is a Person, Object, or Place.
  Step 2: Search for and provide:
  - A brief 2-sentence summary of the identity.
  - A list of relevant academic papers, PDFs, or formal documents.
  - A list of high-quality image sources, galleries, or photo records.
  - A list of relevant videos (YouTube, Vimeo, educational archives).

  Return the data in strict JSON format. Ensure all strings use black/high-contrast descriptive text.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            category: { 
              type: Type.STRING,
              description: "Must be one of: 'Person', 'Object', or 'Place'"
            },
            summary: { type: Type.STRING },
            papers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                  source: { type: Type.STRING },
                  snippet: { type: Type.STRING }
                },
                required: ["title", "url"]
              }
            },
            images: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                  platform: { type: Type.STRING }
                },
                required: ["title", "url"]
              }
            },
            videos: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                  platform: { type: Type.STRING }
                },
                required: ["title", "url"]
              }
            }
          },
          required: ["name", "category", "summary", "papers", "images", "videos"]
        }
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as IdentityResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch structured identity data. This may be due to a complex query or API limitations.");
  }
};
