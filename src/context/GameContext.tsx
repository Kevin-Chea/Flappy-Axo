import { createContext } from "react";

interface GameContextType {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  start: () => void;
  stop: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
