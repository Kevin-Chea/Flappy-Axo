import { createContext } from "react";

interface ScoreContextType {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  incrementScore: (points?: number) => void;
  resetScore: () => void;
  bestScore: number;
  setBestScoreIfNecessary: () => void;
}

export const ScoreContext = createContext<ScoreContextType | undefined>(
  undefined
);
