import { createContext } from "react";

interface GameContextType {
  isPlaying: boolean;
  start: () => void;
  stop: () => void;
  lastTime: React.RefObject<number>;
  delta: React.RefObject<number>;
  computeDelta: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
