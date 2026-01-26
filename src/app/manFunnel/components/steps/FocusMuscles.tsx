"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const muscleGroups = [
  {
    id: "shoulders",
    label: "Shoulders",
    highlightImage: "shoulders.png",
  },
  {
    id: "massive-biceps",
    label: "Massive Biceps",
    highlightImage: "biceps.png",
  },
  {
    id: "chest",
    label: "Chest",
    highlightImage: "chest.png",
  },
  {
    id: "wider-back",
    label: "Wider Back",
    highlightImage: "back.png",
  },
  {
    id: "core",
    label: "Core",
    highlightImage: "core.png",
  },
  {
    id: "tight-glutes",
    label: "Tight Glutes",
    highlightImage: "glutes.png",
  },
  {
    id: "strong-legs",
    label: "Strong Legs",
    highlightImage: "legs.png",
  },
];

export default function FocusMuscles() {
  const { updateData, nextStep } = useFunnelContext();
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const handleSelectionChange = (selected: string | string[]) => {
    const muscles = Array.isArray(selected) ? selected : [selected];
    setSelectedMuscles(muscles);
  };

  const handleSubmit = (selected: string | string[]) => {
    const selectedIds = Array.isArray(selected) ? selected : [selected];
    // Map IDs to objects with id and label
    const focusMuscles = selectedIds.map(id => {
      const muscle = muscleGroups.find(m => m.id === id);
      return muscle ? { id: muscle.id, label: muscle.label } : null;
    }).filter(Boolean) as Array<{ id: string; label: string }>;
    
    updateData({ focusMuscles });
    nextStep();
  };

  // Get active muscle images based on selections
  const getActiveMuscleImages = () => {
    return muscleGroups
      .filter((group) => selectedMuscles.includes(group.id))
      .map((group) => group.highlightImage);
  };

  return (
    <section className="w-full flex flex-col overflow-hidden relative pb-12">
      {/* Background with layered muscle images */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        {/* Base image - always visible */}
        <img
          src="/man-funnel/target-muscle/base.png"
          alt="Base body"
          className="absolute bottom-0 right-0 min-w-[390px]  w-auto"
        />

        {/* Overlay images - shown when selected */}
        {getActiveMuscleImages().map((image) => (
          <img
            key={image}
            src={`/man-funnel/target-muscle/${image}`}
            alt="Muscle highlight"
            className="absolute bottom-0 right-0 min-w-[390px]  transition-opacity duration-300"
          />
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full p-6 flex-1 flex flex-col pb-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 flex-shrink-0">
          What&apos;s your current muscle-building goal?
        </h2>

        <FormOptions
          options={muscleGroups}
          type="checkbox"
          onSubmit={handleSubmit}
          onSelectionChange={handleSelectionChange}
          narrow={true}
        />
      </div>
    </section>
  );
}
