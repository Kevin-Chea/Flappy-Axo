import type { EntityState } from "../entities/entityState.type";

export type DrawMethod = (
  ctx: CanvasRenderingContext2D,
  state: EntityState
) => void;
