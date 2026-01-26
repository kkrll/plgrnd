"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const options = [
  { id: "hard", label: "Hard to gain muscle" },
  { id: "slow-steady", label: "Slow but steady" },
  { id: "easy", label: "Gain muscle easily" },
];

export default function MuscleGainEase() {
  const { updateData, nextStep } = useFunnelContext();

  const handleSubmit = (selected: string | string[]) => {
    updateData({ muscleGainEase: selected as string });
    nextStep();
  };

  return (
    <section className="w-full p-6 min-h-screen flex-1 flex flex-col">
      <h2 className="mb-8">
        How easily do you gain muscle?
      </h2>

      <FormOptions options={options} type="radio" onSubmit={handleSubmit} />
    </section>
  );
}
