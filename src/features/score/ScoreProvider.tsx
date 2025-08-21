import { useEffect, useState } from "react";
import { ScoreContext } from "./ScoreContext";
import useGame from "../game/useGame";

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const { isPlaying } = useGame();

  const resetScore = () => setScore(0);

  const incrementScore = (points = 1) => {
    setScore((prev) => prev + points);
  };

  useEffect(() => {
    const best = Number(localStorage.getItem("bestScore") || "0");
    setBestScore(best);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (score > bestScore) {
        localStorage.setItem("bestScore", String(score));
        setBestScore(score);
      }
    }
  }, [bestScore, isPlaying, score]);

  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        bestScore,
        incrementScore,
        resetScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
