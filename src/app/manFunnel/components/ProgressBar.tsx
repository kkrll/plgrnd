"use client";

import { useFunnelContext } from "../context/FunnelContext";

interface ProgressBarProps {
  sectionProgress: number; // 0-1, progress within current section
}

export default function ProgressBar({ sectionProgress }: ProgressBarProps) {
  const totalSections = 4;
  const { previousStep, currentSection } = useFunnelContext();

  return (
    <div className="w-full px-6 py-2">
      {/*add section var*/}
      <p className="uppercase w-full text-center text-sm my-2">GOALS</p>
      <div className="flex w-full items-center gap-4">
        <button
          onClick={() => {
            previousStep();
          }}
          className={`pressable h-7 w-7 flex items-center justify-center rounded-lg bg-grey-800`}
        >
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.06055 2L1.06055 6M5.06055 10L1.06055 6M1.06055 6H11.0605"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div className="flex items-center flex-1">
          {Array.from({ length: totalSections }).map((_, sectionIndex) => {
            const isCompleted = sectionIndex < currentSection;
            const isCurrent = sectionIndex === currentSection;
            const isUpcoming = sectionIndex > currentSection;

            return (
              <div
                key={sectionIndex}
                className={`flex items-center ${sectionIndex === totalSections - 1 ? "" : "flex-1"}`}
              >
                {/* Circle indicator */}
                {isCompleted ? (
                  // Completed section - green circle with checkmark
                  <div className="w-3 h-3 rounded-full bg-greenery-500 flex items-center justify-center"></div>
                ) : isCurrent ? (
                  // Current section - green circle (no checkmark yet)
                  <div className="w-3 h-3 rounded-full bg-greenery-500" />
                ) : (
                  // Upcoming section - grey circle
                  <div className="w-3 h-3 rounded-full bg-gray-600" />
                )}

                {/* Connecting line */}
                {sectionIndex < totalSections - 1 && (
                  <div className="flex-1 h-1 mx-1 relative overflow-hidden">
                    {isCompleted ? (
                      // Fully completed - green line
                      <div className="absolute inset-0 bg-greenery-500" />
                    ) : isCurrent ? (
                      // Partially completed - green portion based on progress
                      <>
                        <div
                          className="absolute inset-y-0 left-0 bg-greenery-500 transition-all duration-300"
                          style={{ width: `${sectionProgress * 100}%` }}
                        />
                        <div
                          className="absolute inset-y-0 right-0 bg-gray-600"
                          style={{ left: `${sectionProgress * 100}%` }}
                        />
                      </>
                    ) : (
                      // Upcoming - grey line
                      <div className="absolute inset-0 bg-gray-600" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
