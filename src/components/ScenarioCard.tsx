"use client";

import type { ScenarioCatalogEntry } from "@/lib/scenarios";
import {
  AmazonPhotosIllustration,
  GarageJetEngineIllustration,
  AcquisitionOfferIllustration,
  ResearchEthicsIllustration,
} from "@/components/illustrations/ScenarioIllustrations";

const ILLUSTRATIONS = {
  "amazon-photos": AmazonPhotosIllustration,
  "garage-jet-engine": GarageJetEngineIllustration,
  "acquisition-offer": AcquisitionOfferIllustration,
  "research-ethics": ResearchEthicsIllustration,
};

interface ScenarioCardProps {
  entry: ScenarioCatalogEntry;
  onPractise: (scenarioId: string) => void;
}

export function ScenarioCard({ entry, onPractise }: ScenarioCardProps) {
  const Illustration = ILLUSTRATIONS[entry.illustration];
  const available = entry.status === "available";

  return (
    <div
      className={`group rounded-[28px] border p-5 sm:p-6 flex flex-col gap-4 transition-all bg-paper ${
        available
          ? "border-lavender-border hover:border-lavender-deep/50 hover:shadow-[0_8px_30px_rgba(139,127,217,0.18)] cursor-pointer"
          : "border-lavender-border/60 opacity-70"
      }`}
      onClick={() => available && onPractise(entry.scenarioId)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold tracking-wider text-lavender-deep bg-lavender px-3 py-1 rounded-full">
          {entry.category}
        </span>
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          {available ? entry.estimatedDuration : "Coming soon"}
        </span>
      </div>

      <div className="rounded-2xl bg-lavender/60 p-3 sm:p-4">
        <Illustration className="w-full h-auto" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-handwriting text-[28px] leading-[1.15] text-ink">
          {entry.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {entry.description}
        </p>
      </div>

      {available ? (
        <button
          className="mt-auto self-start flex items-center gap-2 bg-navy text-white text-sm font-medium px-5 py-2.5 rounded-full group-hover:bg-blue transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onPractise(entry.scenarioId);
          }}
        >
          <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-white" />
          Practise
        </button>
      ) : (
        <div className="mt-auto self-start text-sm font-medium text-muted-foreground px-5 py-2.5 rounded-full border border-lavender-border">
          {entry.difficulty} · Coming soon
        </div>
      )}
    </div>
  );
}
