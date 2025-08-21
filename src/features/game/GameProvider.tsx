import { useRef, useState } from "react";
import { GameContext } from "./GameContext";
import { useScore } from "../score/useScore";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { updateBestScore } = useScore();

  const lastTime = useRef(performance.now());
  const delta = useRef(0);

  const startGame = () => {
    setIsPlaying(true);
    lastTime.current = performance.now();
    delta.current = 0;
  };

  const stopGame = () => {
    updateBestScore();
    setIsPlaying(false);
  };

  const computeDelta = () => {
    const newTime = performance.now();
    delta.current = (newTime - lastTime.current) * 0.001; // convert from ms to s
    lastTime.current = newTime;
  };

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        startGame,
        stopGame,
        lastTime,
        delta,
        computeDelta,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
