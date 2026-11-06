import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ProgressState = {
  learnedWordIds: string[];
  quizAttempts: number;
  bestQuizScore: number;
  lastQuizScore: number | null;
  matchGamesCompleted: number;
  lastStudyDate: string | null;
};

type ProgressContextValue = {
  progress: ProgressState;
  markLearned: (wordId: string) => void;
  saveQuizResult: (score: number, total: number) => void;
  saveMatchResult: () => void;
  resetProgress: () => void;
};

const STORAGE_KEY = "mufradatku-progress-v1";
const initialProgress: ProgressState = {
  learnedWordIds: [],
  quizAttempts: 0,
  bestQuizScore: 0,
  lastQuizScore: null,
  matchGamesCompleted: 0,
  lastStudyDate: null,
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readProgress(): ProgressState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...initialProgress, ...JSON.parse(stored) } : initialProgress;
  } catch {
    return initialProgress;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(readProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const value = useMemo<ProgressContextValue>(() => ({
    progress,
    markLearned: (wordId) => setProgress((current) => ({
      ...current,
      learnedWordIds: current.learnedWordIds.includes(wordId)
        ? current.learnedWordIds
        : [...current.learnedWordIds, wordId],
      lastStudyDate: new Date().toISOString(),
    })),
    saveQuizResult: (score, total) => {
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      setProgress((current) => ({
        ...current,
        quizAttempts: current.quizAttempts + 1,
        bestQuizScore: Math.max(current.bestQuizScore, percentage),
        lastQuizScore: percentage,
      }));
    },
    saveMatchResult: () => setProgress((current) => ({
      ...current,
      matchGamesCompleted: current.matchGamesCompleted + 1,
    })),
    resetProgress: () => setProgress(initialProgress),
  }), [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress harus digunakan di dalam ProgressProvider");
  return context;
}