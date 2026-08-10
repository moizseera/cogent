"use client";

import { useAppStore } from "@/lib/store";
import { LandingScreen } from "@/components/screens/LandingScreen";
import { ChallengeScreen } from "@/components/screens/ChallengeScreen";
import { FinalRecommendationScreen } from "@/components/screens/FinalRecommendationScreen";
import { ReportScreen } from "@/components/screens/ReportScreen";
import { InfoCollectionScreen } from "@/components/screens/InfoCollectionScreen";

const screens = {
  landing: LandingScreen,
  challenge: ChallengeScreen,
  "final-recommendation": FinalRecommendationScreen,
  report: ReportScreen,
  "info-collection": InfoCollectionScreen,
} as const;

export default function Home() {
  const screen = useAppStore((s) => s.screen);
  const Screen = screens[screen];

  return <Screen />;
}
