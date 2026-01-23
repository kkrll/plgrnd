"use client";

import { useMemo, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import UnitToggle from "../UnitToggle";
import RulerPicker from "../RulerPicker";
import HintCard from "../HintCard";
import { clamp, kgToLb, lbToKg, roundTo } from "../../utils/units";
import { calcBmi, healthyWeightRangeForHeight, lossPercent, targetHintBucket } from "../../utils/health";

type WeightUnit = "lb" | "kg";

export default function TargetWeightStep() {
  const { funnelData, updateData, nextStep } = useFunnelContext();
  const [unit, setUnit] = useState<WeightUnit>("lb");

  const heightCm = funnelData.heightCm ?? 176;
  const currentKg = funnelData.weightKg ?? 76;
  const targetKg = funnelData.targetWeightKg ?? currentKg;

  const lbValue = useMemo(() => clamp(roundTo(kgToLb(targetKg), 1), 80, 350), [targetKg]);
  const kgValue = useMemo(() => clamp(roundTo(targetKg, 1), 35, 200), [targetKg]);

  const presetLb = useMemo(() => Math.round(clamp(kgToLb(currentKg), 80, 350)), [currentKg]);
  const presetKg = useMemo(() => Math.round(clamp(currentKg, 35, 200)), [currentKg]);

  const pctLoss = useMemo(() => lossPercent(currentKg, targetKg), [currentKg, targetKg]);
  const pctLossRounded = useMemo(() => Math.round(pctLoss), [pctLoss]);
  const bucket = useMemo(() => targetHintBucket(pctLoss), [pctLoss]);

  const targetBmi = useMemo(() => calcBmi(heightCm, targetKg), [heightCm, targetKg]);
  const { minKg, maxKg } = useMemo(() => healthyWeightRangeForHeight(heightCm), [heightCm]);
  const isTargetUnderHealthy = Number.isFinite(targetBmi) && targetBmi < 18.5;
  const healthyMinLb = useMemo(() => Math.round(kgToLb(minKg)), [minKg]);
  const healthyMaxLb = useMemo(() => Math.round(kgToLb(maxKg)), [maxKg]);

  const hint = useMemo(() => {
    if (isTargetUnderHealthy) {
      return {
        variant: "red" as const,
        title: "Uh-oh! Low weight alert!",
        body: `A healthy weight range for your height is between ${healthyMinLb} lbs and ${healthyMaxLb} lbs. Any weight below is classified as underweight and is not recommended by the World Health Organization.`,
      };
    }

    if (bucket === "challenging") {
      return {
        variant: "green" as const,
        title: `CHALLENGING GOAL: lose ${pctLossRounded}% of your weight`,
        body: `In a new study by Mayo Clinic, overweight people who lose more than 20% of their body weight are almost 2½ times more likely to have good metabolic health as those who lose 5–10%.`,
      };
    }

    if (bucket === "health") {
      return {
        variant: "green" as const,
        title: `HEALTH BENEFITS: lose ${pctLossRounded}% of your weight`,
        body: `There’s scientific evidence that some obesity-related conditions improve with 10% or higher weight loss: a reduced chance of having a heart attack, lower blood sugar, and decreased inflammation in blood vessels.`,
      };
    }

    return {
      variant: "blue" as const,
      title: `EASY WIN: lose ${pctLossRounded}% of your weight`,
      body: `As per a study by the University of Utah, even 5-minute workouts every day can help you keep fit and improve your sleep and energy levels.`,
    };
  }, [bucket, healthyMaxLb, healthyMinLb, isTargetUnderHealthy, pctLossRounded]);

  return (
    <>
      <section className="w-full min-h-screen pb-24 flex flex-col">
        <div className="p-6 flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">What's your target weight?</h2>
          </div>

          <UnitToggle<WeightUnit>
            value={unit}
            onChange={setUnit}
            options={[
              { value: "lb", label: "POUNDS" },
              { value: "kg", label: "KILOGRAMS" },
            ]}
          />

          {unit === "lb" ? (
            <RulerPicker
              min={80}
              max={350}
              step={1}
              defaultValue={Math.round(lbValue)}
              majorEvery={10}
              unitLabel="lbs"
              presetValue={presetLb}
              onChange={(lb) => updateData({ targetWeightKg: roundTo(lbToKg(lb), 0.1) })}
            />
          ) : (
            <RulerPicker
              min={35}
              max={200}
              step={1}
              defaultValue={Math.round(kgValue)}
              majorEvery={10}
              unitLabel="kg"
              presetValue={presetKg}
              onChange={(kg) => updateData({ targetWeightKg: kg })}
            />
          )}

          <HintCard variant={hint.variant} title={hint.title} body={hint.body} />
        </div>
      </section>

      <Button onClick={nextStep}>Continue</Button>
    </>
  );
}

