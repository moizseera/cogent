"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { getScenario } from "@/lib/scenarios";
import type { ReportData } from "@/lib/types";

function ScoreRing({
  score,
  max,
  size = 100,
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
        <div className="text-xl font-bold text-navy">{score}</div>
        <div className="text-[10px] text-muted-foreground">/{max}</div>
      </div>
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

export function ReportScreen() {
  const {
    allTranscripts,
    finalRecommendation,
    report,
    scenarioId,
    setReport,
    setIsLoading,
  } = useAppStore();

  const scenario = getScenario(scenarioId);
  const authUser = useAppStore((s) => s.authUser);
  const [loading, setLoading] = useState(!report);
  const [saved, setSaved] = useState(false);
  const savedRef = useRef(false);

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
            finalRecommendation,
            scenarioId,
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
  }, [allTranscripts, finalRecommendation, report, scenarioId, setReport, setIsLoading]);

  useEffect(() => {
    if (!report || !authUser || savedRef.current) return;
    savedRef.current = true;

    fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report, scenarioId }),
    })
      .then((res) => {
        if (res.ok) setSaved(true);
      })
      .catch(() => {});
  }, [report, authUser, scenarioId]);

  const handleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
  };

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

  return (
    <div className="min-h-dvh px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-navy">Your Report</h1>
          <p className="text-muted-foreground">{scenario.title}</p>
          <div className="flex justify-center">
            <ScoreRing score={report.overallScore} max={100} label="Overall" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-navy">
            What You Did Well
          </h2>
          <ul className="space-y-3">
            {report.whatYouDidWell.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 bg-blue-light rounded-lg p-4 text-sm leading-relaxed"
              >
                <span className="text-blue shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-navy">
            What You Missed
          </h2>
          <ul className="space-y-3">
            {report.whatYouMissed.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 bg-muted rounded-lg p-4 text-sm leading-relaxed"
              >
                <span className="text-muted-foreground shrink-0">−</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-navy">
            Your Decision Path
          </h2>
          <ol className="space-y-3">
            {report.decisionPath.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-navy">
            A Stronger Approach
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {report.strongerApproach}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-navy">
            Next Practice Focus
          </h2>
          <div className="bg-blue-light border border-blue/20 rounded-lg p-5">
            <p className="text-[15px] leading-relaxed">
              {report.nextPracticeFocus}
            </p>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          {authUser ? (
            <>
              {saved && (
                <p className="text-center text-sm text-muted-foreground">
                  Report saved to your account
                </p>
              )}
              <Button
                size="lg"
                className="w-full bg-blue hover:bg-blue-hover text-white"
                onClick={() => {
                  useAppStore.getState().reset();
                }}
              >
                Try another challenge
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                className="w-full bg-blue hover:bg-blue-hover text-white"
                onClick={handleSignIn}
              >
                Sign in with Google to save
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  useAppStore.getState().reset();
                }}
              >
                Skip — try another challenge
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
