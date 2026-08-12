"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { VoiceInput } from "@/components/VoiceInput";
import { isConvergenceSignal } from "@/lib/prompts";
import { getScenario } from "@/lib/scenarios";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const HARD_CAP_USER_TURNS = 3;

export function ChallengeScreen() {
  const { messages: storeMessages, scenarioId, addMessage, setScreen, addTranscript } =
    useAppStore();

  const scenario = getScenario(scenarioId);

  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>(() =>
    storeMessages.map((m, i) => ({
      id: String(i),
      role: m.role,
      content: m.content,
    }))
  );
  const [textInput, setTextInput] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(storeMessages.length);
  const startedRef = useRef(storeMessages.length > 0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayMessages]);

  const streamChat = useCallback(
    async (chatMessages: { role: string; content: string }[], turnCount: number) => {
      const conversationHistory = useAppStore
        .getState()
        .messages.map(
          (m) => `${m.role === "user" ? "User" : "Scenario"}: ${m.content}`
        )
        .join("\n");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatMessages,
          scenarioId,
          conversationHistory,
          turnCount,
        }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const assistantId = String(msgIdRef.current++);
      let assistantContent = "";

      setDisplayMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setDisplayMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantContent } : m
          )
        );
      }

      if (assistantContent) {
        addMessage({
          role: "assistant",
          content: assistantContent,
          timestamp: Date.now(),
        });
        addTranscript(`Scenario: ${assistantContent}`);

        if (isConvergenceSignal(assistantContent) || turnCount >= HARD_CAP_USER_TURNS) {
          setTimeout(() => setScreen("final-recommendation"), 1500);
        }
      }
    },
    [addMessage, addTranscript, scenarioId, setScreen]
  );

  const startScenario = useCallback(async () => {
    setIsLoading(true);
    try {
      await streamChat([], 0);
    } catch (err) {
      console.error("Failed to start scenario:", err);
    } finally {
      setIsLoading(false);
    }
  }, [streamChat]);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      startScenario();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: DisplayMessage = {
        id: String(msgIdRef.current++),
        role: "user",
        content: text.trim(),
      };

      addMessage({ role: "user", content: text.trim(), timestamp: Date.now() });
      addTranscript(`User: ${text.trim()}`);

      const updatedMessages = [...displayMessages, userMsg];
      setDisplayMessages(updatedMessages);
      setIsLoading(true);

      const turnCount = updatedMessages.filter((m) => m.role === "user").length;

      try {
        await streamChat(
          updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          turnCount
        );
      } catch (err) {
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, displayMessages, addMessage, addTranscript, streamChat]
  );

  const handleSend = (text: string) => {
    sendMessage(text);
    setTextInput("");
  };

  const userTurns = displayMessages.filter((m) => m.role === "user").length;

  return (
    <div className="h-dvh flex flex-col">
      <div className="border-b px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue text-white flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0">
            C
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm text-navy">
              {scenario.title}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {userTurns} exchange{userTurns !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
        {userTurns >= 1 && (
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-xs sm:text-sm border-blue text-blue hover:bg-blue-light"
            onClick={() => setScreen("final-recommendation")}
          >
            <span className="hidden sm:inline">Give final recommendation</span>
            <span className="sm:hidden">Final rec</span>
          </Button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                message.role === "user"
                  ? "bg-blue text-white"
                  : "bg-muted"
              }`}
            >
              {message.content || (
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t px-3 py-2 sm:px-4 sm:py-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2 mb-2">
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
        </div>

        {inputMode === "voice" ? (
          <VoiceInput
            onTranscript={(transcript) => handleSend(transcript)}
            disabled={isLoading}
          />
        ) : (
          <div className="flex gap-2">
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Ask a question or describe what you'd do..."
              className="min-h-[44px] max-h-[120px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(textInput);
                }
              }}
            />
            <Button
              size="sm"
              onClick={() => handleSend(textInput)}
              disabled={!textInput.trim() || isLoading}
              className="self-end bg-blue hover:bg-blue-hover text-white"
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
