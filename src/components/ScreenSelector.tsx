import Game from "./Game";
import useGame from "../hooks/useGame";
import Menu from "./Menu";

const ScreenSelector = () => {
  const { isPlaying } = useGame();

  return isPlaying ? <Game /> : <Menu />;
};

export default ScreenSelector;
