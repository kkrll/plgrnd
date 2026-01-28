"use client";

import { useState } from "react";
import Image from "next/image";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const options = [
  { id: "1", label: "1 workout/week", isRecommended: false },
  { id: "2", label: "2 workouts/week", isRecommended: false },
  { id: "3", label: "3 workouts/week", isRecommended: true },
  { id: "4", label: "4 workouts/week", isRecommended: false },
  { id: "5", label: "5 workouts/week", isRecommended: false },
  { id: "6", label: "6 workouts/week", isRecommended: false },
  { id: "7", label: "Every day", isRecommended: false },
];

export default function ExerciseFrequency() {
  const { updateData, nextStep } = useFunnelContext();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string | string[]) => {
    const selectedId = Array.isArray(id) ? id[0] : id;
    setSelected(selectedId);
    updateData({
      lifestyle: options.find((option) => option.id === selectedId),
    });
    nextStep();
  };

  return (
    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">How many times per week would you like to exercise?</h2>

      <FormOptions options={options} type="radio" onSubmit={handleSelect} />
    </section>
  )

}
