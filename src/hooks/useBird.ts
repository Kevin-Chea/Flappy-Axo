import { useCallback, useEffect, useRef } from "react";
import {
  BIRD_HEIGHT,
  BIRD_OFFSET_X,
  BIRD_WIDTH,
  CANVAS_HEIGHT,
  CLICK_FORCE,
  MAX_VELOCITY,
} from "../Properties";

const useBird = () => {
  const birdY = useRef(0);
  const birdVelocity = useRef(0);

  const addVelocity = (velocity: number) => {
    birdVelocity.current += velocity;

    if (birdVelocity.current > MAX_VELOCITY) {
      birdVelocity.current = MAX_VELOCITY;
    }

    if (birdVelocity.current < -MAX_VELOCITY) {
      birdVelocity.current = -MAX_VELOCITY;
    }
  };

  const resetVelocity = () => {
    birdVelocity.current = 0;
  };

  const computeBirdY = () => {
    birdY.current += birdVelocity.current;
    // Clamp value
    if (birdY.current < 0) birdY.current = 0;
    if (birdY.current + BIRD_HEIGHT > CANVAS_HEIGHT)
      birdY.current = CANVAS_HEIGHT - BIRD_HEIGHT;
  };

  const handleInput = useCallback(() => {
    addVelocity(CLICK_FORCE);
  }, []);

  const drawBird = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "blue ";
    ctx.fillRect(BIRD_OFFSET_X, birdY.current, BIRD_WIDTH, BIRD_HEIGHT);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleInput();
      }
    };
    const onClick = () => handleInput();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  }, [handleInput]);

  return { birdY, addVelocity, resetVelocity, computeBirdY, drawBird };
};

export default useBird;
