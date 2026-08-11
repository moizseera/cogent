import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";

import { buildFinalAssessmentPrompt } from "@/lib/prompts";
import { getScenario } from "@/lib/scenarios";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

const reportSchema = z.object({
  overallScore: z.number(),
  whatYouDidWell: z.array(z.string()).length(3),
  whatYouMissed: z.array(z.string()).length(3),
  decisionPath: z.array(z.string()),
  strongerApproach: z.string(),
  nextPracticeFocus: z.string(),
});

function buildFallbackReport(): z.infer<typeof reportSchema> {
  return {
    overallScore: 50,
    whatYouDidWell: [
      "Engaged with the scenario and worked through the situation",
      "Asked at least one clarifying question",
      "Reached a final recommendation",
    ],
    whatYouMissed: [
      "A detailed assessment could not be generated this time",
      "Try the exercise again for a full evaluation",
      "Consider re-submitting your final recommendation",
    ],
    decisionPath: [
      "Engaged with the scenario",
      "Reached a final recommendation",
    ],
    strongerApproach:
      "The detailed assessment could not be generated. Try the exercise again for a full evaluation of your approach.",
    nextPracticeFocus: "Try the exercise again for a full evaluation.",
  };
}

export async function POST(req: Request) {
  const { type, transcripts, finalRecommendation, scenarioId } =
    await req.json();

  if (type !== "report") {
    return Response.json({ error: "Unknown assessment type" }, { status: 400 });
  }

  const scenario = getScenario(scenarioId);
  const transcriptText = (transcripts || []).join("\n\n---\n\n");

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { object } = await generateObject({
        model: groq("llama-3.3-70b-versatile"),
        schema: reportSchema,
        providerOptions: { groq: { structuredOutputs: false } },
        prompt: `${buildFinalAssessmentPrompt(scenario)}

TRANSCRIPT:
${transcriptText}

FINAL RECOMMENDATION:
${finalRecommendation || "No final recommendation provided"}`,
      });
      return Response.json(object);
    } catch (err) {
      console.error(`Report generation attempt ${attempt + 1} failed:`, err);
      if (attempt === 1) {
        return Response.json(buildFallbackReport());
      }
    }
  }
}
