export const RGBtoHSL = (
  red: number,
  green: number,
  blue: number
): [number, number, number] => {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  const luminace = (max + min) / 2;

  let saturation = 0;
  if (min != max) {
    if (luminace <= 0.5) saturation = (max - min) / (max + min);
    else saturation = (max - min) / (2 - max - min);
  }

  let hue: number;
  if (red >= green && red >= blue) hue = (green - blue) / (max - min);
  else if (green >= red && green >= blue) hue = 2 + (blue - red) / (max - min);
  else hue = 4 + (red - green) / (max - min);
  hue *= 60;
  if (hue < 0) hue += 360;

  return [hue, saturation, luminace];
};

export const HSLtoRGB = (
  hue: number,
  saturation: number,
  luminace: number
): [number, number, number] => {
  if (saturation == 0) return [luminace * 255, luminace * 255, luminace * 255];

  let temp1: number;
  if (luminace < 0.5) temp1 = luminace * (1 + saturation);
  else temp1 = luminace + saturation - luminace * saturation;

  const temp2 = 2 * luminace - temp1;

  hue /= 360;

  let tempRed = hue + 1 / 3;
  if (tempRed > 1) tempRed--;
  let tempGreen = hue;
  let tempBlue = hue - 1 / 3;
  if (tempBlue < 0) tempBlue++;

  const calcColor = (tempClr: number) => {
    if (6 * tempClr <= 1) return temp2 + (temp1 - temp2) * 6 * tempClr;
    if (2 * tempClr <= 1) return temp1;
    if (3 * tempClr <= 2)
      return temp2 + (temp1 - temp2) * (2 / 3 - tempClr) * 6;
    return temp2;
  };

  const r = calcColor(tempRed) * 255;
  const g = calcColor(tempGreen) * 255;
  const b = calcColor(tempBlue) * 255;

  return [r, g, b];
};