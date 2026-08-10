"use client";

import { useState } from "react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  maxDuration?: number;
}

export function VoiceInput({
  onTranscript,
  disabled,
  maxDuration = 90,
}: VoiceInputProps) {
  const {
    isRecording,
    audioUrl,
    audioBlob,
    duration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useVoiceRecorder(maxDuration);

  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleSubmit = async () => {
    if (!audioBlob) return;
    setIsTranscribing(true);

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const { text } = await res.json();
      if (text) {
        onTranscript(text);
        resetRecording();
      }
    } catch {
      console.error("Transcription failed");
    } finally {
      setIsTranscribing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (audioUrl) {
    return (
      <div className="space-y-3">
        <audio controls src={audioUrl} className="w-full" />
        <div className="flex gap-2">
          <button
            onClick={resetRecording}
            className="flex-1 py-2 rounded-lg border text-sm hover:bg-muted transition-colors"
            disabled={isTranscribing}
          >
            Re-record
          </button>
          <button
            onClick={handleSubmit}
            disabled={isTranscribing}
            className="flex-1 py-2 rounded-lg bg-foreground text-background text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isTranscribing ? "Transcribing..." : "Send"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={disabled}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-50 ${
          isRecording
            ? "bg-red-500 text-white animate-pulse"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {isRecording ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        )}
      </button>
      {isRecording && (
        <span className="text-sm text-muted-foreground tabular-nums">
          {formatTime(duration)} / {formatTime(maxDuration)}
        </span>
      )}
      {!isRecording && (
        <span className="text-sm text-muted-foreground">
          Tap to speak
        </span>
      )}
    </div>
  );
}
