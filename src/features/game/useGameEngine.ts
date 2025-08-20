import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAVITY } from "../../Properties";
import { drawImage } from "../../utils/image";
import useBird from "./entities/useBird";
import useGame from "./useGame";
import useImage from "../../utils/useImage";
import usePipes from "./entities/usePipes";
import drawBird from "./render/renderBird";

const useGameEngine = () => {
  const { addVelocity, computeBirdY, getState: getBirdState } = useBird();
  const { updatePipes, objectCollidesWithAnyPipe, drawPipes } = usePipes();
  const { stop, updateDelta, delta } = useGame();
  const backgroundImg = useImage("/src/assets/background.jpg");

  const update = () => {
    // 1. Time progression
    updateDelta();

    // 2. Apply forces on main character
    addVelocity(GRAVITY * delta.current);
    computeBirdY();

    // 3. Pipe logic (creation, deletion...)
    updatePipes();

    // 4. Check collision of character with obstacle
    if (objectCollidesWithAnyPipe(getBirdState())) {
      stop();
    }
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    // Reset canvas and redraw background
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawImage(ctx, backgroundImg.current, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawBird(ctx, getBirdState());
    drawPipes(ctx);
  };

  return { update, render };
};

export default useGameEngine;
