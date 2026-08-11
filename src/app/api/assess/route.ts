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

function buildFallbackReport(): z.infer<typeof reportSchema> {
  return {
    overallScore: 50,
    judgmentScore: {
      clarifying: 7, evidence: 7, options: 7, risk: 7, judgment: 7, total: 35,
    },
    communicationScore: { clarity: 5, reasoning: 5, nuance: 5, total: 15 },
    scenarioSummary:
      "The user engaged with the scenario but the detailed assessment could not be generated. Please try again.",
    keyDecisions: [
      { decision: "Engaged with the scenario", impact: "Showed willingness to think through the problem" },
    ],
    judgmentBreakdown: [
      { dimension: "Clarifying the claim", score: 7, maxScore: 14, whatYouDid: "Engaged with the scenario", whatYouMissed: "Assessment unavailable" },
      { dimension: "Examining evidence", score: 7, maxScore: 14, whatYouDid: "Engaged with the scenario", whatYouMissed: "Assessment unavailable" },
      { dimension: "Generating options", score: 7, maxScore: 14, whatYouDid: "Engaged with the scenario", whatYouMissed: "Assessment unavailable" },
      { dimension: "Assessing risk", score: 7, maxScore: 14, whatYouDid: "Engaged with the scenario", whatYouMissed: "Assessment unavailable" },
      { dimension: "Making judgment calls", score: 7, maxScore: 14, whatYouDid: "Engaged with the scenario", whatYouMissed: "Assessment unavailable" },
    ],
    communicationBreakdown: [
      { aspect: "Clarity", score: 5, maxScore: 10, observation: "Assessment unavailable" },
      { aspect: "Reasoning quality", score: 5, maxScore: 10, observation: "Assessment unavailable" },
      { aspect: "Nuance", score: 5, maxScore: 10, observation: "Assessment unavailable" },
    ],
    recommendation: "Try the exercise again for a full assessment of your critical thinking skills.",
  };
}

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
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
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
      } catch (err) {
        console.error(`Report generation attempt ${attempt + 1} failed:`, err);
        if (attempt === 1) {
          return Response.json(buildFallbackReport());
        }
      }
    }
  }

  return Response.json({ error: "Unknown assessment type" }, { status: 400 });
}
