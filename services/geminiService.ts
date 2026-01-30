import { SonicConcept } from "../types";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = "https://api.deepseek.com/chat/completions";

export const generateSonicConcept = async (mood: string): Promise<SonicConcept> => {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API Key is missing");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are an avant-garde electronic musician and composer known for cinematic, texture-heavy soundscapes.
            Your task is to conceptualize a new music track based on a mood provided by the user.
            You MUST output ONLY a valid JSON object with the following structure:
            {
              "title": "An abstract, artistic track title",
              "texture": "A few words describing the audio texture (e.g., 'Granular, Ethereal, Gritty')",
              "instruments": ["instrument 1", "instrument 2", "instrument 3"],
              "poeticBrief": "A short, 2-sentence poetic description of the soundscape.",
              "synthSettings": "A technical suggestion for a synthesizer (e.g., 'Long attack, low-pass filter at 400Hz with high resonance')",
              "visualHex": "A hex color code that represents the mood (e.g., '#2b4561')"
            }`
          },
          {
            role: "user",
            content: `User Mood: "${mood}"`
          }
        ],
        response_format: {
          type: "json_object"
        },
        temperature: 1.2
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DeepSeek API error:", errorData);
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return JSON.parse(content) as SonicConcept;
  } catch (error) {
    console.error("AI generation error:", error);
    throw error;
  }
};