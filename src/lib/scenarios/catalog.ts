export type ScenarioIllustrationKey =
  | "amazon-photos"
  | "garage-jet-engine"
  | "acquisition-offer"
  | "research-ethics";

export type PracticeMode = "judgment" | "conversation";

export interface ScenarioCatalogEntry {
  scenarioId: string;
  title: string;
  description: string;
  category: string;
  illustration: ScenarioIllustrationKey;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  status: "available" | "coming-soon";
  skillTags: string[];
  mode: PracticeMode;
}

export const SCENARIO_CATALOG: ScenarioCatalogEntry[] = [
  {
    scenarioId: "amazon-photos-threat",
    title: "Amazon Makes Photo Storage Free",
    description:
      "You are the CEO of Google Photos. Amazon has just announced unlimited free photo storage. What do you do?",
    category: "STRATEGY",
    illustration: "amazon-photos",
    difficulty: "Advanced",
    estimatedDuration: "~5 min",
    status: "available",
    skillTags: ["Competitive strategy", "Business model thinking", "Prioritization"],
    mode: "judgment",
  },
  {
    scenarioId: "jet-engine-claim",
    title: "The Garage Jet Engine",
    description:
      "Your exceptionally intelligent friend tells you they've built a jet engine that is 50% more fuel-efficient than existing engines. What do you do?",
    category: "OPPORTUNITY",
    illustration: "garage-jet-engine",
    difficulty: "Intermediate",
    estimatedDuration: "~5 min",
    status: "available",
    skillTags: ["Critical evaluation", "Risk assessment", "Decision-making"],
    mode: "judgment",
  },
  {
    scenarioId: "",
    title: "The Acquisition Offer",
    description:
      "Your startup just received a surprise acquisition offer. The board is split, and the deadline is 48 hours.",
    category: "LEADERSHIP",
    illustration: "acquisition-offer",
    difficulty: "Advanced",
    estimatedDuration: "~20 min",
    status: "coming-soon",
    skillTags: ["Stakeholder management", "Negotiation", "Strategic thinking"],
    mode: "conversation",
  },
  {
    scenarioId: "",
    title: "The Research Ethics Dilemma",
    description:
      "A colleague's groundbreaking paper has data inconsistencies. Reporting it could end their career. Ignoring it could harm patients.",
    category: "EVIDENCE",
    illustration: "research-ethics",
    difficulty: "Advanced",
    estimatedDuration: "~15 min",
    status: "coming-soon",
    skillTags: ["Ethical reasoning", "Evidence analysis", "Communication"],
    mode: "conversation",
  },
];
