import Game from "../game/Game";
import useGame from "../game/useGame";
import Menu from "./Menu";

const ScreenSelector = () => {
  const { isPlaying } = useGame();

  return isPlaying ? <Game /> : <Menu />;
};

export default ScreenSelector;
