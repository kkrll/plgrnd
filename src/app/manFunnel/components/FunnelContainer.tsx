'use client';

import { ReactNode } from 'react';
import { FunnelStep } from '../types';
import ProgressBar from './ProgressBar';

interface FunnelContainerProps {
  currentStep: FunnelStep;
  currentStepIndex: number;
  totalSteps: number;
  showProgressBar: boolean;
  direction: 'forward' | 'backward';
  children: ReactNode;
}

export default function FunnelContainer({
  currentStep,
  currentStepIndex,
  totalSteps,
  showProgressBar,
  direction,
  children,
}: FunnelContainerProps) {
  return (
    <div className="funnel-container w-full max-w-[420px] mx-auto min-h-screen bg-black text-white relative overflow-hidden">
      {/* Progress Bar */}
      {showProgressBar && (
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-sm">
          <ProgressBar currentStep={currentStepIndex} totalSteps={totalSteps} />
        </div>
      )}

      {/* Content with sliding transition */}
      <div className="relative w-full min-h-screen">
        <div
          key={currentStep}
          className={`w-full ${
            direction === 'forward'
              ? 'animate-slide-in-forward'
              : 'animate-slide-in-backward'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
