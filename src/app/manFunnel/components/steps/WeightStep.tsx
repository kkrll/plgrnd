"use client";

import { useMemo, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import UnitToggle from "../UnitToggle";
import RulerPicker from "../RulerPicker";
import HintCard from "../HintCard";
import { clamp, kgToLb, lbToKg, roundTo } from "../../utils/units";
import { bmiCategory, calcBmi } from "../../utils/health";

type WeightUnit = "lb" | "kg";

export default function WeightStep() {
  const { funnelData, updateData, nextStep } = useFunnelContext();
  const [unit, setUnit] = useState<WeightUnit>("lb");

  // Defaults roughly aligned with the mock
  const weightKg = funnelData.weightKg ?? 76;
  const heightCm = funnelData.heightCm ?? 176;

  const lbValue = useMemo(() => clamp(roundTo(kgToLb(weightKg), 1), 80, 350), [weightKg]);
  const kgValue = useMemo(() => clamp(roundTo(weightKg, 1), 35, 200), [weightKg]);

  const bmi = useMemo(() => calcBmi(heightCm, weightKg), [heightCm, weightKg]);
  const bmiText = useMemo(() => (Number.isFinite(bmi) ? bmi.toFixed(1) : "—"), [bmi]);
  const category = useMemo(
    () => (Number.isFinite(bmi) ? bmiCategory(bmi) : "normal"),
    [bmi],
  );

  const hintVariant = category === "normal" ? "green" : category === "obese" ? "red" : "yellow";
  const categoryLabel =
    category === "normal" ? "normal" : category === "obese" ? "obese" : category;

  return (
    <>
      <section className="w-full min-h-screen pb-24 flex flex-col">
        <div className="p-6 flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">What's your current weight?</h2>
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
              onChange={(lb) => updateData({ weightKg: roundTo(lbToKg(lb), 0.1) })}
            />
          ) : (
            <RulerPicker
              min={35}
              max={200}
              step={1}
              defaultValue={Math.round(kgValue)}
              majorEvery={10}
              unitLabel="kg"
              onChange={(kg) => updateData({ weightKg: kg })}
            />
          )}

          <HintCard
            variant={hintVariant}
            title={`Your BMI is ${bmiText}, which is considered ${categoryLabel}`}
            body={`You're off to a great start! We'll take your BMI into consideration when we personalize your fitness program.`}
          />
        </div>
      </section>

      <Button onClick={nextStep}>Continue</Button>
    </>
  );
}

