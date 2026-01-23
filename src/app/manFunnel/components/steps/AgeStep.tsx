"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import { useDebouncedAction } from "../../hooks/useDebouncedAction";

const ageGroups = [
  { id: "18-29", label: "Age: 18-29", image: "/man-funnel/age-screen/20s.png" },
  { id: "30-39", label: "Age: 30-39", image: "/man-funnel/age-screen/30s.png" },
  { id: "40-49", label: "Age: 40-49", image: "/man-funnel/age-screen/40s.png" },
  { id: "50+", label: "Age: 50+", image: "/man-funnel/age-screen/50s.png" },
];

export default function AgeStep() {
  const { updateData, nextStep } = useFunnelContext();

  const debouncedAction = useDebouncedAction({ delay: 300 });

  const handleSelect = (ageGroup: string) => {
    updateData({ age: ageGroup });
    debouncedAction(nextStep);
  };

  return (
    <section className="w-full p-6 min-h-screen flex flex-col">
      <div className="mb-4">
        <img src="/man-funnel/logo.svg" alt="Logo" className="h-12 w-auto" />
      </div>

      <h1 className="mb-2">Get a Personalized Workout Plan</h1>
      <p className="mb-8">Select your age group:</p>

      <div className="grid grid-cols-2 gap-2 ">
        {ageGroups.map((group) => (
          <button
            key={group.id}
            onMouseUp={() => handleSelect(group.id)}
            className="relative group rounded-3xl h-48 overflow-hidden border border-transparent hover:border-blue-500 transition-all pressable"
          >
            <img
              src={group.image}
              alt={group.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute bg-blue-500 bottom-0 left-0 right-0 px-4 pt-[7px] pb-[9px] flex items-center justify-between">
              <span className="text-white font-semibold text-sm">
                {group.label}
              </span>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 13.3346L14.6667 8.0013M9.33333 2.66797L14.6667 8.0013M14.6667 8.0013L1.33333 8.0013"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
