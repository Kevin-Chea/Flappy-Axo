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
import useGame from "./useGame";
import { computeDrawDimensionsAndOffsets } from "../utils/image";

const useBird = () => {
  const birdY = useRef(0);
  const birdVelocity = useRef(0);
  const { delta } = useGame();
  const axoImg = useRef<HTMLImageElement>(new Image());

  const addVelocity = useCallback(
    (velocity: number) => {
      birdVelocity.current += velocity;

      // If we are hitting a border and velocity would make us leave, decrease it
      if (velocity > 0 && birdY.current + BIRD_HEIGHT == CANVAS_HEIGHT) {
        if (birdVelocity.current > 0) {
          birdVelocity.current -= 2 * GRAVITY * delta.current;
        }
      }
      if (velocity < 0 && birdY.current == 0) {
        if (birdVelocity.current < 0) {
          birdVelocity.current += 2 * GRAVITY * delta.current;
        }
      }
      // Clamp value
      birdVelocity.current = computeClampedValue(
        birdVelocity.current,
        -MAX_VELOCITY,
        MAX_VELOCITY
      );
      console.log(birdVelocity.current);
    },
    [delta]
  );

  const resetVelocity = () => {
    birdVelocity.current = 0;
  };

  const computeBirdY = () => {
    console.log(birdVelocity.current * delta.current);
    birdY.current += birdVelocity.current * delta.current;
    // Clamp value
    if (birdY.current < 0) birdY.current = 0;
    if (birdY.current + BIRD_HEIGHT > CANVAS_HEIGHT)
      birdY.current = CANVAS_HEIGHT - BIRD_HEIGHT;
  };

  const drawBird = (ctx: CanvasRenderingContext2D) => {
    const img = axoImg.current;
    const dimensionsAndOffsets = computeDrawDimensionsAndOffsets(
      img,
      BIRD_WIDTH,
      BIRD_HEIGHT
    );
    // Flip image so the head is in the right direction
    ctx.save();
    ctx.scale(-1, 1);

    ctx.drawImage(
      img,
      -BIRD_OFFSET_X,
      birdY.current,
      -dimensionsAndOffsets.drawWidth,
      dimensionsAndOffsets.drawHeight
    );
    // Reset flip
    ctx.restore();
  };

  useEffect(() => {
    const handleInput = () => {
      addVelocity(CLICK_FORCE);
    };

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
  }, [addVelocity]);

  useEffect(() => {
    axoImg.current.src = "/src/assets/axolotl.png";
  }, []);

  return { birdY, addVelocity, resetVelocity, computeBirdY, drawBird };
};

export default useBird;
