import { useEffect } from "react";
import useGame from "../game/useGame";
import "./Menu.css";

const Menu = () => {
  const { startGame } = useGame();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        startGame();
      }
    };

    const onClick = () => startGame();
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  }, [startGame]);
  return <button className="menu">Click to play (or press space)!</button>;
};

export default Menu;
