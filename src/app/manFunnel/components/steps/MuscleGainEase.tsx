"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import { useDebouncedAction } from "../../hooks/useDebouncedAction";

const options = [
  { id: "hard", label: "Hard to gain muscle" },
  { id: "slow-steady", label: "Slow but steady" },
  { id: "easy", label: "Gain muscle easily" },
];

export default function MuscleGainEase() {
  const { updateData, nextStep } = useFunnelContext();
  const debouncedAction = useDebouncedAction({ delay: 300 });

  const handleSelect = (id: string) => {
    updateData({ muscleGainEase: id });
    debouncedAction(nextStep);
  };

  return (
    <section className="w-full p-6 min-h-screen flex-1 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">
        How easily do you gain muscle?
      </h2>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="pressable relative group rounded-2xl overflow-hidden bg-grey-800 hover:bg-grey-700 transition-all p-6 flex items-center justify-center"
          >
            <span className="text-white font-medium text-center">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
