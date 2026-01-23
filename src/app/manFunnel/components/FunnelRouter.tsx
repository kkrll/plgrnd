"use client";

import { useFunnelContext } from "../context/FunnelContext";
import FunnelContainer from "./FunnelContainer";
import AgeStep from "./steps/AgeStep";
import GenderStep from "./steps/GenderStep";
import NameStep from "./steps/NameStep";
import FeedbackEarly from "./steps/FeedbackEarly";
import GoalsStep from "./steps/GoalsStep";
import GoalDetailStep from "./steps/GoalDetailStep";
import Consent from "./steps/Consent";
import MotivationStep from "./steps/MotivationStep";
import BodyTypeStep from "./steps/BodyTypeStep";
import BodyTypeTargetStep from "./steps/BodyTypeTargetStep";
import BodyScanStep from "./steps/BodyScan";
import FocusMuscles from "./steps/FocusMuscles";
import FitnessHistory from "./steps/FitnessHistory";
import HardToLose from "./steps/HardToLose";
import TestimonyStep from "./steps/TestimonyStep";

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
      case "age":
        return <AgeStep />;
      case "gender":
        return <GenderStep />;
      case "name":
        return <NameStep />;
      case "feedback-early":
        return <FeedbackEarly />;
      case "consent":
        return <Consent />;
      case "goals":
        return <GoalsStep />;
      case "goal-detail":
        return <GoalDetailStep />;
      case "motivation":
        return <MotivationStep />;
      case "body-type":
        return <BodyTypeStep />;
      case "body-type-target":
        return <BodyTypeTargetStep />;
      case "body-scan":
        return <BodyScanStep />;
      case "focus-muscles":
        return <FocusMuscles />;
      case "fitness-history":
        return <FitnessHistory />;
      case "hard-to-lose":
        return <HardToLose />;
      case "testimony":
        return <TestimonyStep />;
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
