import { useEffect, useRef } from "react";
import {
  AXO_HEIGHT,
  AXO_OFFSET_X,
  AXO_WIDTH,
  CANVAS_HEIGHT,
  CLICK_FORCE,
  GRAVITY,
  MAX_VELOCITY,
} from "../../../Properties";
import { clamp } from "../../../utils/clamp";
import useImage from "../../../utils/useImage";
import axoSrc from "../../../assets/axolotl.png";

const useAxo = () => {
  const axoY = useRef(0);
  const axoVelocity = useRef(0);
  const axoImg = useImage(axoSrc);

  const getState = () => ({
    x: AXO_OFFSET_X,
    y: axoY.current,
    width: AXO_WIDTH,
    height: AXO_HEIGHT,
    img: axoImg.current,
  });

  const applyPhysics = (delta: number) => {
    // Add gravity
    addVelocity(GRAVITY * delta, delta);
    // update position
    computeAxoY(delta);
  };

  const addVelocity = (velocity: number, delta: number) => {
    axoVelocity.current += velocity;

    // If we are hitting a border and velocity would make us leave, decrease it
    if (velocity > 0 && axoY.current + AXO_HEIGHT == CANVAS_HEIGHT) {
      if (axoVelocity.current > 0) {
        axoVelocity.current -= 2 * GRAVITY * delta;
      }
    }
    if (velocity < 0 && axoY.current == 0) {
      if (axoVelocity.current < 0) {
        axoVelocity.current += 2 * GRAVITY * delta;
      }
    }
    // Clamp value
    axoVelocity.current = clamp(
      axoVelocity.current,
      -MAX_VELOCITY,
      MAX_VELOCITY
    );
  };

  const computeAxoY = (delta: number) => {
    // Clamp value
    axoY.current = clamp(
      axoY.current + axoVelocity.current * delta,
      0,
      CANVAS_HEIGHT - AXO_HEIGHT
    );
  };

  useEffect(() => {
    const handleInput = () => {
      axoVelocity.current = CLICK_FORCE;
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

  const reset = () => {
    axoVelocity.current = 0;
  };

  return {
    axoY,
    getState,
    applyPhysics,
    reset,
  };
};

export default useAxo;
