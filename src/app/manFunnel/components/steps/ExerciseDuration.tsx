"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const optionsHome = [
  { id: "7", label: "Burst", isRecommended: false, secondaryLabel: '7 min' },
  { id: "10", label: "Boost", isRecommended: false, secondaryLabel: '10 min' },
  { id: "15", label: "Typical", isRecommended: false, secondaryLabel: '15 min' },
  { id: "25", label: "Power", isRecommended: true, secondaryLabel: '25 min' },
  { id: "35", label: "Challenging", isRecommended: false, secondaryLabel: '35 min' },
  { id: "45", label: "Advanced", isRecommended: false, secondaryLabel: '45 min' },
];
const optionsGym = [
  { id: "20", label: "Burst", isRecommended: false, secondaryLabel: '20 min' },
  { id: "30", label: "Boost", isRecommended: false, secondaryLabel: '30 min' },
  { id: "40", label: "Typical", isRecommended: false, secondaryLabel: '40 min' },
  { id: "50", label: "Power", isRecommended: true, secondaryLabel: '50 min' },
  { id: "60", label: "Challenging", isRecommended: false, secondaryLabel: '60 min' },
  { id: "80", label: "Advanced", isRecommended: false, secondaryLabel: '80 min' },
];

export default function ExerciseDuration() {
  const { updateData, nextStep, funnelData } = useFunnelContext();
  const [selected, setSelected] = useState<string | null>(null);

  const options = funnelData.lifestyle?.id === "home" ? optionsHome : optionsGym;

  const handleSelect = (id: string | string[]) => {
    const selectedId = Array.isArray(id) ? id[0] : id;
    setSelected(selectedId);
    updateData({
      exerciseDuration: options.find((option) => option.id === selectedId),
    });
    nextStep();
  };

  return (
    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">How long do you want your workouts to be?</h2>

      <FormOptions options={options} type="radio" onSubmit={handleSelect} secondary />
    </section>
  )

}
