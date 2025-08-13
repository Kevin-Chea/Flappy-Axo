export const computeClampedValue = (
  clampValue: number,
  min: number,
  max: number
) => {
  if (clampValue > max) return max;
  if (clampValue < min) return min;
  return clampValue;
};
