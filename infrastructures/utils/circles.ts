export const getCircleSize = (count: number): number => {
  if (count < 38) return Math.floor((count + 1) / 3) * 20 + 60;
  return 320;
};
