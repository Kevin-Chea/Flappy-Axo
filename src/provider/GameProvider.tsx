import { useState } from "react";
import { GameContext } from "../context/GameContext";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const start = () => {
    setIsPlaying(true);
  };
  const stop = () => {
    setIsPlaying(false);
  };
  return (
    <GameContext.Provider value={{ isPlaying, setIsPlaying, start, stop }}>
      {children}
    </GameContext.Provider>
  );
};
