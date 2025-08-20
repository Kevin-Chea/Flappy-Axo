import { CANVAS_HEIGHT, PIPE_WIDTH, PIPES_GAP } from "../../../Properties";
import type { Pipe } from "../entities/pipe.type";

const PIPE_BORDER_COLOR = "#145a32";

const BODY_PIPE_COLOR_1 = "#2ecc71"; // green
const BODY_PIPE_COLOR_2 = "#1e8449"; // dark green

const TOP_PIPE_COLOR_1 = "#58d68d";
const TOP_PIPE_COLOR_2 = "#1e8449";

const drawPipes = (ctx: CanvasRenderingContext2D, pipes: Pipe[]) => {
  pipes.forEach((pipe) => {
    // Body part
    const bodyGradient = ctx.createLinearGradient(
      pipe.positionX,
      pipe.gapY,
      pipe.positionX + PIPE_WIDTH,
      pipe.gapY
    );
    bodyGradient.addColorStop(0, BODY_PIPE_COLOR_1); // green
    bodyGradient.addColorStop(1, BODY_PIPE_COLOR_2); // dark green
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
    capGradient.addColorStop(0, TOP_PIPE_COLOR_1);
    capGradient.addColorStop(1, TOP_PIPE_COLOR_2);
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
    ctx.strokeStyle = PIPE_BORDER_COLOR;
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

export default drawPipes;
