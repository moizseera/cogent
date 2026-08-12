"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { SCENARIOS } from "@/lib/scenarios";
import type { ReportData } from "@/lib/types";

interface ReportEntry {
  id: string;
  scenario_id: string;
  overall_score: number;
  report_data: ReportData | null;
  created_at: string;
}

function ReportDetail({
  report,
  scenarioTitle,
  onBack,
}: {
  report: ReportEntry;
  scenarioTitle: string;
  onBack: () => void;
}) {
  const data = report.report_data;

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12L2 8l4-4" />
          <path d="M2 8h12" />
        </svg>
        All reports
      </button>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-navy">{scenarioTitle}</h2>
        <p className="text-xs text-muted-foreground">{formatDate(report.created_at)}</p>
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue/20">
          <span className="text-2xl font-bold text-navy">{report.overall_score}</span>
        </div>
        <p className="text-xs text-muted-foreground">/ 100</p>
      </div>

      {data ? (
        <>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-navy">What You Did Well</h3>
            <ul className="space-y-2">
              {data.whatYouDidWell.map((item, i) => (
                <li key={i} className="flex gap-3 bg-blue-light rounded-lg p-4 text-sm leading-relaxed">
                  <span className="text-blue shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-navy">What You Missed</h3>
            <ul className="space-y-2">
              {data.whatYouMissed.map((item, i) => (
                <li key={i} className="flex gap-3 bg-muted rounded-lg p-4 text-sm leading-relaxed">
                  <span className="text-muted-foreground shrink-0">−</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-navy">Your Decision Path</h3>
            <ol className="space-y-2">
              {data.decisionPath.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-navy">A Stronger Approach</h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {data.strongerApproach}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-navy">Next Practice Focus</h3>
            <div className="bg-blue-light border border-blue/20 rounded-lg p-5">
              <p className="text-[15px] leading-relaxed">{data.nextPracticeFocus}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-8">
          Detailed report data is not available for this session.
        </p>
      )}
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MyReportsScreen() {
  const setScreen = useAppStore((s) => s.setScreen);
  const authUser = useAppStore((s) => s.authUser);
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authUser) {
      setScreen("landing");
      return;
    }

    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data.reports || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authUser, setScreen]);

  const scenarioTitle = (id: string) => SCENARIOS[id]?.title ?? id;

  const scoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 bg-green-50";
    if (score >= 50) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  const selectedReport = reports.find((r) => r.id === selectedId);

  return (
    <div className="min-h-dvh flex flex-col">
      <nav className="border-b border-border/50 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => useAppStore.getState().reset()}
            className="text-xl font-semibold tracking-tight text-navy hover:opacity-80 transition-opacity"
          >
            Cogent
          </button>
          <button
            onClick={() => useAppStore.getState().reset()}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 8.5l5.5-5L13 8.5" />
              <path d="M3.5 7.5V13h3.25v-3h2.5v3H12.5V7.5" />
            </svg>
            Home
          </button>
        </div>
      </nav>

      <div className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto">
          {selectedReport ? (
            <ReportDetail
              report={selectedReport}
              scenarioTitle={scenarioTitle(selectedReport.scenario_id)}
              onBack={() => setSelectedId(null)}
            />
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-navy">Your Reports</h1>
                <p className="text-muted-foreground text-sm">
                  Review your past practice sessions and track your progress.
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-6 h-6 border-2 border-blue border-t-transparent rounded-full animate-spin" />
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto text-muted-foreground/40">
                    <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 18h16M16 24h12M16 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="text-muted-foreground">
                    No reports yet. Complete a challenge to see your first report here.
                  </p>
                  <button
                    onClick={() => useAppStore.getState().reset()}
                    className="text-sm font-medium text-blue hover:text-blue-hover transition-colors"
                  >
                    Start a challenge
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {reports.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedId(r.id)}
                      className="w-full flex items-center gap-4 rounded-xl border border-border/50 hover:border-blue/30 hover:bg-blue-light/30 p-4 transition-colors text-left"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${scoreColor(r.overall_score)}`}
                      >
                        {r.overall_score}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-navy text-sm truncate">
                          {scenarioTitle(r.scenario_id)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(r.created_at)}
                        </div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0">
                        <path d="M6 4l4 4-4 4" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
