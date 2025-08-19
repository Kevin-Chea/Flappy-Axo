import { useEffect } from "react";
import useGame from "../hooks/useGame";
import "./Menu.css";

const Menu = () => {
  const { start } = useGame();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        start();
      }
    };

    const onClick = () => start();
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  }, [start]);
  return <button className="menu">Click to play (or press space)!</button>;
};

export default Menu;
