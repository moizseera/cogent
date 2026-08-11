import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

import { buildScenarioSystemPrompt } from "@/lib/prompts";
import { getScenario } from "@/lib/scenarios";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { messages, scenarioId, conversationHistory, turnCount } =
    await req.json();

  const scenario = getScenario(scenarioId);

  const systemPrompt = buildScenarioSystemPrompt(
    scenario,
    conversationHistory || "",
    turnCount || 0
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
