import { useRef } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FRAMES_BETWEEN_PIPES,
  PIPE_SPEED,
  PIPE_WIDTH,
  PIPES_GAP,
} from "../Properties";
import { useScore } from "./useScore";

interface Pipe {
  positionX: number;
  gapY: number;
}

const usePipes = () => {
  const pipes = useRef<Pipe[]>([]);
  const { incrementScore } = useScore();

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
    pipes.current.forEach((pipe) => (pipe.positionX += PIPE_SPEED));
  };

  const handlePipeDeletion = () => {
    const nbPipes = pipes.current.length;
    // Delete pipe if it has left the screen
    pipes.current = pipes.current.filter(
      (pipe) => pipe.positionX + PIPE_WIDTH > 0
    );

    if (pipes.current.length !== nbPipes) incrementScore();
  };

  const frameExecution = (frameNumber: number) => {
    // Recreate a pipe if necessary
    if (frameNumber % FRAMES_BETWEEN_PIPES === 0) {
      addPipe();
    }

    // Delete pipe if it has left the screen
    handlePipeDeletion();

    movePipes();
  };

  const getFirstPipe = () => {
    if (!pipes.current || pipes.current.length == 0) return null;
    return pipes.current[0];
  };

  const drawPipes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "green";
    pipes.current.forEach((pipe) => {
      ctx.fillRect(pipe.positionX, 0, PIPE_WIDTH, pipe.gapY);
      ctx.fillRect(
        pipe.positionX,
        pipe.gapY + PIPES_GAP,
        PIPE_WIDTH,
        CANVAS_HEIGHT - (pipe.gapY + PIPES_GAP)
      );
    });
  };

  return {
    pipes,
    frameExecution,
    objectCollideWithPipe,
    getFirstPipe,
    drawPipes,
  };
};

export default usePipes;
