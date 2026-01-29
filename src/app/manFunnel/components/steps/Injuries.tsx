"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";
import Button from "../Button";
import { Divider } from "../Divider";

const options = [
  {
    id: "shoulders",
    label: "Shoulders",
  },
  {
    id: "back",
    label: "Back",
  },
  {
    id: "knees",
    label: "Knees",
  },
  {
    id: "something-else",
    label: "Something else",
    hasRemark: "Zing AI Coach will talk to you to tune your plan",
  },
];

export default function InjuriesStep() {
  const { updateData, nextStep } = useFunnelContext();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectionChange = (selected: string | string[]) => {
    const options = Array.isArray(selected) ? selected : [selected];
    setSelected(options);
  };

  const handleSubmit = (selected: string | string[]) => {
    const selectedIds = Array.isArray(selected) ? selected : [selected];

    updateData({ injuries: selectedIds.map(id => options.find(option => option.id === id)).filter(Boolean) as Array<{ id: string; label: string }> });
    nextStep();
  };
  return (
    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Do you have any injuries?</h2>
      <div className="flex flex-col">
        <Button onClick={() => nextStep()} sticky={false} className="bg-grey-800 font-semibold text-left p-6">
          No Issues
        </Button>
        <Divider className="my-4" />
        <FormOptions options={options} type="checkbox" onSubmit={handleSubmit} onSelectionChange={handleSelectionChange} />
      </div>
    </section>
  );
}
