import { getImageFit } from "../../../utils/image";
import type { EntityState } from "../entities/entityState.type";
import type { DrawMethod } from "./draw.type";

const drawBird: DrawMethod = (
  ctx: CanvasRenderingContext2D,
  state: EntityState
) => {
  const img = state.img;
  const dimensionsAndOffsets = getImageFit(img, state.width, state.height);
  // Flip image so the head is in the right direction
  ctx.save();
  ctx.scale(-1, 1);

  ctx.drawImage(
    img,
    -state.x,
    state.y,
    -dimensionsAndOffsets.drawWidth,
    dimensionsAndOffsets.drawHeight
  );
  // Reset flip
  ctx.restore();
};

export default drawBird;
