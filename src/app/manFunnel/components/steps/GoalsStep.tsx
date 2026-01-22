'use client';

import { useFunnelContext } from '../../context/FunnelContext';

const goals = [
  { id: 'firmer-body', label: 'A firmer body', icon: '💪' },
  { id: 'more-muscle', label: 'More muscle', icon: '🏋️' },
  { id: 'weight-loss', label: 'Weight loss', icon: '⚖️' },
  { id: 'mental-balance', label: 'Mental balance', icon: '⚡' },
];

export default function GoalsStep() {
  const { updateData, nextStep, previousStep } = useFunnelContext();

  const handleSelect = (goal: string) => {
    updateData({ goal });
    nextStep();
  };

  return (
    <section className="w-full p-6 min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={previousStep}
          className="text-white text-xl"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold uppercase">GOALS</h1>
      </div>

      <h2 className="text-2xl font-bold mb-8">
        What is your primary goal today?
      </h2>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => handleSelect(goal.id)}
            className="relative group rounded-lg overflow-hidden border border-blue-500/50 hover:border-blue-500 transition-all p-6 flex flex-col items-center justify-center gap-3 bg-gray-900/50"
          >
            <span className="text-4xl">{goal.icon}</span>
            <span className="text-white font-semibold text-center">{goal.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
