import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

import { buildNarratorSystemPrompt } from "@/lib/prompts";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { messages, currentStep, decisionCount, conversationHistory } =
    await req.json();

  const systemPrompt = buildNarratorSystemPrompt(
    currentStep || 1,
    decisionCount || 0,
    conversationHistory || ""
  );

  const chatMessages =
    messages && messages.length > 0
      ? messages
      : [{ role: "user" as const, content: "Begin the scenario." }];

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: systemPrompt,
    messages: chatMessages,
  });

  return result.toTextStreamResponse();
}
