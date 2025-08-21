import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../Properties";
import useBird from "./entities/useBird";
import useGame from "./useGame";
import usePipes from "./entities/usePipes";
import drawBird from "./render/renderBird";
import useBackground from "./entities/useBackground";
import drawBackground from "./render/renderBackground";
import drawPipes from "./render/renderPipes";
import { useEffect } from "react";
import { useScore } from "../score/useScore";

const useGameEngine = () => {
  const {
    getState: getBirdState,
    applyPhysics: applyBirdPhysics,
    reset: resetBird,
  } = useBird();
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
    if (isCollidingWithAnyPipe(getBirdState())) {
      stopGame();
    }
  };

  const update = () => {
    // 1. Time progression
    computeDelta();

    // 2. Apply forces on main character
    applyBirdPhysics(delta.current);

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
    drawBird(ctx, getBirdState());
    drawPipes(ctx, pipes.current);
  };

  // When game begins or restarts, reset everything
  useEffect(() => {
    resetBird();
    resetPipes();
    resetScore();
  }, [resetBird, resetPipes, resetScore]);

  return { update, render };
};

export default useGameEngine;
