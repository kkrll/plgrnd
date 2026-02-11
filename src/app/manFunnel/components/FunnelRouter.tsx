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
import HeightStep from "./steps/HeightStep";
import WeightStep from "./steps/WeightStep";
import TargetWeightStep from "./steps/TargetWeightStep";
import MotivationStep from "./steps/MotivationStep";
import BodyTypeStep from "./steps/BodyTypeStep";
import BodyTypeTargetStep from "./steps/BodyTypeTargetStep";
import BodyScanStep from "./steps/BodyScan";
import FocusMuscles from "./steps/FocusMuscles";
import FitnessHistory from "./steps/FitnessHistory";
import FitnessLevelStep from "./steps/FitnessLevelStep";
import HardToLose from "./steps/HardToLose";
import MuscleGainEase from "./steps/MuscleGainEase";
import TestimonyStep from "./steps/TestimonyStep";
import AnalyzingStep from "./steps/AnalyzingStep";
import StartingPointStep from "./steps/StartingPointStep";
import Lifestyle from "./steps/Lifestyle";
import FreeTime from "./steps/FreeTime";
import Features from "./steps/Features";
import Water from "./steps/Water";
import Sleep from "./steps/Sleep";
import EatingHabits from "./steps/EatingHabits";
import FoodCravings from "./steps/FoodCravings";
import QuoteStep from "./steps/QuoteStep";
import BlockersStep from "./steps/Blockers";
import ExerciseFrequency from "./steps/ExerciseFrequency";
import ExerciseDuration from "./steps/ExerciseDuration";
import LocationStep from "./steps/Location";
import EqupmentStep from "./steps/Equipment";
import CardioEquipmentStep from "./steps/CardioEquipment";
import CardioStep from "./steps/Cardio";
import InjuriesStep from "./steps/Injuries";
import Fin from "./steps/Fin";
import Coach from "./steps/Coach";
import AppleWatch from "./steps/AppleWatch";
import GLP from "./steps/GLP";
import Program from "./steps/Program";
import Commitment from "./steps/Commitment";
import Email from "./steps/Email";
import Promos from "./steps/Promos";
import FinishingPlan from "./steps/FinishingPlan";

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
      case "height":
        return <HeightStep />;
      case "weight":
        return <WeightStep />;
      case "target-weight":
        return <TargetWeightStep />;
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
      case "fitness-level":
        return <FitnessLevelStep />;
      case "hard-to-lose":
        return <HardToLose />;
      case "muscle-gain-ease":
        return <MuscleGainEase />;
      case "testimony":
        return <TestimonyStep />;
      case "analyzing":
        return <AnalyzingStep />;
      case "starting-point":
        return <StartingPointStep />;
      case "lifestyle":
        return <Lifestyle />;
      case "freetime":
        return <FreeTime />;
      case "features":
        return <Features />;
      case "water":
        return <Water />;
      case "sleep":
        return <Sleep />;
      case "eating-habits":
        return <EatingHabits />;
      case "food-cravings":
        return <FoodCravings />;
      case "quote-1":
        return (
          <QuoteStep
            id="quote-1"
            quote="Eating is one of the ways I usually deal with stress"
          />
        );
      case "quote-2":
        return (
          <QuoteStep
            id="quote-2"
            quote="I struggle to resist certain foods or snacks"
          />
        );
      case "quote-3":
        return (
          <QuoteStep
            id="quote-3"
            quote="I’m not sure how to choose workouts that are suitable for me"
          />
        );
      case "quote-4":
        return (
          <QuoteStep
            id="quote-4"
            quote="I struggle to stay consistent and need some outside motivation"
          />
        );
      case "blockers":
        return <BlockersStep />;
      case "location":
        return <LocationStep />;
      case "exercise-frequency":
        return <ExerciseFrequency />;
      case "exercise-duration":
        return <ExerciseDuration />;
      case "equipment":
        return <EqupmentStep />;
      case "cardio":
        return <CardioStep />;
      case "cardio-equipment":
        return <CardioEquipmentStep />;
      case "injuries":
        return <InjuriesStep />;
      case "coach":
        return <Coach />;
      case "apple-watch":
        return <AppleWatch />;
      case "glp":
        return <GLP />;
      case "program":
        return <Program />;
      case "commitment":
        return <Commitment />;
      case "email":
        return <Email />;
      case "promos":
        return <Promos />;
      case "finishing-plan":
        return <FinishingPlan />;
      case "fin":
        return <Fin />;
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
