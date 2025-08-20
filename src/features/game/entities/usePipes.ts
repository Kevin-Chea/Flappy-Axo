import { useEffect, useRef } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DELAY_BETWEEN_PIPES,
  PIPE_SPEED,
  PIPE_WIDTH,
  PIPES_GAP,
} from "../../../Properties";
import { useScore } from "../../score/useScore";
import useGame from "../useGame";
import type { Pipe } from "./pipe.type";

const usePipes = () => {
  const pipes = useRef<Pipe[]>([]);
  const { incrementScore } = useScore();
  const { delta, isPlaying } = useGame();
  const timeOfLastPipeSpawn = useRef(0);

  const resetPipes = () => {
    pipes.current = [];
    timeOfLastPipeSpawn.current = performance.now();
  };

  const addPipe = () => {
    const newPipe: Pipe = {
      positionX: CANVAS_WIDTH,
      gapY:
        // We add space between pipes so that it does not hit the top or the floor
        Math.random() * (CANVAS_HEIGHT - 2 * PIPES_GAP) + PIPES_GAP,
    };
    pipes.current.push(newPipe);
  };

  const objectCollideWithPipe = (
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

  const movePipes = () => {
    pipes.current.forEach(
      (pipe) => (pipe.positionX += PIPE_SPEED * delta.current * 100)
    );
  };

  const handlePipeDeletion = () => {
    const nbPipes = pipes.current.length;
    // Delete pipe if it has left the screen
    pipes.current = pipes.current.filter(
      (pipe) => pipe.positionX + PIPE_WIDTH > 0
    );

    if (pipes.current.length !== nbPipes) incrementScore();
  };

  const updatePipes = () => {
    // Recreate a pipe if necessary
    if (performance.now() - timeOfLastPipeSpawn.current > DELAY_BETWEEN_PIPES) {
      addPipe();
      timeOfLastPipeSpawn.current = performance.now();
    }

    // Delete pipe if it has left the screen
    handlePipeDeletion();

    movePipes();
  };

  const objectCollidesWithAnyPipe = ({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    for (const pipe of pipes.current) {
      if (objectCollideWithPipe({ x, y, width, height }, pipe)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (isPlaying) {
      resetPipes();
    }
  }, [isPlaying]);

  return {
    pipes,
    updatePipes,
    objectCollideWithPipe,
    objectCollidesWithAnyPipe,
  };
};

export default usePipes;
