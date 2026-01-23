"use client";

import { useMemo, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import UnitToggle from "../UnitToggle";
import RulerPicker from "../RulerPicker";
import HintCard from "../HintCard";
import { clamp, cmToInches, formatFtIn, inchesToCm, roundTo } from "../../utils/units";

type HeightUnit = "ftin" | "cm";

export default function HeightStep() {
  const { funnelData, updateData, nextStep } = useFunnelContext();
  const [unit, setUnit] = useState<HeightUnit>("ftin");

  // Defaults roughly aligned with the mock.
  // Also protects against 0/NaN/out-of-range values (these would clamp to min in FT/IN).
  const heightCm = useMemo(() => {
    const raw = funnelData.heightCm;
    if (typeof raw !== "number" || !Number.isFinite(raw)) return 176;
    if (raw < 120 || raw > 230) return 176;
    return raw;
  }, [funnelData.heightCm]);

  const inchesValue = useMemo(() => clamp(roundTo(cmToInches(heightCm), 1), 48, 90), [heightCm]);
  const cmValue = useMemo(() => clamp(roundTo(heightCm, 1), 120, 230), [heightCm]);

  return (
    <>
      <section className="w-full min-h-screen pb-24 flex flex-col">
        <div className="p-6 flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">How tall are you?</h2>
          </div>

          <UnitToggle<HeightUnit>
            value={unit}
            onChange={setUnit}
            options={[
              { value: "ftin", label: "FT / IN" },
              { value: "cm", label: "CM" },
            ]}
          />

          {unit === "ftin" ? (
            <RulerPicker
              min={48}
              max={90}
              step={1}
              defaultValue={Math.round(inchesValue)}
              majorEvery={12}
              unitLabel=""
              renderValue={(v) => {
                const { ft, inch } = formatFtIn(v);
                return (
                  <span className="flex items-baseline justify-center gap-2">
                    <span>{ft}</span>
                    <span className="text-xl text-gray-400 font-medium">ft</span>
                    <span>{inch}</span>
                    <span className="text-xl text-gray-400 font-medium">in</span>
                  </span>
                );
              }}
              onChange={(inches) => {
                updateData({ heightCm: Math.round(inchesToCm(inches)) });
              }}
            />
          ) : (
            <RulerPicker
              min={120}
              max={230}
              step={1}
              defaultValue={Math.round(cmValue)}
              majorEvery={10}
              unitLabel="cm"
              onChange={(cm) => updateData({ heightCm: cm })}
            />
          )}

          <HintCard
            variant="blue"
            title="Calculating your body mass index"
            body="BMI is widely used as a risk factor for the development of the prevalence of several health issues."
          />
        </div>
      </section>

      <Button onClick={nextStep}>Continue</Button>
    </>
  );
}

