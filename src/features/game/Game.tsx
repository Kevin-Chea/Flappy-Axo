import { useEffect } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../Properties";
import useGameCanvas from "./useGameCanvas";
import useGameEngine from "./useGameEngine";

const Game = () => {
  const { canvasRef, canvasContextRef } = useGameCanvas(
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
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

  return (
    <>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </>
  );
};

export default Game;
