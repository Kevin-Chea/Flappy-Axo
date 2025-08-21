import { createContext } from "react";

interface GameContextType {
  isPlaying: boolean;
  startGame: () => void;
  stopGame: () => void;
  delta: React.RefObject<number>;
  computeDelta: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
