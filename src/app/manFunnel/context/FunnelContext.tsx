'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFunnel } from '../hooks/useFunnel';
import { FunnelStep, FunnelData } from '../types';

interface FunnelContextType {
  currentStep: FunnelStep;
  currentStepIndex: number;
  currentStepConfig: ReturnType<typeof useFunnel>['currentStepConfig'];
  currentSection: number;
  sectionProgress: number;
  funnelData: FunnelData;
  direction: 'forward' | 'backward';
  goToStep: (step: FunnelStep, dir?: 'forward' | 'backward') => void;
  nextStep: () => void;
  previousStep: () => void;
  updateData: (data: Partial<FunnelData>) => void;
  totalSteps: number;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export function FunnelProvider({ children }: { children: ReactNode }) {
  const funnel = useFunnel();

  return (
    <FunnelContext.Provider value={funnel}>
      {children}
    </FunnelContext.Provider>
  );
}

export function useFunnelContext() {
  const context = useContext(FunnelContext);
  if (context === undefined) {
    throw new Error('useFunnelContext must be used within a FunnelProvider');
  }
  return context;
}
