import { clamp } from "./units";

export function calcBmi(heightCm: number, weightKg: number) {
  const heightM = heightCm / 100;
  if (!Number.isFinite(heightM) || heightM <= 0) return NaN;
  if (!Number.isFinite(weightKg) || weightKg <= 0) return NaN;
  return weightKg / (heightM * heightM);
}

export type BmiCategory = "underweight" | "normal" | "overweight" | "obese";

export function bmiCategory(bmi: number): BmiCategory {
  // Standard BMI thresholds
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

export function healthyWeightRangeForHeight(heightCm: number) {
  const heightM = heightCm / 100;
  const min = 18.5 * heightM * heightM;
  const max = 24.9 * heightM * heightM;
  return {
    minKg: min,
    maxKg: max,
  };
}

export function lossPercent(currentKg: number, targetKg: number) {
  if (!Number.isFinite(currentKg) || currentKg <= 0) return 0;
  if (!Number.isFinite(targetKg) || targetKg <= 0) return 0;
  const pct = ((currentKg - targetKg) / currentKg) * 100;
  return clamp(pct, 0, 100);
}

export type TargetHintBucket = "easy" | "health" | "challenging";

export function targetHintBucket(lossPct: number): TargetHintBucket {
  if (lossPct < 5) return "easy";
  if (lossPct <= 20) return "health";
  return "challenging";
}

