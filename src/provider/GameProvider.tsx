import { useRef, useState } from "react";
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

  const lastTime = useRef(performance.now());
  const delta = useRef(0);

  const updateDelta = () => {
    const newTime = performance.now();
    console.log(newTime);
    console.log(lastTime.current);
    delta.current = (newTime - lastTime.current) * 0.001; // convert from ms to s
    console.log(delta);
    //delta.current = newTime - lastTime.current; // convert from ms to ms
    lastTime.current = newTime;
  };
  return (
    <GameContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        start,
        stop,
        lastTime,
        delta,
        updateDelta,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
