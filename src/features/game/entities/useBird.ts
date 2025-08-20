import { useEffect, useRef } from "react";
import {
  BIRD_HEIGHT,
  BIRD_OFFSET_X,
  BIRD_WIDTH,
  CANVAS_HEIGHT,
  CLICK_FORCE,
  GRAVITY,
  MAX_VELOCITY,
} from "../../../Properties";
import { computeClampedValue } from "../../../utils/clamp";
import useGame from "../useGame";
import useImage from "../../../utils/useImage";

const useBird = () => {
  const birdY = useRef(0);
  const birdVelocity = useRef(0);
  const { isPlaying } = useGame();
  const axoImg = useImage("/src/assets/axolotl.png");

  const getState = () => ({
    x: BIRD_OFFSET_X,
    y: birdY.current,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    img: axoImg.current,
  });

  const updateBird = (delta: number) => {
    // Add gravity
    addVelocity(GRAVITY * delta, delta);
    // update position
    computeBirdY(delta);
  };

  const addVelocity = (velocity: number, delta: number) => {
    birdVelocity.current += velocity;

    // If we are hitting a border and velocity would make us leave, decrease it
    if (velocity > 0 && birdY.current + BIRD_HEIGHT == CANVAS_HEIGHT) {
      if (birdVelocity.current > 0) {
        birdVelocity.current -= 2 * GRAVITY * delta;
      }
    }
    if (velocity < 0 && birdY.current == 0) {
      if (birdVelocity.current < 0) {
        birdVelocity.current += 2 * GRAVITY * delta;
      }
    }
    // Clamp value
    birdVelocity.current = computeClampedValue(
      birdVelocity.current,
      -MAX_VELOCITY,
      MAX_VELOCITY
    );
  };

  const resetVelocity = () => {
    birdVelocity.current = 0;
  };

  const computeBirdY = (delta: number) => {
    // Clamp value
    birdY.current = computeClampedValue(
      birdY.current + birdVelocity.current * delta,
      0,
      CANVAS_HEIGHT - BIRD_HEIGHT
    );
  };

  useEffect(() => {
    const handleInput = () => {
      birdVelocity.current = CLICK_FORCE;
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
  }, []);

  useEffect(() => {
    if (isPlaying) {
      resetVelocity();
    }
  }, [isPlaying]);

  return {
    birdY,
    getState,
    updateBird,
  };
};

export default useBird;
