'use client';

import { useState, useCallback, useMemo } from 'react';
import { FunnelStep, FunnelData, FUNNEL_STEPS } from '../types';

export function useFunnel() {
  const [currentStep, setCurrentStep] = useState<FunnelStep>('age');
  const [funnelData, setFunnelData] = useState<FunnelData>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Filter steps based on conditional logic
  const activeSteps = useMemo(() => {
    return FUNNEL_STEPS.filter(step => {
      if (!step.conditional) return true;
      return step.conditional(funnelData);
    });
  }, [funnelData]);

  const currentStepIndex = activeSteps.findIndex(step => step.id === currentStep);
  const currentStepConfig = activeSteps[currentStepIndex];
  
  // Calculate section-based progress
  const currentSection = currentStepConfig?.section ?? 0;
  const stepsInCurrentSection = activeSteps.filter(step => step.section === currentSection);
  const currentStepIndexInSection = stepsInCurrentSection.findIndex(step => step.id === currentStep);
  const sectionProgress = currentStepIndexInSection / Math.max(stepsInCurrentSection.length - 1, 1);

  const goToStep = useCallback((step: FunnelStep, dir: 'forward' | 'backward' = 'forward') => {
    setDirection(dir);
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < activeSteps.length - 1) {
      goToStep(activeSteps[currentStepIndex + 1].id, 'forward');
    }
  }, [currentStepIndex, activeSteps, goToStep]);

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      goToStep(activeSteps[currentStepIndex - 1].id, 'backward');
    }
  }, [currentStepIndex, activeSteps, goToStep]);

  const updateData = useCallback((data: Partial<FunnelData>) => {
    setFunnelData(prev => ({ ...prev, ...data }));
  }, []);

  return {
    currentStep,
    currentStepIndex,
    currentStepConfig,
    currentSection,
    sectionProgress,
    funnelData,
    direction,
    goToStep,
    nextStep,
    previousStep,
    updateData,
    totalSteps: activeSteps.length,
  };
}
