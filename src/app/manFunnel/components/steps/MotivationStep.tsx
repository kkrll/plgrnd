"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const motivations = [
  {
    id: "energy",
    label: "More Energy",
  },
  {
    id: "confident",
    label: "Feel Confident",
  },
  {
    id: "healthy",
    label: "Stay Healthy",
  },
  {
    id: "stronger",
    label: "Get Stronger",
  },
  {
    id: "other",
    label: "Other",
  },
];

export default function MotivationStep() {
  const { updateData, nextStep } = useFunnelContext();

  const handleSubmit = (selected: string | string[]) => {
    const motivations = Array.isArray(selected) ? selected : [selected];
    updateData({ motivations });
    nextStep();
  };

  return (
    <section className="w-full p-6 flex-1 flex flex-col pb-8">
      <h2 className="text-2xl font-bold mb-8">
        What&apos;s your main motivation to work out?
      </h2>

      <FormOptions
        options={motivations}
        type="checkbox"
        onSubmit={handleSubmit}
      />
    </section>
  );
}
