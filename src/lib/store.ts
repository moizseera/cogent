"use client";

import { create } from "zustand";
import type { Screen, ChatMessage, ReportData, UserInfo } from "./types";
import { DEFAULT_SCENARIO_ID } from "./scenarios";

interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

interface AppStore {
  screen: Screen;
  scenarioId: string;
  messages: ChatMessage[];
  finalRecommendation: string | null;
  report: ReportData | null;
  userInfo: UserInfo | null;
  allTranscripts: string[];
  isLoading: boolean;
  authUser: AuthUser | null;

  setScreen: (screen: Screen) => void;
  setScenarioId: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setFinalRecommendation: (text: string) => void;
  setReport: (report: ReportData) => void;
  setUserInfo: (info: UserInfo) => void;
  addTranscript: (transcript: string) => void;
  setIsLoading: (loading: boolean) => void;
  setAuthUser: (user: AuthUser | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  screen: "landing",
  scenarioId: DEFAULT_SCENARIO_ID,
  messages: [],
  finalRecommendation: null,
  report: null,
  userInfo: null,
  allTranscripts: [],
  isLoading: false,
  authUser: null,

  setScreen: (screen) => set({ screen }),
  setScenarioId: (scenarioId) => set({ scenarioId }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setFinalRecommendation: (text) => set({ finalRecommendation: text }),
  setReport: (report) => set({ report }),
  setUserInfo: (info) => set({ userInfo: info }),
  addTranscript: (transcript) =>
    set((state) => ({
      allTranscripts: [...state.allTranscripts, transcript],
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setAuthUser: (user) => set({ authUser: user }),
  reset: () =>
    set({
      screen: "landing",
      scenarioId: DEFAULT_SCENARIO_ID,
      messages: [],
      finalRecommendation: null,
      report: null,
      userInfo: null,
      allTranscripts: [],
      isLoading: false,
    }),
}));
