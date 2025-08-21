import { useRef } from "react";

const useGameLoop = () => {
  const lastTime = useRef(performance.now());
  const delta = useRef(0);

  const computeDelta = () => {
    const newTime = performance.now();
    delta.current = (newTime - lastTime.current) * 0.001; // convert from ms to s
    lastTime.current = newTime;
  };

  const reset = () => {
    delta.current = 0;
    lastTime.current = performance.now();
  };

  return {
    delta,
    computeDelta,
    reset,
  };
};

export default useGameLoop;
