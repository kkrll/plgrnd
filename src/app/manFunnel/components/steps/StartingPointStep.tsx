"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import { calcBmi } from "../../utils/health";
import BmiGauge from "../BMIMeter";

// Body type mapping
const bodyTypeLabels: Record<string, string> = {
  slender: "Slender",
  athletic: "Athletic",
  soft: "Soft mid-section",
  "heavy-build": "Heavy build",
};

// Target body type mapping
const targetBodyTypeLabels: Record<string, string> = {
  lean: "Be lean",
  muscular: "Be muscular",
  ripped: "Be ripped",
  athletic: "Be athletic",
};

// Fitness level mapping
const fitnessLevelLabels: Record<string, string> = {
  "starting-scratch": "Starting from scratch",
  "good-inconsistent": "On and off",
  "stuck-despite-effort": "Consistent but stuck",
};

// Hard to lose areas mapping
const hardToLoseLabels: Record<string, string> = {
  belly: "Belly",
  "love-handles": "Love Handles",
  chest: "Chest",
  "lower-back": "Lower Back",
  arms: "Arms",
  legs: "Legs",
  hips: "Hips",
};

// Goal type labels
const goalLabels: Record<string, string> = {
  "firmer-body": "Get Fitter",
  muscle: "Build Muscle",
  weight: "Lose Weight",
  "mental-balance": "Mental Balance",
};

// Get the image path for body type
const getBodyTypeImage = (bodyType: string) => {
  const imageMap: Record<string, string> = {
    slender: "/man-funnel/starting-point/slender.webp",
    athletic: "/man-funnel/starting-point/athletic.webp",
    soft: "/man-funnel/starting-point/soft-mid-section.webp",
    "heavy-build": "/man-funnel/starting-point/heavy-build.webp",
  };
  return imageMap[bodyType] || imageMap.athletic;
};

// Get personalized message based on body type and goal
const getPersonalizedMessage = (bodyType: string, goal: string): string => {
  const messages: Record<string, Record<string, string>> = {
    slender: {
      "firmer-body":
        "You have a lean base. Your plan will focus on building tone and balanced strength.",
      muscle:
        "You have a lean frame. Your plan will prioritize gradual muscle growth and strength.",
      weight:
        "You have a naturally lean structure. Your plan will focus on fat loss while maintaining muscle.",
      "mental-balance":
        "You have a lean base. Your plan will focus on building tone and balanced strength.",
    },
    athletic: {
      "firmer-body":
        "You have a solid foundation. Your plan will refine muscle tone and balance.",
      muscle:
        "You already have a strong base. Your plan will focus on structured strength development.",
      weight:
        "You have a balanced build. Your plan will focus on steady fat loss while preserving strength.",
      "mental-balance":
        "You have a solid foundation. Your plan will refine muscle tone and balance.",
    },
    soft: {
      "firmer-body":
        "Fat tends to collect around the midsection. Your plan will combine fat loss and toning.",
      muscle:
        "You have room to build strength. Your plan will improve muscle and body composition.",
      weight:
        "Fat tends to accumulate centrally. Your plan will focus on steady, sustainable fat loss.",
      "mental-balance":
        "Fat tends to collect around the midsection. Your plan will combine fat loss and toning.",
    },
    "heavy-build": {
      "firmer-body":
        "You carry higher body fat. Your plan will focus on safe fat loss and gradual toning.",
      muscle:
        "You have strong potential. Your plan will build strength while improving body composition.",
      weight:
        "You carry excess body fat. Your plan will focus on sustainable fat loss and joint-safe training.",
      "mental-balance":
        "You carry higher body fat. Your plan will focus on safe fat loss and gradual toning.",
    },
  };

  return messages[bodyType]?.[goal] || messages.slender["firmer-body"];
};

// Get BMI position percentage (for the chart indicator)
const getBmiPosition = (bmi: number): number => {
  // BMI scale from 15 to 35
  const minBmi = 15;
  const maxBmi = 35;
  const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi));
  return ((clampedBmi - minBmi) / (maxBmi - minBmi)) * 100;
};

// Get BMI explanation text
const getBmiExplanation = (bmi: number): string => {
  if (bmi < 18.5) {
    return "You're underweight. A healthy BMI helps build strength more effectively.";
  } else if (bmi < 25) {
    return "Based on research, 8-12% is an ideal body fat percentage for men to start gaining muscle and bulk up faster.";
  } else if (bmi < 30) {
    return "You're in the overweight range. Reducing body fat will help you see muscle definition faster.";
  } else {
    return "You're in the obese range. Focus on sustainable fat loss to improve overall health and fitness.";
  }
};

export default function StartingPointStep() {
  const { funnelData, nextStep } = useFunnelContext();

  const {
    name,
    heightCm,
    weightKg,
    bodyType,
    bodyTypeTarget,
    goal,
    fitnessLevel,
    hardToLoseAreas,
    focusMuscles,
  } = funnelData;

  // Calculate BMI
  const bmi = heightCm && weightKg ? calcBmi(heightCm, weightKg) : 21.5;
  const bmiExplanation = getBmiExplanation(bmi);

  const bodyTypeLabel = bodyType ? bodyTypeLabels[bodyType] : "Athletic";
  const bodyTypeImage = bodyType ? getBodyTypeImage(bodyType) : getBodyTypeImage("athletic");
  const targetBodyLabel = bodyTypeTarget ? targetBodyTypeLabels[bodyTypeTarget] : "Be fitter";
  const fitnessLevelLabel = fitnessLevel ? fitnessLevelLabels[fitnessLevel] : "On and off";
  const goalLabel = goal ? goalLabels[goal] : "Lose Weight";
  const personalizedMessage =
    bodyType && goal ? getPersonalizedMessage(bodyType, goal) : "";

  return (
    <section className="w-full min-h-screen p-6 flex flex-col bg-black text-white overflow-y-auto">

      {/* Title */}
      <div className="mb-6">
        <h3 className="text-3xl font-bold mb-2">
          Your Personalized Starting Point{`, ` + name || ""}!
        </h3>
        <p className="text-grey-400">
          Here's a quick overview of where you are right now — and how Zing will craft
          your{" "}
          <span className="text-blue-400 font-semibold">{goalLabel}</span> plan based on
          your profile.
        </p>
      </div>

      {/* Main Stats Card */}
      <div className="bg-grey-800 rounded-3xl mb-2 relative overflow-hidden">
        <div className="flex justify-between border-b border-grey-700">
          {/* Left side - text info */}
          <div className="flex-1 p-6">
            <p className="text-grey-400 text-xs mb-1">Body Type</p>
            <p className="font-bold mb-4">{bodyTypeLabel}</p>

            <p className="text-grey-400 text-xs mb-1">Your Training level</p>
            <p className="font-semibold mb-4">{fitnessLevelLabel}</p>

            <p className="text-grey-400 text-xs mb-1">Dream Body</p>
            <p className="font-semibold">{targetBodyLabel}</p>
          </div>

          {/* Right side - body image */}
          <div className="w-32 flex items-end justify-end">
            <img
              src={bodyTypeImage}
              alt={bodyTypeLabel}
              className="h-full w-auto object-cover"
            />
          </div>
        </div>

        {/* Focus Areas */}
        {focusMuscles && focusMuscles.length > 0 && (
          <div className="px-6 pb-6 pt-4 border-t border-grey-800">
            <p className="text-grey-400 text-xs mb-2">Focus Muscles</p>
            <div className="flex flex-wrap gap-1">
              {focusMuscles.map((muscle) => (
                <span
                  key={muscle.id}
                  className="px-2 py-1 bg-grey-700 rounded-full text-sm"
                >
                  {muscle.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BMI Section */}
      <div className="bg-grey-800 rounded-3xl p-6 mb-2">


        <BmiGauge
          value={bmi}
          min={15}
          max={40}
        />

        <p className="text-sm text-grey-400 mt-6">{bmiExplanation}</p>
      </div>

      {/* What it means for you */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl p-6 mb-6">
        <p className="text-xs text-blue-200 mb-2">What it means for you</p>
        <p className="text-white font-semibold leading-relaxed">
          {personalizedMessage}
        </p>
      </div>

      {/* Continue Button */}
      <div className="mt-auto">
        <Button type="submit" onClick={() => nextStep()}>
          Craft My Plan
        </Button>
      </div>
    </section>
  );
}
