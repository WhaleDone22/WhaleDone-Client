export const getDistance = (count: number): number => {
  if (count >= 0 && count < 2) return 4500;
  if (count >= 2 && count < 5) return 4350;
  if (count >= 5 && count < 8) return 4200;
  if (count >= 8 && count < 11) return 4050;
  if (count >= 11 && count < 14) return 3900;
  if (count >= 14 && count < 17) return 3750;
  if (count >= 17 && count < 20) return 3600;
  if (count >= 20 && count < 23) return 3450;
  if (count >= 23 && count < 26) return 3300;
  if (count >= 26 && count < 29) return 3150;
  if (count >= 29 && count < 32) return 3000;
  if (count >= 32 && count < 35) return 2850;
  if (count >= 35 && count < 38) return 2700;
  if (count >= 38 && count < 41) return 2550;
  if (count >= 41 && count < 44) return 2400;
  if (count >= 44 && count < 47) return 2250;
  if (count >= 47 && count < 50) return 2100;
  if (count >= 47 && count < 50) return 1950;
  if (count >= 47 && count < 50) return 1800;
  if (count >= 47 && count < 50) return 1650;
  if (count >= 47 && count < 50) return 1500;
  if (count >= 47 && count < 50) return 1350;
  if (count >= 47 && count < 50) return 1200;
  if (count >= 47 && count < 50) return 1050;
  if (count >= 47 && count < 50) return 900;
  if (count >= 47 && count < 50) return 750;
  return 600;
};
