import { useCallback, useEffect, useRef } from "react";
import {
  BIRD_HEIGHT,
  BIRD_OFFSET_X,
  BIRD_WIDTH,
  CANVAS_HEIGHT,
  CLICK_FORCE,
  GRAVITY,
  MAX_VELOCITY,
} from "../Properties";
import { computeClampedValue } from "../utils/clamp";

const useBird = () => {
  const birdY = useRef(0);
  const birdVelocity = useRef(0);

  const addVelocity = (velocity: number) => {
    birdVelocity.current += velocity;

    // If we are hitting a border and velocity would make us leave, decrease it
    if (velocity > 0 && birdY.current + BIRD_HEIGHT == CANVAS_HEIGHT) {
      if (birdVelocity.current > 0) {
        birdVelocity.current -= 2 * GRAVITY;
      }
    }
    if (velocity < 0 && birdY.current == 0) {
      if (birdVelocity.current < 0) {
        birdVelocity.current += 2 * GRAVITY;
      }
    }
    // Clamp value
    birdVelocity.current = computeClampedValue(
      birdVelocity.current,
      -MAX_VELOCITY,
      MAX_VELOCITY
    );
    console.log(birdVelocity.current);
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
