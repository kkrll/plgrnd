'use client';

import { useState, useCallback } from 'react';
import { FunnelStep, FunnelData, FUNNEL_STEPS } from '../types';

export function useFunnel() {
  const [currentStep, setCurrentStep] = useState<FunnelStep>('age');
  const [funnelData, setFunnelData] = useState<FunnelData>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const currentStepIndex = FUNNEL_STEPS.findIndex(step => step.id === currentStep);
  const currentStepConfig = FUNNEL_STEPS[currentStepIndex];

  const goToStep = useCallback((step: FunnelStep, dir: 'forward' | 'backward' = 'forward') => {
    setDirection(dir);
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < FUNNEL_STEPS.length - 1) {
      goToStep(FUNNEL_STEPS[currentStepIndex + 1].id, 'forward');
    }
  }, [currentStepIndex, goToStep]);

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      goToStep(FUNNEL_STEPS[currentStepIndex - 1].id, 'backward');
    }
  }, [currentStepIndex, goToStep]);

  const updateData = useCallback((data: Partial<FunnelData>) => {
    setFunnelData(prev => ({ ...prev, ...data }));
  }, []);

  return {
    currentStep,
    currentStepIndex,
    currentStepConfig,
    funnelData,
    direction,
    goToStep,
    nextStep,
    previousStep,
    updateData,
    totalSteps: FUNNEL_STEPS.length,
  };
}
