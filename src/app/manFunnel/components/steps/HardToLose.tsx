"use client";

import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";

const muscleGoalAreas = [
  { id: "size", label: "Gain Muscle Size", image: "/man-funnel/hard-to-lose/size.webp" },
  { id: "strength", label: "Build Strength", image: "/man-funnel/hard-to-lose/strength.webp" },
  { id: "definition", label: "Improve Definition", image: "/man-funnel/hard-to-lose/definition.webp" },
  { id: "equally-difficult", label: "All of them", image: null }
];

const fatLossAreas = [
  { id: "belly", label: "Belly", image: "/man-funnel/hard-to-lose/belly.webp" },
  { id: "love-handles", label: "Love Handles", image: "/man-funnel/hard-to-lose/love-handles.webp" },
  { id: "chest", label: "Chest", image: "/man-funnel/hard-to-lose/chest.webp" },
  { id: "lower-back", label: "Lower Back", image: "/man-funnel/hard-to-lose/lower-back.webp" },
  { id: "legs", label: "Legs", image: "/man-funnel/hard-to-lose/legs.webp" },
  { id: "arms", label: "Arms", image: "/man-funnel/hard-to-lose/arms.webp" },
  { id: "hips", label: "Hips", image: "/man-funnel/hard-to-lose/hips.webp" },
  { id: "equally-difficult", label: "They are all equally difficult", image: null },
];

export default function HardToLose() {
  const { updateData, nextStep, funnelData } = useFunnelContext();
  const [selected, setSelected] = useState<string[]>([]);

  const isMuscleGoal = funnelData.goal === "firmer-body" || funnelData.goal === "muscle";

  const areas = useMemo(() => {
    return isMuscleGoal ? muscleGoalAreas : fatLossAreas;
  }, [isMuscleGoal]);

  const title = isMuscleGoal
    ? "What’s your current muscle-building goal?"
    : "Where is fat hardest to lose?";

  const subtitle = isMuscleGoal
    ? ""
    : "Select up to 3";

  const handleToggle = (id: string) => {
    // For muscle goals, no "equally-difficult" option, so no special handling
    if (id === "equally-difficult") {
      // Immediately save and advance
      updateData({ hardToLoseAreas: [id] });
      nextStep();
      return;
    }

    setSelected((prev) => {
      if (prev.includes(id)) {
        // Remove if already selected
        return prev.filter((s) => s !== id);
      } else {
        // Add if less than 3 selected
        if (prev.length < 3) {
          return [...prev, id];
        }
        return prev;
      }
    });
  };

  const handleSubmit = () => {
    updateData({ hardToLoseAreas: selected });
    nextStep();
  };

  const isSelected = (id: string) => selected.includes(id);

  const buttonPortal = typeof document !== 'undefined' ? createPortal(
    <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto p-6 bg-gradient-to-t from-black via-black/95 to-transparent pt-8 pointer-events-none z-50">
      <div className="pointer-events-auto">
        <Button onClick={handleSubmit} disabled={selected.length === 0}>
          Continue
        </Button>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <section className="w-full min-h-screen pb-24">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            {title}
          </h2>
          <p className="mb-6">{subtitle}</p>

          <div className="grid grid-cols-2 gap-2">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => handleToggle(area.id)}
                disabled={
                  !isSelected(area.id) &&
                  selected.length >= 3 &&
                  area.id !== "equally-difficult"
                }
                className={`relative rounded-3xl w-full overflow-hidden transition-all pressable aspect-square ${!isSelected(area.id) &&
                  selected.length >= 3 &&
                  area.id !== "equally-difficult"
                  ? "opacity-50"
                  : ""
                  }`}
              >
                {/* Image or text background */}
                {area.image ? (
                  <img
                    src={area.image}
                    alt={area.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-grey-800 flex items-center justify-center p-4">
                    <span className="text-white text-center font-medium text-sm">
                      {area.label}
                    </span>
                  </div>
                )}

                {/* Label overlay for image cards only */}
                {area.image && (
                  <>
                    <div className={`absolute bottom-0 left-0 right-0 ${isSelected(area.id) ? "bg-blue-500" : "bg-black/60 backdrop-blur-md"} to-transparent p-2`}>
                      <span className="text-white font-semibold text-sm">
                        {area.label}
                      </span>
                    </div>

                    {/* Checkbox only for image cards */}
                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-lg ${isSelected(area.id) ? "bg-blue-500" : "bg-grey-900/80 border border-grey-700"}  flex items-center justify-center`}>
                      {isSelected(area.id) && (
                        <svg
                          width="14"
                          height="11"
                          viewBox="0 0 14 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white"
                        >
                          <path
                            d="M1 5.5L5 9.5L13 1.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {buttonPortal}
    </>
  );
}
