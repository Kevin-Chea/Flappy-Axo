import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../Properties";
import useBird from "./entities/useBird";
import useGame from "./useGame";
import usePipes from "./entities/usePipes";
import drawBird from "./render/renderBird";
import useBackground from "./entities/useBackground";
import drawBackground from "./render/renderBackground";
import drawPipes from "./render/renderPipes";

const useGameEngine = () => {
  const { getState: getBirdState, updateBird } = useBird();
  const { pipes, updatePipes, objectCollidesWithAnyPipe } = usePipes();
  const { stopGame, computeDelta, delta } = useGame();
  const { getState: getBgState } = useBackground();

  const update = () => {
    // 1. Time progression
    computeDelta();

    // 2. Apply forces on main character
    updateBird(delta.current);

    // 3. Pipe logic (creation, deletion...)
    updatePipes();

    // 4. Check collision of character with obstacle
    if (objectCollidesWithAnyPipe(getBirdState())) {
      stopGame();
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
