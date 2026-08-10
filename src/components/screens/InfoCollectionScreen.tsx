"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";

export function InfoCollectionScreen() {
  const { setUserInfo, reset } = useAppStore();
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setUserInfo({ email, profession, experience });
    console.log("User info collected:", { email, profession, experience });
    setSubmitted(true);
  };

  const handleSkip = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-6">
        <div className="max-w-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-light flex items-center justify-center mx-auto">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy">Thank you</h2>
          <p className="text-muted-foreground">
            This is an early version of Cogent. Your feedback helps us build
            better challenges.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-4"
            onClick={() => reset()}
          >
            Try another challenge
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-navy">
            Save your results
          </h2>
          <p className="text-muted-foreground">
            We&rsquo;ll send you a copy of your report and notify you when new
            challenges are available.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-navy">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-navy">
              What do you do?
            </label>
            <Input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="mt-1.5"
              placeholder="e.g. Product manager, Engineer, Student"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-navy">
              Years of professional experience
            </label>
            <Input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1.5"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full bg-blue hover:bg-blue-hover text-white"
            onClick={handleSubmit}
            disabled={!email.trim()}
          >
            Save and send report
          </Button>
          <button
            onClick={handleSkip}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
