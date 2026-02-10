"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const muscleGroups = [
  {
    id: "shoulders",
    label: "Shoulders",
    highlightImage: "shoulders.webp",
  },
  {
    id: "massive-biceps",
    label: "Arms",
    highlightImage: "biceps.webp",
  },
  {
    id: "chest",
    label: "Chest",
    highlightImage: "chest.webp",
  },
  {
    id: "wider-back",
    label: "Back",
    highlightImage: "back.webp",
  },
  {
    id: "core",
    label: "Belly",
    highlightImage: "core.webp",
  },
  {
    id: "tight-glutes",
    label: "Glutes",
    highlightImage: "glutes.webp",
  },
  {
    id: "strong-legs",
    label: "Legs",
    highlightImage: "legs.webp",
  },
  {
    id: "full-body",
    label: "Full body",
    highlightImage: "",
  },
];

const INDIVIDUAL_MUSCLE_IDS = [
  "shoulders",
  "massive-biceps",
  "chest",
  "wider-back",
  "core",
  "tight-glutes",
  "strong-legs",
];

const isFullBodySelection = (ids: string[]) =>
  INDIVIDUAL_MUSCLE_IDS.every((id) => ids.includes(id));

export default function FocusMuscles() {
  const { updateData, nextStep } = useFunnelContext();
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const handleSelectionChange = (selected: string | string[]) => {
    let muscles = Array.isArray(selected) ? selected : [selected];

    // Check if "full-body" was just added or removed
    const hadFullBody = selectedMuscles.includes("full-body");
    const hasFullBody = muscles.includes("full-body");

    if (!hadFullBody && hasFullBody) {
      // "Full body" was just selected - add all individual muscles
      muscles = ["full-body", ...INDIVIDUAL_MUSCLE_IDS];
    } else if (hadFullBody && !hasFullBody) {
      // "Full body" was just deselected - remove all individual muscles
      muscles = muscles.filter((id) => id !== "full-body");
    } else {
      // Individual muscle was toggled
      const individualMuscles = muscles.filter((id) => id !== "full-body");

      // Check if all individual muscles are now selected
      if (isFullBodySelection(individualMuscles)) {
        // All muscles selected - add "full-body" if not already there
        if (!muscles.includes("full-body")) {
          muscles = ["full-body", ...individualMuscles];
        }
      } else {
        // Not all muscles selected - remove "full-body" if it was there
        muscles = individualMuscles;
      }
    }

    setSelectedMuscles(muscles);
  };

  const handleSubmit = (selected: string | string[]) => {
    let selectedIds = Array.isArray(selected) ? selected : [selected];
    // Remove "full-body" from final data - only save individual muscle objects
    selectedIds = selectedIds.filter((id) => id !== "full-body");
    // Map IDs to objects with id and label
    const focusMuscles = selectedIds
      .map((id) => {
        const muscle = muscleGroups.find((m) => m.id === id);
        return muscle ? { id: muscle.id, label: muscle.label } : null;
      })
      .filter(Boolean) as Array<{ id: string; label: string }>;

    updateData({ focusMuscles });
    nextStep();
  };

  // Get active muscle images based on selections
  const getActiveMuscleImages = () => {
    return muscleGroups
      .filter(
        (group) => group.highlightImage && selectedMuscles.includes(group.id),
      )
      .map((group) => group.highlightImage);
  };

  return (
    <section className="w-full flex flex-col overflow-hidden relative pb-12">
      {/* Background with layered muscle images */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        {/* Base image - always visible */}
        <img
          src="/man-funnel/target-muscle/base.webp"
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
          selected={selectedMuscles}
          onSubmit={handleSubmit}
          onSelectionChange={handleSelectionChange}
          narrow={true}
        />
      </div>
    </section>
  );
}
