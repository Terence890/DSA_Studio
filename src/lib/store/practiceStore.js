import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "dsa-practice-store-v1";

export const usePracticeStore = create(
  persist(
    (set, get) => ({
      solvedIds: new Set(),
      hintsUsed: {}, // { problemId: numberOfHints }
      timerSeconds: 0,

      markSolved: (id) =>
        set((state) => {
          const next = new Set(state.solvedIds);
          next.add(id);
          return { solvedIds: next };
        }),

      undoSolved: (id) =>
        set((state) => {
          const next = new Set(state.solvedIds);
          next.delete(id);
          return { solvedIds: next };
        }),

      toggleSolved: (id) => {
        const { solvedIds } = get();
        return solvedIds.has(id) ? get().undoSolved(id) : get().markSolved(id);
      },

      incrementHint: (id, totalHints) =>
        set((state) => {
          const current = state.hintsUsed[id] ?? 0;
          const next = Math.min(totalHints ?? current + 1, current + 1);
          return {
            hintsUsed: { ...state.hintsUsed, [id]: next },
          };
        }),

      setHintCount: (id, count) =>
        set((state) => ({
          hintsUsed: { ...state.hintsUsed, [id]: Math.max(0, count) },
        })),

      setTimerSeconds: (seconds) =>
        set(() => ({ timerSeconds: Math.max(0, seconds) })),

      resetProgress: () =>
        set(() => ({
          solvedIds: new Set(),
          hintsUsed: {},
          timerSeconds: 0,
        })),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      partialize: (state) => ({
        solvedIds: Array.from(state.solvedIds),
        hintsUsed: state.hintsUsed,
        timerSeconds: state.timerSeconds,
      }),
      merge: (persisted, current) => {
        const solved = new Set(persisted?.state?.solvedIds || current.solvedIds);
        return {
          ...current,
          ...persisted.state,
          solvedIds: solved,
        };
      },
    },
  ),
);
