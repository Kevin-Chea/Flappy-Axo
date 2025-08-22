export const clamp = (clampValue: number, min: number, max: number) => {
  return Math.min(Math.max(min, clampValue), max);
};
