import Game from "./Game";
import useGame from "../hooks/useGame";
import Menu from "./Menu";

const MenuOrGameSelector = () => {
  const { isPlaying } = useGame();

  if (isPlaying) return <Game />;

  return <Menu />;
};

export default MenuOrGameSelector;
