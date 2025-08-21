import { useEffect } from "react";
import useGame from "../game/useGame";
import "./Menu.css";

const Menu = () => {
  const { startGame } = useGame();

  useEffect(() => {
    const startOnEvent = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        startGame();
      }
    };

    window.addEventListener("keydown", startOnEvent);

    return () => {
      window.removeEventListener("keydown", startOnEvent);
    };
  }, [startGame]);

  return (
    <button className="menu" onClick={startGame}>
      Click to play (or press space) !
    </button>
  );
};

export default Menu;
