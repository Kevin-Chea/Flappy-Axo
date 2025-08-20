import { drawImage } from "../../../utils/image";
import type { DrawMethod } from "./draw.type";

const drawBackground: DrawMethod = (ctx, state) => {
  const img = state.img;
  drawImage(ctx, img, state.width, state.height);
};

export default drawBackground;
