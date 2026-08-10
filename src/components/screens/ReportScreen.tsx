"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import type { ReportData } from "@/lib/types";

function ScoreRing({
  score,
  max,
  size = 80,
  label,
}: {
  score: number;
  max: number;
  size?: number;
  label: string;
}) {
  const pct = Math.round((score / max) * 100);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-blue transition-all duration-1000"
        />
      </svg>
      <div className="text-center -mt-[calc(50%+8px)] mb-4">
        <div className="text-lg font-bold text-navy">{score}</div>
        <div className="text-[10px] text-muted-foreground">/{max}</div>
      </div>
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

function ScoreBar({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">
          {score}/{max}
        </span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-blue rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function ReportScreen() {
  const {
    allTranscripts,
    decisions,
    finalRecommendation,
    report,
    setReport,
    setScreen,
    setIsLoading,
  } = useAppStore();

  const [loading, setLoading] = useState(!report);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (report) return;

    const fetchReport = async () => {
      setLoading(true);
      setIsLoading(true);
      try {
        const res = await fetch("/api/assess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "report",
            transcripts: allTranscripts,
            decisions,
            finalRecommendation,
          }),
        });
        const data: ReportData = await res.json();
        setReport(data);
      } catch {
        console.error("Failed to fetch report");
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [allTranscripts, decisions, finalRecommendation, report, setReport, setIsLoading]);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">
            Generating your report...
          </p>
          <p className="text-xs text-muted-foreground">
            Analysing your decisions and communication
          </p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const sections = [
    "Overview",
    "Key Decisions",
    "Judgment",
    "Communication",
    "Next Steps",
  ];

  return (
    <div className="min-h-dvh px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-navy">Your Report</h1>
          <p className="text-muted-foreground">
            The Jet Engine Claim
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <ScoreRing
            score={report.overallScore}
            max={100}
            size={100}
            label="Overall"
          />
          <ScoreRing
            score={report.judgmentScore.total}
            max={70}
            label="Judgment"
          />
          <ScoreRing
            score={report.communicationScore.total}
            max={30}
            label="Communication"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveSection(i)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                activeSection === i
                  ? "bg-blue text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {activeSection === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-navy">
              Scenario Summary
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {report.scenarioSummary}
            </p>
          </div>
        )}

        {activeSection === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-navy">
              Key Decisions
            </h2>
            <div className="space-y-3">
              {report.keyDecisions.map((kd, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">{kd.decision}</p>
                  <p className="text-sm text-muted-foreground">{kd.impact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-navy">
              Judgment Breakdown
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {report.judgmentScore.total}/70
              </span>
            </h2>
            <div className="space-y-4">
              {report.judgmentBreakdown.map((dim) => (
                <div key={dim.dimension} className="space-y-3">
                  <ScoreBar
                    label={dim.dimension}
                    score={dim.score}
                    max={dim.maxScore}
                  />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-light rounded-lg p-3">
                      <div className="text-xs font-medium text-blue mb-1">
                        What you did
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {dim.whatYouDid}
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        What you missed
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {dim.whatYouMissed}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-navy">
              Communication Breakdown
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {report.communicationScore.total}/30
              </span>
            </h2>
            <div className="space-y-4">
              {report.communicationBreakdown.map((aspect) => (
                <div key={aspect.aspect} className="space-y-2">
                  <ScoreBar
                    label={aspect.aspect}
                    score={aspect.score}
                    max={aspect.maxScore}
                  />
                  <p className="text-sm text-muted-foreground pl-1">
                    {aspect.observation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-navy">
              What to Practise Next
            </h2>
            <div className="bg-blue-light border border-blue/20 rounded-lg p-5">
              <p className="text-[15px] leading-relaxed">
                {report.recommendation}
              </p>
            </div>
          </div>
        )}

        <div className="pt-4">
          <Button
            size="lg"
            className="w-full bg-blue hover:bg-blue-hover text-white"
            onClick={() => setScreen("info-collection")}
          >
            Save my results
          </Button>
        </div>
      </div>
    </div>
  );
}
