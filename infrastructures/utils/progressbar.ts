export const getProgressbarWidth = (distance: number): number => {
  if (distance > 4050 && distance <= 4500) return 16.3 * 10;
  if (distance >= 3600 && distance <= 4050) return 16.3 * 9;
  if (distance >= 3150 && distance < 3600) return 16.3 * 8;
  if (distance >= 2700 && distance < 3150) return 16.3 * 7;
  if (distance >= 2250 && distance < 2700) return 16.3 * 6;
  if (distance >= 1800 && distance < 2250) return 16.3 * 5;
  if (distance >= 1350 && distance < 1800) return 16.3 * 4;
  if (distance >= 900 && distance < 1350) return 16.3 * 3;
  if (distance >= 450 && distance < 900) return 16.3 * 2;
  if (distance >= 0 && distance < 450) return 16.3;
};
