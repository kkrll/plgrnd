'use client';

import { useFunnelContext } from '../context/FunnelContext';
import FunnelContainer from './FunnelContainer';
import AgeStep from './steps/AgeStep';
import GenderStep from './steps/GenderStep';
import NameStep from './steps/NameStep';
import FeedbackEarly from './steps/FeedbackEarly';
import GoalsStep from './steps/GoalsStep';
import GoalDetailStep from './steps/GoalDetailStep';

export default function FunnelRouter() {
  const {
    currentStep,
    currentStepIndex,
    currentStepConfig,
    currentSection,
    sectionProgress,
    direction,
  } = useFunnelContext();

  const renderStep = () => {
    switch (currentStep) {
      case 'age':
        return <AgeStep />;
      case 'gender':
        return <GenderStep />;
      case 'name':
        return <NameStep />;
      case 'feedback-early':
        return <FeedbackEarly />;
      case 'goals':
        return <GoalsStep />;
      case 'goal-detail':
        return <GoalDetailStep />;
      default:
        return <AgeStep />;
    }
  };

  return (
    <FunnelContainer
      currentStep={currentStep}
      currentStepIndex={currentStepIndex}
      currentSection={currentSection}
      sectionProgress={sectionProgress}
      showProgressBar={currentStepConfig?.showProgressBar ?? false}
      direction={direction}
    >
      {renderStep()}
    </FunnelContainer>
  );
}
