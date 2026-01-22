"use client";

import { useFunnelContext } from "../../context/FunnelContext";

const goals = [
  {
    id: "firmer-body",
    label: "A firmer body",
    icon: "/man-funnel/primary-goal/firmer-body.png",
  },
  {
    id: "more-muscle",
    label: "More muscle",
    icon: "/man-funnel/primary-goal/muscle.png",
  },
  {
    id: "weight-loss",
    label: "Weight loss",
    icon: "/man-funnel/primary-goal/weight.png",
  },
  {
    id: "mental-balance",
    label: "Mental balance",
    icon: "/man-funnel/primary-goal/mental-balance.png",
  },
];

export default function GoalsStep() {
  const { updateData, nextStep, previousStep } = useFunnelContext();

  const handleSelect = (goal: string) => {
    updateData({ goal });
    nextStep();
  };

  return (
    <section className="w-full p-6 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-8">
        What is your primary goal today?
      </h2>

      <div className="grid grid-cols-2 gap-4 ">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => handleSelect(goal.id)}
            className="pressable relative group rounded-2xl overflow-hidden border border-blue-500/50 hover:border-blue-500 transition-all p-6 flex flex-col items-center justify-center gap-3"
            style={{
              backgroundImage: `url(/man-funnel/primary-goal/bg.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={goal.icon}
              alt={goal.label}
              className="w-30 h-30 object-contain"
            />
            <span className="text-white font-semibold text-center">
              {goal.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
