"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const fitnessLevelOptions = [
  { id: "starting-scratch", label: "Starting from scratch" },
  { id: "good-inconsistent", label: "Good habits but inconsistent" },
  { id: "stuck-despite-effort", label: "Stuck despite effort" },
];

export default function FitnessLevelStep() {
  const { updateData, nextStep } = useFunnelContext();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string | string[]) => {
    const selectedId = Array.isArray(id) ? id[0] : id;
    setSelected(selectedId);
    updateData({ fitnessLevel: selectedId });

    // Wait 3 seconds before moving to next step
    setTimeout(() => {
      nextStep();
    }, 3000);
  };

  return (
    <>
      <section className="w-full p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">
          How would you describe your training and nutrition?
        </h2>

        <FormOptions
          options={fitnessLevelOptions}
          type="radio"
          onSubmit={handleSelect}
        />
      </section>

      {/* Hint message - bottom panel */}
      <div
        className={`bottom-thing ${selected ? "animate-in" : ""}`}
        style={{ display: selected ? "flex" : "none" }}
      >
        <span className="pt-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="white"
              fillOpacity="0.85"
            />
          </svg>
        </span>

        <p className="text-white text-[14px]">
          Great! We'll build a plan that fits your current fitness level.
        </p>
      </div>
    </>
  );
}
