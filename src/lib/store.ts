"use client";

import { create } from "zustand";
import type { Screen, ChatMessage, UserDecision, ReportData, UserInfo } from "./types";

interface AppStore {
  screen: Screen;
  messages: ChatMessage[];
  decisions: UserDecision[];
  currentStep: number;
  decisionCount: number;
  finalRecommendation: string | null;
  report: ReportData | null;
  userInfo: UserInfo | null;
  allTranscripts: string[];
  isLoading: boolean;

  setScreen: (screen: Screen) => void;
  addMessage: (message: ChatMessage) => void;
  addDecision: (decision: UserDecision) => void;
  advanceStep: () => void;
  incrementDecisionCount: () => void;
  setFinalRecommendation: (text: string) => void;
  setReport: (report: ReportData) => void;
  setUserInfo: (info: UserInfo) => void;
  addTranscript: (transcript: string) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  screen: "landing",
  messages: [],
  decisions: [],
  currentStep: 1,
  decisionCount: 0,
  finalRecommendation: null,
  report: null,
  userInfo: null,
  allTranscripts: [],
  isLoading: false,

  setScreen: (screen) => set({ screen }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  addDecision: (decision) =>
    set((state) => ({ decisions: [...state.decisions, decision] })),
  advanceStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 12) })),
  incrementDecisionCount: () =>
    set((state) => ({ decisionCount: state.decisionCount + 1 })),
  setFinalRecommendation: (text) => set({ finalRecommendation: text }),
  setReport: (report) => set({ report }),
  setUserInfo: (info) => set({ userInfo: info }),
  addTranscript: (transcript) =>
    set((state) => ({
      allTranscripts: [...state.allTranscripts, transcript],
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  reset: () =>
    set({
      screen: "landing",
      messages: [],
      decisions: [],
      currentStep: 1,
      decisionCount: 0,
      finalRecommendation: null,
      report: null,
      userInfo: null,
      allTranscripts: [],
      isLoading: false,
    }),
}));
