import { useRef } from "react";
import {
  AXO_OFFSET_X,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DELAY_BETWEEN_PIPES,
  PIPE_SPEED,
  PIPE_WIDTH,
  PIPES_GAP,
} from "../../../Properties";
import { useScore } from "../../score/useScore";
import type { Pipe } from "./pipe.type";

const usePipes = () => {
  const pipes = useRef<Pipe[]>([]);
  const { incrementScore } = useScore();
  const timeOfLastPipeSpawn = useRef(0);

  const addPipe = () => {
    const newPipe: Pipe = {
      positionX: CANVAS_WIDTH,
      gapY:
        // We add space between pipes so that it does not hit the top or the floor
        Math.random() * (CANVAS_HEIGHT - 2 * PIPES_GAP) + PIPES_GAP,
    };
    pipes.current.push(newPipe);
  };

  const isCollidingWithPipe = (
    obj: { width: number; height: number; x: number; y: number },
    pipe: Pipe
  ) => {
    if (!pipe) return false;

    return (
      pipe.positionX < obj.x + obj.width &&
      pipe.positionX + PIPE_WIDTH > obj.x &&
      (pipe.gapY > obj.y || pipe.gapY + PIPES_GAP < obj.y + obj.height)
    );
  };

  const isCollidingWithAnyPipe = (obj: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    for (const pipe of pipes.current) {
      if (isCollidingWithPipe(obj, pipe)) {
        return true;
      }
    }
    return false;
  };

  const handleMovePipes = (delta: number) => {
    pipes.current.forEach((pipe) => {
      const nextPositionX = pipe.positionX + PIPE_SPEED * delta;
      // If player has reached an obstacle : increment score
      if (pipe.positionX >= AXO_OFFSET_X && AXO_OFFSET_X >= nextPositionX)
        incrementScore();
      pipe.positionX = nextPositionX;
    });
  };

  const handlePipeDeletion = () => {
    // Delete pipe if it has left the screen
    pipes.current = pipes.current.filter(
      (pipe) => pipe.positionX + PIPE_WIDTH > 0
    );
  };

  const updatePipes = (delta: number) => {
    // Recreate a pipe if necessary
    if (performance.now() - timeOfLastPipeSpawn.current > DELAY_BETWEEN_PIPES) {
      addPipe();
      timeOfLastPipeSpawn.current = performance.now();
    }

    // Delete pipe if it has left the screen
    handlePipeDeletion();

    handleMovePipes(delta);
  };

  const reset = () => {
    pipes.current = [];
    timeOfLastPipeSpawn.current = performance.now();
  };

  return {
    pipes,
    updatePipes,
    isCollidingWithPipe,
    isCollidingWithAnyPipe,
    reset,
  };
};

export default usePipes;
