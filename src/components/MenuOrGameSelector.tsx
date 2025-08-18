import Game from "./Game";
import useGame from "../hooks/useGame";
import Menu from "./Menu";

const MenuOrGameSelector = () => {
  const { isPlaying } = useGame();

  return isPlaying ? <Game /> : <Menu />;
};

export default MenuOrGameSelector;
