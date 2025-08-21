import { useState } from "react";
import { GameContext } from "./GameContext";
import { useScore } from "../score/useScore";
import useGameLoop from "./useGameLoop";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { updateBestScore } = useScore();

  const { delta, computeDelta, reset } = useGameLoop();

  const startGame = () => {
    setIsPlaying(true);
    reset();
  };

  const stopGame = () => {
    updateBestScore();
    setIsPlaying(false);
  };

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        startGame,
        stopGame,
        delta,
        computeDelta,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
