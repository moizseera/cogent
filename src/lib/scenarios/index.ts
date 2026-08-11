import { JET_ENGINE_SCENARIO } from "./jet-engine";
import type { ScenarioConfig } from "./types";

export const SCENARIOS: Record<string, ScenarioConfig> = {
  [JET_ENGINE_SCENARIO.id]: JET_ENGINE_SCENARIO,
};

export const DEFAULT_SCENARIO_ID = JET_ENGINE_SCENARIO.id;

export function getScenario(id: string | undefined | null): ScenarioConfig {
  return (id && SCENARIOS[id]) || SCENARIOS[DEFAULT_SCENARIO_ID];
}

export type { ScenarioConfig };
