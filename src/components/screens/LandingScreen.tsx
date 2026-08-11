"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";

const PRACTICE_CARDS = [
  {
    title: "The Jet Engine Claim",
    description:
      "Your close friend says she built a 50% more efficient jet engine in her garage. She wants your help deciding what to do next.",
    difficulty: "Intermediate",
    duration: "~10 min",
    skills: ["Critical evaluation", "Risk assessment", "Decision-making"],
    available: true,
  },
  {
    title: "The Acquisition Offer",
    description:
      "Your startup just received a surprise acquisition offer. The board is split, and the deadline is 48 hours.",
    difficulty: "Advanced",
    duration: "20-25 min",
    skills: ["Stakeholder management", "Negotiation", "Strategic thinking"],
    available: false,
  },
  {
    title: "The Research Ethics Dilemma",
    description:
      "A colleague's groundbreaking paper has data inconsistencies. Reporting it could end their career. Ignoring it could harm patients.",
    difficulty: "Advanced",
    duration: "15-20 min",
    skills: ["Ethical reasoning", "Evidence analysis", "Communication"],
    available: false,
  },
];

const LESSON_CARDS = [
  {
    title: "Separating Claims from Evidence",
    description: "Learn to identify what's actually been proven vs what's being assumed.",
    duration: "5 min read",
  },
  {
    title: "The Ladder of Inference",
    description: "Understand how we jump from data to conclusions — and where we go wrong.",
    duration: "7 min read",
  },
  {
    title: "Asking Better Questions",
    description: "A framework for the questions that actually change your understanding.",
    duration: "5 min read",
  },
];

export function LandingScreen() {
  const setScreen = useAppStore((s) => s.setScreen);
  const authUser = useAppStore((s) => s.authUser);
  const setAuthUser = useAppStore((s) => s.setAuthUser);

  const handleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <nav className="border-b border-border/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-navy">
            Cogent
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">
              Learn
            </button>
            <button className="hover:text-foreground transition-colors">
              Practice
            </button>
            <button className="hover:text-foreground transition-colors">
              How it works
            </button>
            {authUser ? (
              <div className="flex items-center gap-3">
                {authUser.avatar && (
                  <img
                    src={authUser.avatar}
                    alt=""
                    className="w-7 h-7 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                )}
                <span className="text-foreground font-medium text-sm">
                  {authUser.name?.split(" ")[0] || authUser.email.split("@")[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-blue hover:text-blue-hover transition-colors font-medium"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy leading-[1.1]">
              Think clearly.
              <br />
              Speak clearly.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Practise navigating difficult situations where the answer is not
              obvious. Make decisions, face consequences, and discover how you
              think under pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="bg-blue hover:bg-blue-hover text-white text-base px-8 py-6 rounded-lg"
                onClick={() => setScreen("challenge")}
              >
                Start a challenge
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 rounded-lg border-border"
              >
                See how it works
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                Free to try
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                No account needed
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                ~10 minutes
              </span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 border border-border/50">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Your learning map
            </div>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  label: "Investigate",
                  desc: "Ask questions, examine evidence, spot what's missing",
                },
                {
                  step: "2",
                  label: "Decide",
                  desc: "Make calls under uncertainty with real consequences",
                },
                {
                  step: "3",
                  label: "Communicate",
                  desc: "Explain your reasoning clearly and persuasively",
                },
                {
                  step: "4",
                  label: "Reflect",
                  desc: "See your score and what to practise next",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-navy">
                      {item.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-navy">Practice</h2>
            <span className="text-sm text-muted-foreground">
              {PRACTICE_CARDS.filter((c) => c.available).length} of{" "}
              {PRACTICE_CARDS.length} available
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRACTICE_CARDS.map((card) => (
              <div
                key={card.title}
                className={`rounded-xl border p-6 space-y-4 transition-all ${
                  card.available
                    ? "border-border hover:border-blue/30 hover:shadow-md cursor-pointer"
                    : "border-border/50 opacity-60"
                }`}
                onClick={() => card.available && setScreen("challenge")}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      card.available
                        ? "bg-blue-light text-blue"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {card.available ? card.difficulty : "Coming soon"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {card.duration}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-muted/30 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-navy">Learn</h2>
            <span className="text-sm text-muted-foreground">Coming soon</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LESSON_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border/50 p-6 space-y-3 opacity-60"
              >
                <h3 className="font-semibold text-navy">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
                <span className="text-xs text-muted-foreground">
                  {card.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>Cogent — Think clearly. Speak clearly.</span>
          <span>An experiment in interactive learning.</span>
        </div>
      </footer>
    </div>
  );
}
