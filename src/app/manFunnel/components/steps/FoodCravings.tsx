"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";
import Button from "../Button";
import { Divider } from "../Divider";

const options = [
  {
    id: "sweet-treats",
    label: "Sweet treats",
  },
  {
    id: "salty-snacks",
    label: "Salty snacksg",
  },
  {
    id: "fast-food",
    label: "Fast food",
  },
  {
    id: "soda",
    label: "Soda",
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

    updateData({ foodCravings: selectedIds.map(id => options.find(option => option.id === id)).filter(Boolean) as Array<{ id: string; label: string }> });
    nextStep();
  };
  return (
    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">What foods do you crave most often?</h2>
      <div className="flex flex-col">
        <FormOptions options={options} type="checkbox" onSubmit={handleSubmit} onSelectionChange={handleSelectionChange} />
        <Button onClick={() => nextStep()} sticky={false} className="bg-grey-800 font-semibold text-left p-6">
          None of above
        </Button>
      </div>
    </section>
  );
}
