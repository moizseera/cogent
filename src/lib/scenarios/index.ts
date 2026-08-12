import { JET_ENGINE_SCENARIO } from "./jet-engine";
import { AMAZON_PHOTOS_SCENARIO } from "./amazon-photos";
import type { ScenarioConfig } from "./types";

export const SCENARIOS: Record<string, ScenarioConfig> = {
  [JET_ENGINE_SCENARIO.id]: JET_ENGINE_SCENARIO,
  [AMAZON_PHOTOS_SCENARIO.id]: AMAZON_PHOTOS_SCENARIO,
};

export const DEFAULT_SCENARIO_ID = JET_ENGINE_SCENARIO.id;

export function getScenario(id: string | undefined | null): ScenarioConfig {
  return (id && SCENARIOS[id]) || SCENARIOS[DEFAULT_SCENARIO_ID];
}

export type { ScenarioConfig };
export { SCENARIO_CATALOG } from "./catalog";
export type { ScenarioCatalogEntry, ScenarioIllustrationKey } from "./catalog";
