"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import RulerPicker from "../RulerPicker";

const options = [
  { id: "none", label: "I only have coffee or tea" },
  { id: "low", label: "About 2 glasses" },
  { id: "mid", label: "2 to 6 glasses" },
  { id: "high", label: "More than 6 glasses" },
];

export default function Water() {
  const { funnelData, nextStep, updateData } = useFunnelContext();
  const tickGroup = 10;
  const defaultIndex = useMemo(() => {
    const fallbackId = "mid";
    const id = funnelData.water?.id ?? fallbackId;
    const index = options.findIndex((option) => option.id === id);
    return index === -1 ? 0 : index;
  }, [funnelData.water?.id]);

  const [selectionIndex, setSelectionIndex] = useState(defaultIndex);

  useEffect(() => {
    setSelectionIndex(defaultIndex);
  }, [defaultIndex]);

  const selectedOption = options[selectionIndex] ?? options[0];

  useEffect(() => {
    updateData({ water: selectedOption });
  }, [selectedOption, updateData]);

  return (
    <>
      <section className="w-full min-h-screen pb-24 flex flex-col">
        <div className="p-6 flex-1 flex flex-col gap-6">
          <h2 className="mb-12">How much water do you drink daily?</h2>

          <RulerPicker
            min={0}
            max={(options.length - 1) * tickGroup}
            step={1}
            defaultValue={defaultIndex * tickGroup}
            majorEvery={tickGroup}
            snapEvery={tickGroup}
            valueClassName="flex flex-col items-center gap-4 text-2xl font-semibold tracking-normal"
            renderValue={() => (
              <>
                <Image
                  src={`/man-funnel/water/${selectedOption.id}.svg`}
                  alt={selectedOption.label}
                  width={56}
                  height={40}
                />
                <span>{selectedOption.label}</span>
              </>
            )}
            onChange={(value) => {
              const nextIndex = Math.round(value / tickGroup);
              setSelectionIndex(nextIndex);
              const option = options[nextIndex] ?? options[0];
              updateData({ water: option });
            }}
          />
        </div>
      </section>

      <Button onClick={nextStep}>Continue With My Plan</Button>
    </>
  );
}
