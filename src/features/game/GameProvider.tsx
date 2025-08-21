import { useState } from "react";
import { GameContext } from "./GameContext";
import useGameLoop from "./useGameLoop";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { delta, computeDelta, reset } = useGameLoop();

  const startGame = () => {
    setIsPlaying(true);
    reset();
  };

  const stopGame = () => {
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
