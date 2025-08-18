import { useEffect } from "react";
import {
  BIRD_HEIGHT,
  BIRD_OFFSET_X,
  BIRD_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRAVITY,
} from "../Properties";
import useGameCanvas from "../hooks/useGameCanvas";
import useBird from "../hooks/useBird";
import usePipes from "../hooks/usePipes";
import useGame from "../hooks/useGame";
import { useScore } from "../hooks/useScore";

const Game = () => {
  const { canvasRef, canvasContextRef, clearAll, drawBackground } =
    useGameCanvas();
  const { birdY, addVelocity, computeBirdY, drawBird } = useBird();
  const { frameExecution, objectCollideWithPipe, getFirstPipe, drawPipes } =
    usePipes();
  const { stop, updateDelta, delta } = useGame();
  const { setScore } = useScore();

  useEffect(() => {
    const ctx = canvasContextRef.current;
    if (!ctx) return;

    let animationFrame: number;

    const gameLoop = () => {
      // Reset canvas
      clearAll();
      drawBackground();

      // Apply forces on bird
      addVelocity(GRAVITY * delta.current);
      computeBirdY();

      // Pipe logic (creation, deletion...)
      frameExecution();

      const pipe = getFirstPipe();
      if (
        pipe &&
        objectCollideWithPipe(
          {
            width: BIRD_WIDTH,
            height: BIRD_HEIGHT,
            x: BIRD_OFFSET_X,
            y: birdY.current,
          },
          pipe
        )
      ) {
        stop();
      }

      // Draw bird & pipes
      drawBird(ctx);
      drawPipes(ctx);

      updateDelta();
      animationFrame = requestAnimationFrame(gameLoop);
    };
    animationFrame = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [
    addVelocity,
    birdY,
    canvasContextRef,
    clearAll,
    computeBirdY,
    delta,
    drawBackground,
    drawBird,
    drawPipes,
    frameExecution,
    getFirstPipe,
    objectCollideWithPipe,
    stop,
    updateDelta,
  ]);

  useEffect(() => {
    setScore(0);
  }, [setScore]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: "2px solid #333", display: "block", margin: "0 auto" }}
      />
    </>
  );
};

export default Game;
