export interface ScenarioConfig {
  id: string;
  title: string;
  userRole: string;
  initialSituation: string;
  context: string;
  stakeholders: string[];
  hiddenFacts: string[];
  possibleDevelopments: string[];
  constraints: string[];
  decisionAreas: string[];
  possibleConsequences: string[];
  evaluationDimensions: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  rules?: string;
  chatImage?: string;
}
