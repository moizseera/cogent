export type Screen =
  | "landing"
  | "challenge"
  | "final-recommendation"
  | "report"
  | "info-collection";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface UserDecision {
  step: number;
  userAction: string;
  aiSummary: string;
}

export interface JudgmentScore {
  clarifying: number;
  evidence: number;
  options: number;
  risk: number;
  judgment: number;
  total: number;
}

export interface CommunicationScore {
  clarity: number;
  reasoning: number;
  nuance: number;
  total: number;
}

export interface ReportData {
  overallScore: number;
  judgmentScore: JudgmentScore;
  communicationScore: CommunicationScore;
  scenarioSummary: string;
  keyDecisions: { decision: string; impact: string }[];
  judgmentBreakdown: {
    dimension: string;
    score: number;
    maxScore: number;
    whatYouDid: string;
    whatYouMissed: string;
  }[];
  communicationBreakdown: {
    aspect: string;
    score: number;
    maxScore: number;
    observation: string;
  }[];
  recommendation: string;
}

export interface UserInfo {
  email: string;
  profession: string;
  experience: string;
}
