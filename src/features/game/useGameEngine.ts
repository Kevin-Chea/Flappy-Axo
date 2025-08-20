import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAVITY } from "../../Properties";
import useBird from "./entities/useBird";
import useGame from "./useGame";
import usePipes from "./entities/usePipes";
import drawBird from "./render/renderBird";
import useBackground from "./entities/useBackground";
import drawBackground from "./render/renderBackground";
import drawPipes from "./render/renderPipes";

const useGameEngine = () => {
  const { addVelocity, computeBirdY, getState: getBirdState } = useBird();
  const { pipes, updatePipes, objectCollidesWithAnyPipe } = usePipes();
  const { stop, updateDelta, delta } = useGame();
  const { getState: getBgState } = useBackground();

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
    // Reset canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Redraw each element
    drawBackground(ctx, getBgState());
    drawBird(ctx, getBirdState());
    drawPipes(ctx, pipes.current);
  };

  return { update, render };
};

export default useGameEngine;
