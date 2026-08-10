"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { VoiceInput } from "@/components/VoiceInput";

export function FinalRecommendationScreen() {
  const {
    setFinalRecommendation,
    addTranscript,
    setScreen,
    setIsLoading,
  } = useAppStore();

  const [inputMode, setInputMode] = useState<"text" | "voice">("voice");
  const [textInput, setTextInput] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [summary, setSummary] = useState("");
  const [phase, setPhase] = useState<"record" | "confirm">("record");

  const handleRecommendation = async (text: string) => {
    setRecommendation(text);
    addTranscript(`[Final Recommendation] ${text}`);
    setIsLoading(true);

    try {
      const res = await fetch("/api/summarize-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userDecision: text, stage: "final" }),
      });
      const data = await res.json();
      setSummary(data.summary);
      setPhase("confirm");
    } catch {
      setSummary(text.slice(0, 200));
      setPhase("confirm");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setFinalRecommendation(recommendation);
    setScreen("report");
  };

  const handleRedo = () => {
    setPhase("record");
    setRecommendation("");
    setSummary("");
    setTextInput("");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-blue bg-blue-light px-3 py-1.5 rounded-full">
            Final step
          </div>
          <h2 className="text-2xl font-bold text-navy">
            Your recommendation to Jane
          </h2>
          <p className="text-muted-foreground">
            Based on everything you&rsquo;ve learned and decided, what is your
            final recommendation? Tell Jane what to do, in what order, and why.
          </p>
        </div>

        {phase === "record" && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setInputMode("voice")}
                className={`text-xs px-2 py-1 rounded ${
                  inputMode === "voice"
                    ? "bg-blue text-white"
                    : "text-muted-foreground"
                }`}
              >
                Voice
              </button>
              <button
                onClick={() => setInputMode("text")}
                className={`text-xs px-2 py-1 rounded ${
                  inputMode === "text"
                    ? "bg-blue text-white"
                    : "text-muted-foreground"
                }`}
              >
                Text
              </button>
            </div>

            {inputMode === "voice" ? (
              <>
                <VoiceInput
                  onTranscript={handleRecommendation}
                  maxDuration={120}
                />
                <p className="text-center text-sm text-muted-foreground">
                  Up to 2 minutes
                </p>
              </>
            ) : (
              <div className="space-y-3">
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Write your recommendation here..."
                  className="min-h-[150px] resize-none"
                />
                <Button
                  size="lg"
                  className="w-full bg-blue hover:bg-blue-hover text-white"
                  onClick={() => handleRecommendation(textInput)}
                  disabled={!textInput.trim()}
                >
                  Submit recommendation
                </Button>
              </div>
            )}
          </>
        )}

        {phase === "confirm" && (
          <>
            <div className="bg-muted rounded-lg p-5 text-[15px] leading-relaxed">
              {summary}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleRedo}
              >
                Try again
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-blue hover:bg-blue-hover text-white"
                onClick={handleConfirm}
              >
                See my report
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
