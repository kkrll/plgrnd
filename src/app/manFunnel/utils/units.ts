export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function roundTo(n: number, step = 1) {
  if (!step) return n;
  return Math.round(n / step) * step;
}

// Height
export function cmToInches(cm: number) {
  return cm / 2.54;
}

export function inchesToCm(inches: number) {
  return inches * 2.54;
}

export function inchesToFtIn(inches: number) {
  const total = Math.round(inches);
  const ft = Math.floor(total / 12);
  const inch = total % 12;
  return { ft, in: inch };
}

export function formatFtIn(inches: number) {
  const { ft, in: inch } = inchesToFtIn(inches);
  return { ft, inch, label: `${ft} ft ${inch} in` };
}

// Weight
export function kgToLb(kg: number) {
  return kg * 2.2046226218;
}

export function lbToKg(lb: number) {
  return lb / 2.2046226218;
}

