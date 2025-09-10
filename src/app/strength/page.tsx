"use client";

import Link from "next/link";

// Dummy data for strength levels
const levels = [
  {
    name: "Beginner",
    min: 0,
    max: 199,
    color: "bg-green-400",
  },
  {
    name: "Intermediate",
    min: 200,
    max: 399,
    color: "bg-yellow-400",
  },
  {
    name: "Advanced",
    min: 400,
    max: 599,
    color: "bg-orange-500",
  },
  {
    name: "Pro",
    min: 600,
    max: 799,
    color: "bg-red-500",
  },
  {
    name: "Elite",
    min: 800,
    max: 1000,
    color: "bg-purple-600",
  },
];

const currentScore = 420; // TODO: replace with real data source

const StrengthScorePage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="text-xl font-bold p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
        >
          ←
        </Link>
        <h1 className="text-lg font-semibold">Strength Score</h1>
      </header>

      {/* Current score */}
      <section className="flex flex-col items-center text-center mb-8">
        <span className="text-sm uppercase tracking-widest text-gray-500">
          Current Score
        </span>
        <span className="text-6xl font-extrabold text-purple-700">
          {currentScore}
        </span>
        <span className="text-sm text-gray-600">points</span>
      </section>

      {/* Horizontal scrollable levels */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-medium">Level Progression</h2>
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-4 w-max snap-x snap-mandatory">
            {levels.map((lvl) => {
              const isAchieved = currentScore >= lvl.min;
              const widthPercent = Math.min(
                100,
                ((Math.min(currentScore, lvl.max) - lvl.min) /
                  (lvl.max - lvl.min)) *
                  100
              );
              return (
                <div
                  key={lvl.name}
                  className="snap-start shrink-0 w-56 rounded-xl border border-gray-200 shadow-sm p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">{lvl.name}</span>
                    {isAchieved && (
                      <span className="text-xs font-medium text-green-600">
                        ✓
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div className="h-3 w-full rounded bg-gray-100 overflow-hidden mb-2">
                    <div
                      className={`h-full ${lvl.color}`}
                      style={{ width: `${isAchieved ? widthPercent : 0}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>{lvl.min}</span>
                    <span>{lvl.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default StrengthScorePage;
