"use client";

import { useState } from "react";
import Image from "next/image";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const options = [
  {
    id: "none", label: "I only have coffee or tea", icon: <>
      <Image
        src={`/man-funnel/water/none.svg`}
        alt="I only have coffee or tea"
        width={32}
        height={24}
      />
    </>
  },
  {
    id: "low", label: "About 2 glasses", icon: <>
      <Image
        src={`/man-funnel/water/low.svg`}
        alt="About 2 glasses"
        width={32}
        height={24}
      />
    </>
  },
  {
    id: "mid", label: "2 to 6 glasses", icon: <>
      <Image
        src={`/man-funnel/water/mid.svg`}
        alt="2 to 6 glasses"
        width={32}
        height={24}
      />
    </>
  },
  {
    id: "high", label: "More than 6 glasses", icon: <Image
      src={`/man-funnel/water/high.svg`}
      alt="More than 6 glasses"
      width={32}
      height={24}
    />
  },
];

export default function Water() {
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
      <h2 className="text-2xl font-bold mb-8">How much water do you drink daily?</h2>

      <FormOptions options={options} type="radio" onSubmit={handleSelect} />
    </section>
  )

}
