import { CANVAS_HEIGHT, PIPE_WIDTH, PIPES_GAP } from "../../../Properties";
import type { Pipe } from "../entities/pipe.type";

const COLORS = {
  border: "#145a32",
  body: ["#2ecc71", "#1e8449"],
  cap: ["#58d68d", "#1e8449"],
};

const drawPipes = (ctx: CanvasRenderingContext2D, pipes: Pipe[]) => {
  pipes.forEach((pipe) => {
    // Body part
    const bodyGradient = ctx.createLinearGradient(
      pipe.positionX,
      pipe.gapY,
      pipe.positionX + PIPE_WIDTH,
      pipe.gapY
    );
    bodyGradient.addColorStop(0, COLORS.body[0]); // green
    bodyGradient.addColorStop(1, COLORS.body[1]); // dark green
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
    capGradient.addColorStop(0, COLORS.cap[0]);
    capGradient.addColorStop(1, COLORS.cap[1]);
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
    ctx.strokeStyle = COLORS.border;
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
