import type { ScenarioConfig } from "./types";

export const JET_ENGINE_SCENARIO: ScenarioConfig = {
  id: "jet-engine-claim",
  title: "The Garage Jet Engine",
  userRole:
    "A close friend of the inventor. They have called you for advice because they trust you and have nobody else to turn to yet.",
  initialSituation:
    "A close friend — quiet, unusually intelligent, not known for exaggerating — calls you, breathless with excitement. They say they've built a jet engine in their garage that is 50% more fuel-efficient than anything on the market, and they want your help figuring out what to do next.",
  context:
    "The friend has been working alone in their garage for three years. They have an engineering background but not specifically in aerospace. They funded the project themselves from savings. They have design files, notes, and video recordings of the engine running. They have not yet spoken to anyone else about it — no aviation expert, no patent attorney, no independent lab.",
  stakeholders: [
    "The friend (inventor) — trusts the user, wants validation and a path forward",
    "Potential independent testers or university labs — could verify or refute the claim",
    "A patent attorney — could help protect the invention, but costs time and money",
    "Potential investors or companies — could accelerate development, but introduce competing incentives",
  ],
  hiddenFacts: [
    "Their efficiency claim compares fuel consumption against estimated thrust, not a controlled side-by-side test",
    "They used garage-assembled measurement equipment, not calibrated lab equipment",
    "The engine has run for approximately 20 minutes in total, across all tests",
    "Some testing conditions were not documented consistently between runs",
    "Their comparison baseline is published manufacturer specifications, not a live competing engine",
    "Nobody independent has verified any part of the result",
    "They want to post a demonstration video online soon, before doing anything else",
    "Further testing in the garage could be genuinely dangerous (fuel, heat, structural integrity, noise)",
  ],
  possibleDevelopments: [
    "The friend pushes to post a public demo video before any verification",
    "A university lab or independent engineer could run a real test, if approached",
    "A patent attorney could clarify what protection exists and what going public would forfeit",
    "A conversation with an investor or company could surface funding, but also loss of control",
    "Further self-testing could produce a safety incident",
  ],
  constraints: [
    "The friend funded this alone and has limited money for professional testing or legal help",
    "There is real time pressure — they are eager to move fast and go public",
    "Nothing about the claim has been independently verified yet",
  ],
  decisionAreas: [
    "Whether and how to verify the efficiency claim before acting on it",
    "Whether to protect the invention (patent, NDA, documentation) before showing it to anyone else",
    "Who, if anyone, to bring in, and in what order (testers, attorney, investors, press)",
    "How to handle the friend's desire to post a public demo immediately",
    "How to weigh speed against safety, cost, and thoroughness",
  ],
  possibleConsequences: [
    "Posting publicly before verification risks credibility loss if the claim doesn't hold up",
    "Posting publicly before filing any IP protection risks losing patent rights or being copied",
    "Independent verification costs time and money the friend may not readily have",
    "Bringing in investors too early can dilute control; too late can mean missing a window",
    "Continued unsafe garage testing could cause real physical harm",
  ],
  evaluationDimensions: [
    "Evidence scrutiny — did the user probe how the claim was actually measured?",
    "Risk identification — safety, legal/IP, financial, and credibility risks",
    "Sequencing — did the user reason about a sensible order of actions, not just a list of them?",
  ],
  difficulty: "intermediate",
  chatImage: "/scenarios/jet-engine.jpg",
};
