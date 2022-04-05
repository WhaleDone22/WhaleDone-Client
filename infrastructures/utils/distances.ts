export const getDistance = (count: number): number => {
  if (count >= 0 && count < 2) return 9000;
  if (count >= 2 && count < 5) return 8800;
  if (count >= 5 && count < 8) return 8600;
  if (count >= 8 && count < 11) return 8400;
  if (count >= 11 && count < 14) return 8200;
  if (count >= 14 && count < 17) return 8000;
  if (count >= 17 && count < 20) return 7800;
  if (count >= 20 && count < 23) return 7600;
  if (count >= 23 && count < 26) return 7400;
  if (count >= 26 && count < 29) return 7200;
  if (count >= 29 && count < 32) return 7000;
  if (count >= 32 && count < 35) return 6800;
  if (count >= 35 && count < 38) return 6600;
  if (count >= 38 && count < 41) return 6400;
  if (count >= 41 && count < 44) return 6200;
  if (count >= 44 && count < 47) return 6000;
  return 5000;
};
