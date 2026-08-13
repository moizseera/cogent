import type { ScenarioConfig } from "./types";

export const AMAZON_PHOTOS_SCENARIO: ScenarioConfig = {
  id: "amazon-photos-threat",
  title: "Amazon Makes Photo Storage Free",
  userRole:
    "You are the CEO of Google Photos. Your leadership team is waiting on your call on how to respond.",
  initialSituation:
    "Amazon has just announced unlimited free photo storage for everyone, with no subscription required. Google Photos' paid storage tiers look expensive and unnecessary by comparison overnight, and your team wants direction.",
  context:
    "Google Photos' storage tiers are bundled into Google One, which also covers Gmail and Drive storage — photo storage revenue is intertwined with that broader subscription business, not a separate line item you can freely discount. The announcement is a few hours old. Press is already asking for comment, and your product and finance teams are both waiting for direction.",
  stakeholders: [
    "Amazon — made the announcement, motives and true terms not yet fully known",
    "Google leadership and the board — want a fast, credible response, worried about optics",
    "Google One subscribers — pay partly for photo storage; matching the offer for free risks their goodwill",
    "Google Photos users — millions could churn to Amazon if the offer is compelling",
    "The press and analysts — already asking for a statement",
    "The engineering team — would have to build and ship any product response",
  ],
  hiddenFacts: [
    "Amazon's 'unlimited' free storage only applies to compressed, reduced-resolution photos — full-resolution originals and video still require a paid plan",
    "The offer is exclusive to Amazon Prime members, not the general public",
    "Amazon's storage cost economics work because compressed photos take a fraction of the space of what Google currently stores",
    "Google's storage revenue from Google One is a meaningful and growing part of Google's non-advertising revenue",
    "Engineering estimates a comparable compressed-tier product could ship in 6-8 weeks, not overnight",
    "Early data shows most Google Photos users rarely exceed the free 15GB tier — the paid tiers are used by a smaller, heavier subset of users",
    "No regulatory or antitrust review has been triggered by Amazon's move",
  ],
  possibleDevelopments: [
    "A journalist publishes a story asking whether Google will match Amazon's offer",
    "Finance flags the potential revenue impact of any free-tier expansion",
    "Someone on the team discovers Amazon's fine print about compression and Prime exclusivity",
    "The board asks for a public statement within 24 hours",
    "A competitor or analyst points out this could be a customer-acquisition play for Amazon Prime, not really about photos",
    "Engineering pushes back on any rushed technical commitment",
  ],
  constraints: [
    "Any public statement will be scrutinized and hard to walk back",
    "Storage revenue is bundled into Google One and can't be casually discounted without a broader pricing review",
    "A real product change takes real engineering time, not a same-day fix",
    "Reacting purely on headlines, before checking Amazon's actual terms, risks an unforced strategic error",
  ],
  decisionAreas: [
    "Whether to investigate Amazon's actual terms before reacting publicly",
    "Whether to match, differentiate, or ignore the offer",
    "What to say publicly, and when, versus what to do internally first",
    "Whether the real threat is to Google Photos specifically or to Google One as a bundle",
    "How to balance user retention against protecting existing subscription revenue",
  ],
  possibleConsequences: [
    "Rushing out a public statement before checking Amazon's fine print risks reacting to a threat that's smaller than it looks",
    "Ignoring the announcement publicly could look complacent if user churn follows",
    "Matching free unlimited storage without understanding the compression trade-off could commit to an unsustainable cost structure",
    "Overreacting could unsettle Google One subscribers who already pay for the exact thing Amazon claims to give away",
    "A measured, well-timed response that differentiates on quality (full-resolution, video, cross-product integration) could turn this into a non-event",
  ],
  evaluationDimensions: [
    "Did the user investigate the actual terms of Amazon's offer before reacting, rather than taking the headline at face value?",
    "Did the user recognize the bundled Google One revenue trade-off rather than treating storage as a free lever to pull?",
    "Did the user distinguish speed of public response from speed of actual product response?",
  ],
  difficulty: "advanced",
  chatImage: "/scenarios/amazon-photos.jpg",
};
