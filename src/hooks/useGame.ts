import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a ScoreProvider");
  return context;
};

export default useGame;
