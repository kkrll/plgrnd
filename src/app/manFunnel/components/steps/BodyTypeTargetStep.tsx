"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import { useDebouncedAction } from "../../hooks/useDebouncedAction";

const targetBodyTypes = [
  {
    id: "lean",
    label: "Lean",
    image: "/man-funnel/body-type-target/lean.webp",
  },
  {
    id: "muscular",
    label: "Muscular",
    image: "/man-funnel/body-type-target/muscular.webp",
  },
  {
    id: "athletic",
    label: "Athletic",
    image: "/man-funnel/body-type-target/athletic.webp",
  },
  {
    id: "ripped",
    label: "Ripped",
    image: "/man-funnel/body-type-target/ripped.webp",
  },
];

export default function BodyTypeTargetStep() {
  const { updateData, nextStep, funnelData } = useFunnelContext();

  const debouncedAction = useDebouncedAction({ delay: 300 });

  const handleSelect = (bodyTypeTarget: string) => {
    updateData({ bodyTypeTarget });
    debouncedAction(nextStep);
  };

  return (
    <section className="w-full p-6 min-h-screen flex flex-col">
      <h2 className="mb-6">{funnelData.name}, what's your dream body?</h2>

      <div className="grid grid-cols-2 gap-2 ">
        {targetBodyTypes.map((type) => (
          <button
            key={type.id}
            onMouseUp={() => handleSelect(type.id)}
            className="relative group flex flex-col rounded-3xl h-48 bg-grey-800 overflow-hidden border border-transparent hover:border-blue-500 transition-all pressable"
          >
            <div className="flex-1 w-full overflow-hidden">
              <img
                src={type.image}
                alt={type.label}
                className="mx-auto h-full object-cover"
              />
            </div>
            <div className="flex-shrink-0 bg-grey-700 w-full px-4 py-2 flex items-center justify-center">
              <span className="text-white font-semibold">{type.label}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
