export const getCircleSize = (count: number): number => {
  if (count >= 0 && count < 2) return 60;
  if (count >= 2 && count < 5) return 80;
  if (count >= 5 && count < 8) return 100;
  if (count >= 8 && count < 11) return 120;
  if (count >= 11 && count < 14) return 140;
  if (count >= 14 && count < 17) return 160;
  if (count >= 17 && count < 20) return 180;
  if (count >= 20 && count < 23) return 200;
  if (count >= 23 && count < 26) return 220;
  if (count >= 26 && count < 29) return 240;
  if (count >= 29 && count < 32) return 260;
  if (count >= 32 && count < 35) return 280;
  if (count >= 35 && count < 38) return 300;
  return 320;
};
