"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";
import Button from "../Button";

const options = [
  {
    id: "overeating",
    label: "Overeating",
  },
  {
    id: "boredom-eating",
    label: "Boredom eating",
  },
  {
    id: "late-night-snacking",
    label: "Late-night snacking",
  },
  {
    id: "skipping-meals-too-often",
    label: "Skipping meals too often",
  },
];

export default function FocusMuscles() {
  const { updateData, nextStep } = useFunnelContext();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectionChange = (selected: string | string[]) => {
    const options = Array.isArray(selected) ? selected : [selected];
    setSelected(options);
  };

  const handleSubmit = (selected: string | string[]) => {
    const selectedIds = Array.isArray(selected) ? selected : [selected];

    updateData({ eatingHabits: selectedIds.map(id => options.find(option => option.id === id)).filter(Boolean) as Array<{ id: string; label: string }> });
    nextStep();
  };
  return (
    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Do you have any of the following habits?</h2>
      <div className="flex flex-col">
        <FormOptions options={options} type="checkbox" onSubmit={handleSubmit} onSelectionChange={handleSelectionChange} />
        <Button onClick={() => nextStep()} sticky={false} className="bg-grey-800 font-semibold text-left p-6">
          None of above
        </Button>
      </div>
    </section>
  );
}
