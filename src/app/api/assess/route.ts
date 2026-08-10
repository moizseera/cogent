import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";

import { REPORT_ASSESSMENT_PROMPT } from "@/lib/prompts";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

const reportSchema = z.object({
  overallScore: z.number(),
  judgmentScore: z.object({
    clarifying: z.number(),
    evidence: z.number(),
    options: z.number(),
    risk: z.number(),
    judgment: z.number(),
    total: z.number(),
  }),
  communicationScore: z.object({
    clarity: z.number(),
    reasoning: z.number(),
    nuance: z.number(),
    total: z.number(),
  }),
  scenarioSummary: z.string(),
  keyDecisions: z.array(
    z.object({
      decision: z.string(),
      impact: z.string(),
    })
  ),
  judgmentBreakdown: z.array(
    z.object({
      dimension: z.string(),
      score: z.number(),
      maxScore: z.number(),
      whatYouDid: z.string(),
      whatYouMissed: z.string(),
    })
  ),
  communicationBreakdown: z.array(
    z.object({
      aspect: z.string(),
      score: z.number(),
      maxScore: z.number(),
      observation: z.string(),
    })
  ),
  recommendation: z.string(),
});

export async function POST(req: Request) {
  const { type, transcripts, decisions, finalRecommendation } =
    await req.json();

  const transcriptText = (transcripts || []).join("\n\n---\n\n");
  const decisionsText = (decisions || [])
    .map(
      (d: { step: number; userAction: string; aiSummary: string }) =>
        `Step ${d.step}: ${d.userAction}`
    )
    .join("\n");

  if (type === "report") {
    const { object } = await generateObject({
      model: groq("llama-3.3-70b-versatile"),
      schema: reportSchema,
      prompt: `${REPORT_ASSESSMENT_PROMPT}

User transcripts:
${transcriptText}

User decisions:
${decisionsText}

Final recommendation:
${finalRecommendation || "No final recommendation provided"}

Generate the complete report with accurate scores.
- judgmentScore.total must equal the sum of its 5 sub-scores (each out of 14, total out of 70)
- communicationScore.total must equal the sum of its 3 sub-scores (each out of 10, total out of 30)
- overallScore must equal judgmentScore.total + communicationScore.total (out of 100)
- judgmentBreakdown must have exactly 5 items with maxScore 14 each
- communicationBreakdown must have exactly 3 items with maxScore 10 each
- keyDecisions should have 3-5 items`,
    });
    return Response.json(object);
  }

  return Response.json({ error: "Unknown assessment type" }, { status: 400 });
}
