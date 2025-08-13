import { useState } from "react";
import { ScoreContext } from "../context/ScoreContext";

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [score, setScore] = useState(0);

  const resetScore = () => setScore(0);

  const incrementScore = (points = 1) => {
    setScore(score + points);
  };

  return (
    <ScoreContext.Provider
      value={{ score, setScore, incrementScore, resetScore }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
