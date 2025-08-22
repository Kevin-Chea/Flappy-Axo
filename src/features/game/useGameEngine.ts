import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../Properties";
import useAxo from "./entities/useAxo";
import useGame from "./useGame";
import usePipes from "./entities/usePipes";
import drawAxo from "./render/renderAxo";
import useBackground from "./entities/useBackground";
import drawBackground from "./render/renderBackground";
import drawPipes from "./render/renderPipes";
import { useEffect } from "react";
import { useScore } from "../score/useScore";

const useGameEngine = () => {
  const {
    getState: getAxoState,
    applyPhysics: applyAxoPhysics,
    reset: resetAxo,
  } = useAxo();
  const {
    pipes,
    updatePipes,
    isCollidingWithAnyPipe,
    reset: resetPipes,
  } = usePipes();
  const { delta, computeDelta, stopGame } = useGame();
  const { getState: getBgState } = useBackground();
  const { resetScore } = useScore();

  const checkCollisions = () => {
    // If there is a collision : end the game
    if (isCollidingWithAnyPipe(getAxoState())) {
      stopGame();
    }
  };

  const update = () => {
    // 1. Time progression
    computeDelta();

    // 2. Apply forces on main character
    applyAxoPhysics(delta.current);

    // 3. Pipe logic (creation, deletion...)
    updatePipes(delta.current);

    // 4. Check collision of character with obstacle
    checkCollisions();
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    // Reset canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Redraw each element
    drawBackground(ctx, getBgState());
    drawAxo(ctx, getAxoState());
    drawPipes(ctx, pipes.current);
  };

  // When game begins or restarts, reset everything
  useEffect(() => {
    resetAxo();
    resetPipes();
    resetScore();
  }, [resetAxo, resetPipes, resetScore]);

  return { update, render };
};

export default useGameEngine;
