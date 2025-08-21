import Game from "../game/Game";
import useGame from "../game/useGame";
import Menu from "./Menu";

const GameScreen = () => {
  const { isPlaying } = useGame();

  return isPlaying ? <Game /> : <Menu />;
};

export default GameScreen;
