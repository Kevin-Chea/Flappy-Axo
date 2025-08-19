import { useEffect } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Properties";
import useGameCanvas from "../hooks/useGameCanvas";
import { useScore } from "../hooks/useScore";
import useGameEngine from "../hooks/useGameEngine";

const Game = () => {
  const { canvasRef, canvasContextRef, clearAll, drawBackground } =
    useGameCanvas();
  const { resetScore } = useScore();
  const { update, render } = useGameEngine();

  useEffect(() => {
    const ctx = canvasContextRef.current;
    if (!ctx) return;

    let animationFrame: number;

    const gameLoop = () => {
      // Reset canvas
      clearAll();
      drawBackground();

      update();
      render(ctx);
      animationFrame = requestAnimationFrame(gameLoop);
    };
    animationFrame = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [canvasContextRef, clearAll, drawBackground, render, update]);

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
