import { useEffect } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../Properties";
import useGameCanvas from "./useGameCanvas";
import { useScore } from "../score/useScore";
import useGameEngine from "./useGameEngine";

const Game = () => {
  const { canvasRef, canvasContextRef } = useGameCanvas(
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
  const { resetScore } = useScore();
  const { update, render } = useGameEngine();

  useEffect(() => {
    const ctx = canvasContextRef.current;
    if (!ctx) return;

    let animationFrame: number;

    const gameLoop = () => {
      update();
      render(ctx);
      animationFrame = requestAnimationFrame(gameLoop);
    };
    animationFrame = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [canvasContextRef, render, update]);

  useEffect(() => {
    resetScore();
  }, [resetScore]);

  return (
    <>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </>
  );
};

export default Game;
