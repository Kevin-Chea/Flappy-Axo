import { createContext } from "react";

interface GameContextType {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  start: () => void;
  stop: () => void;
  lastTime: React.RefObject<number>;
  delta: React.RefObject<number>;
  updateDelta: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
