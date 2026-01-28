"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const options = [
  { id: "no-time", label: "I hardly have any time for myself" },
  { id: "some-time", label: "I’m busy but try to find some time" },
  { id: "flexible", label: "My schedule is open and flexible" },
];

export default function FreeTime() {
  const { updateData, nextStep } = useFunnelContext();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string | string[]) => {
    const selectedId = Array.isArray(id) ? id[0] : id;
    setSelected(selectedId);
    updateData({
      freetime: options.find((option) => option.id === selectedId),
    });
    nextStep();
  };

  return (
    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">
        How much time do you have for yourself every day?
      </h2>

      <FormOptions options={options} type="radio" onSubmit={handleSelect} />
    </section>
  );
}
