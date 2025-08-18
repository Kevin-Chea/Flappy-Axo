import { useEffect, useRef } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DELAY_BETWEEN_PIPES,
  PIPE_SPEED,
  PIPE_WIDTH,
  PIPES_GAP,
} from "../Properties";
import { useScore } from "./useScore";
import useGame from "./useGame";

interface Pipe {
  positionX: number;
  gapY: number;
}

const usePipes = () => {
  const pipes = useRef<Pipe[]>([]);
  const { incrementScore } = useScore();
  const { delta, isPlaying } = useGame();
  const timeOfLastPipeSpawn = useRef(0);

  const resetPipes = () => {
    pipes.current = [];
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

  const frameExecution = () => {
    // Recreate a pipe if necessary
    if (performance.now() - timeOfLastPipeSpawn.current > DELAY_BETWEEN_PIPES) {
      addPipe();
      timeOfLastPipeSpawn.current = performance.now();
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
    pipes.current.forEach((pipe) => {
      // Body part
      const bodyGradient = ctx.createLinearGradient(
        pipe.positionX,
        pipe.gapY,
        pipe.positionX + PIPE_WIDTH,
        pipe.gapY
      );
      bodyGradient.addColorStop(0, "#2ecc71"); // green
      bodyGradient.addColorStop(1, "#1e8449"); // dark green
      ctx.fillStyle = bodyGradient;
      ctx.fillRect(pipe.positionX, 0, PIPE_WIDTH, pipe.gapY);
      ctx.fillRect(
        pipe.positionX,
        pipe.gapY + PIPES_GAP,
        PIPE_WIDTH,
        CANVAS_HEIGHT - (pipe.gapY + PIPES_GAP)
      );

      // Top part
      const capHeight = 30;
      const capGradient = ctx.createLinearGradient(
        pipe.positionX,
        pipe.gapY,
        pipe.positionX + PIPE_WIDTH,
        pipe.gapY
      );
      capGradient.addColorStop(0, "#58d68d");
      capGradient.addColorStop(1, "#1e8449");
      ctx.fillStyle = capGradient;
      ctx.fillRect(
        pipe.positionX - 5,
        pipe.gapY - capHeight,
        PIPE_WIDTH + 10,
        capHeight
      );
      ctx.fillRect(
        pipe.positionX - 5,
        pipe.gapY + PIPES_GAP,
        PIPE_WIDTH + 10,
        capHeight
      );

      // Draw a line around top of obstacle
      ctx.strokeStyle = "#145a32";
      ctx.strokeRect(
        pipe.positionX - 5,
        pipe.gapY - capHeight,
        PIPE_WIDTH + 10,
        capHeight
      );
      ctx.strokeRect(
        pipe.positionX - 5,
        pipe.gapY + PIPES_GAP,
        PIPE_WIDTH + 10,
        capHeight
      );
    });
  };

  useEffect(() => {
    if (isPlaying) {
      resetPipes();
    }
  }, [isPlaying]);

  return {
    pipes,
    frameExecution,
    objectCollideWithPipe,
    getFirstPipe,
    drawPipes,
  };
};

export default usePipes;
