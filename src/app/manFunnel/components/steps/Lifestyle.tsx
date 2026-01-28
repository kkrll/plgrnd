"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const options = [
  { id: "sedatory", label: "I spend my days sitting" },
  { id: "mixed", label: "I try to move when I can" },
  { id: "on-feet", label: "I'm on my feet all day long" },
];

export default function Lifestyle() {
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
      <h2 className="text-2xl font-bold mb-8">What’s your lifestyle like?</h2>

      <FormOptions options={options} type="radio" onSubmit={handleSelect} />
    </section>
  );
}
