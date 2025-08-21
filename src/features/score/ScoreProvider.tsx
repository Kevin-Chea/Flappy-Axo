import { useEffect, useState } from "react";
import { ScoreContext } from "./ScoreContext";

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const resetScore = () => setScore(0);

  const incrementScore = (points = 1) => {
    setScore((prev) => prev + points);
  };

  const updateBestScore = () => {
    if (score > bestScore) {
      localStorage.setItem("bestScore", String(score));
      setBestScore(score);
    }
  };

  useEffect(() => {
    const best = Number(localStorage.getItem("bestScore") || "0");
    setBestScore(best);
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        bestScore,
        updateBestScore: updateBestScore,
        incrementScore,
        resetScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
