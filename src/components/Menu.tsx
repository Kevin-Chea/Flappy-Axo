import { useEffect } from "react";
import useGame from "../hooks/useGame";
import "./Menu.css";

const Menu = () => {
  const { start } = useGame();

  const handleInput = () => {
    start();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleInput();
      }
    };

    const onClick = () => handleInput();
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  });
  return <div className="menu">Click to play !</div>;
};

export default Menu;
