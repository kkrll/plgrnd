"use client";

import { ReactNode } from "react";
import { FunnelStep } from "../types";
import ProgressBar from "./ProgressBar";

interface FunnelContainerProps {
  currentStep: FunnelStep;
  currentStepIndex: number;
  currentSection: number;
  sectionProgress: number;
  showProgressBar: boolean;
  direction: "forward" | "backward";
  children: ReactNode;
}

export default function FunnelContainer({
  currentStep,
  currentStepIndex,
  currentSection,
  sectionProgress,
  showProgressBar,
  direction,
  children,
}: FunnelContainerProps) {
  return (
    <div className="funnel-container w-full flex flex-col max-w-[420px] mx-auto min-h-screen bg-black text-white relative overflow-hidden">
      {/* Progress Bar */}
      {showProgressBar && (
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-sm">
          <ProgressBar
            sectionProgress={sectionProgress}
          />
        </div>
      )}

      {/* Content with sliding transition */}
      <div className="relative w-full flex-1 flex">
        <div
          key={currentStep}
          className={`w-full flex-1 flex ${direction === "forward"
            ? "animate-slide-in-forward"
            : "animate-slide-in-backward"
            }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
