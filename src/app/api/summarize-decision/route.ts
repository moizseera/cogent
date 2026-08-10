import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

import { FINAL_RECOMMENDATION_PROMPT } from "@/lib/prompts";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { userDecision } = await req.json();

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: `${FINAL_RECOMMENDATION_PROMPT}\n\nUser's words:\n"${userDecision}"`,
  });

  return Response.json({ summary: text });
}
