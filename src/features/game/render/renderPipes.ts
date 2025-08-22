import { CANVAS_HEIGHT, PIPE_WIDTH, PIPES_GAP } from "../../../Properties";
import type { Pipe } from "../entities/pipe.type";

const COLORS = {
  border: "#145a32",
  body: ["#2ecc71", "#1e8449"],
  cap: ["#58d68d", "#1e8449"],
};

const CAP_HEIGHT = 30;
const CAP_OFFSET = 5;

let cachedBodyGradient: CanvasGradient | null = null;

const initGradients = (ctx: CanvasRenderingContext2D) => {
  if (!cachedBodyGradient) {
    // Pipe becomes lighter when it reaches the left
    cachedBodyGradient = ctx.createLinearGradient(0, 0, PIPE_WIDTH, 0);
    COLORS.body.forEach((color, i) => {
      cachedBodyGradient?.addColorStop(i, color);
    });
  }
};

const drawPipeBody = (ctx: CanvasRenderingContext2D, pipe: Pipe) => {
  ctx.fillStyle = cachedBodyGradient!;
  ctx.fillRect(pipe.positionX, 0, PIPE_WIDTH, pipe.gapY);
  ctx.fillRect(
    pipe.positionX,
    pipe.gapY + PIPES_GAP,
    PIPE_WIDTH,
    CANVAS_HEIGHT - (pipe.gapY + PIPES_GAP)
  );
};

const drawPipeCaps = (ctx: CanvasRenderingContext2D, pipe: Pipe) => {
  const capGradient = ctx.createLinearGradient(
    pipe.positionX,
    pipe.gapY,
    pipe.positionX + PIPE_WIDTH,
    pipe.gapY
  );
  capGradient.addColorStop(0, COLORS.cap[0]);
  capGradient.addColorStop(1, COLORS.cap[1]);
  ctx.fillStyle = capGradient;
  ctx.fillRect(
    pipe.positionX - CAP_OFFSET,
    pipe.gapY - CAP_HEIGHT,
    PIPE_WIDTH + 2 * CAP_OFFSET,
    CAP_HEIGHT
  );
  ctx.fillRect(
    pipe.positionX - CAP_OFFSET,
    pipe.gapY + PIPES_GAP,
    PIPE_WIDTH + 2 * CAP_OFFSET,
    CAP_HEIGHT
  );

  // Draw a line around top of obstacle
  ctx.strokeStyle = COLORS.border;
  ctx.strokeRect(
    pipe.positionX - CAP_OFFSET,
    pipe.gapY - CAP_HEIGHT,
    PIPE_WIDTH + 2 * CAP_OFFSET,
    CAP_HEIGHT
  );
  ctx.strokeRect(
    pipe.positionX - CAP_OFFSET,
    pipe.gapY + PIPES_GAP,
    PIPE_WIDTH + 2 * CAP_OFFSET,
    CAP_HEIGHT
  );
};

const drawPipes = (ctx: CanvasRenderingContext2D, pipes: Pipe[]) => {
  initGradients(ctx);
  pipes.forEach((pipe) => {
    drawPipeBody(ctx, pipe);
    drawPipeCaps(ctx, pipe);
  });
};

export default drawPipes;
