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

export interface ReportData {
  overallScore: number;
  whatYouDidWell: string[];
  whatYouMissed: string[];
  decisionPath: string[];
  strongerApproach: string;
  nextPracticeFocus: string;
}

export interface UserInfo {
  email: string;
  profession: string;
  experience: string;
}
