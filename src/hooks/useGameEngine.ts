import {
  BIRD_HEIGHT,
  BIRD_OFFSET_X,
  BIRD_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRAVITY,
} from "../Properties";
import { drawImage } from "../utils/image";
import useBird from "./useBird";
import useGame from "./useGame";
import useImage from "./useImage";
import usePipes from "./usePipes";

const useGameEngine = () => {
  const { birdY, addVelocity, computeBirdY, drawBird } = useBird();
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
    if (
      objectCollidesWithAnyPipe({
        x: BIRD_OFFSET_X,
        y: birdY.current,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT,
      })
    ) {
      stop();
    }
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    // Reset canvas and redraw background
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawImage(ctx, backgroundImg.current, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawBird(ctx);
    drawPipes(ctx);
  };

  return { update, render };
};

export default useGameEngine;
