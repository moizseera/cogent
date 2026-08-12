"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { SCENARIOS } from "@/lib/scenarios";

interface ReportEntry {
  id: string;
  scenario_id: string;
  overall_score: number;
  created_at: string;
}

export function MyReportsScreen() {
  const setScreen = useAppStore((s) => s.setScreen);
  const authUser = useAppStore((s) => s.authUser);
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [loading, setLoading] = useState(true);

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

  const scenarioTitle = (id: string) =>
    SCENARIOS[id]?.title ?? id;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const scoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 bg-green-50";
    if (score >= 50) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <nav className="border-b border-border/50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setScreen("landing")}
            className="text-xl font-semibold tracking-tight text-navy hover:opacity-80 transition-opacity"
          >
            Cogent
          </button>
          <button
            onClick={() => setScreen("landing")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 12L2 8l4-4" />
              <path d="M2 8h12" />
            </svg>
            Home
          </button>
        </div>
      </nav>

      <div className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
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
              <div className="text-4xl">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto text-muted-foreground/40">
                  <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 18h16M16 24h12M16 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-muted-foreground">
                No reports yet. Complete a challenge to see your first report here.
              </p>
              <button
                onClick={() => setScreen("landing")}
                className="text-sm font-medium text-blue hover:text-blue-hover transition-colors"
              >
                Start a challenge
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-4 rounded-xl border border-border/50 hover:border-border p-4 transition-colors"
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
