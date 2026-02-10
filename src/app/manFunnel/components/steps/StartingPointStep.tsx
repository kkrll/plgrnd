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

const EFFORT_LEVELS = ["Low", "Normal", "Medium", "High", "Very High"];

type TargetBodyRecord = {
  title: string;
  BMI: number;
};

// Target body type mapping
const targetBodyType: Record<string, TargetBodyRecord> = {
  lean: {
    title: "Lean",
    BMI: 20,
  },
  muscular: {
    title: "Muscular",
    BMI: 24,
  },
  ripped: {
    title: "Ripped",
    BMI: 25,
  },
  athletic: {
    title: "Athletic",
    BMI: 23,
  },
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
const getBodyTypeImage = (bodyType?: string) => {
  const imageMap: Record<string, string> = {
    slender: "/man-funnel/starting-point/slender.webp",
    athletic: "/man-funnel/starting-point/athletic.webp",
    soft: "/man-funnel/starting-point/soft-mid-section.webp",
    "heavy-build": "/man-funnel/starting-point/heavy-build.webp",
  };
  return bodyType ? imageMap[bodyType] : imageMap.athletic;
};

const getBodyTargetImage = (bodyTarget?: string) => {
  const imageMap: Record<string, string> = {
    lean: "/man-funnel/starting-point/lean-goal.webp",
    muscular: "/man-funnel/starting-point/muscular-goal.webp",
    athletic: "/man-funnel/starting-point/athletic-goal.webp",
    ripped: "/man-funnel/starting-point/ripped-goal.webp",
  };
  return bodyTarget ? imageMap[bodyTarget] : imageMap.athletic;
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

  const { name, heightCm, weightKg, bodyType, bodyTypeTarget, goal } =
    funnelData;

  // Calculate BMI
  const bmi = heightCm && weightKg ? calcBmi(heightCm, weightKg) : 21.5;
  const bodyTypeLabel = bodyType ? bodyTypeLabels[bodyType] : "Athletic";
  const bodyTypeImage = getBodyTypeImage(bodyType);
  const bodyTargetImage = getBodyTargetImage(bodyTypeTarget);
  const personalizedMessage =
    bodyType && goal ? getPersonalizedMessage(bodyType, goal) : "";

  return (
    <section className="w-full p-6 flex flex-col bg-black text-white overflow-y-auto">
      {/* Title */}
      <h3 className="text-3xl font-bold mb-6">
        Your Personalized Starting Point{`, ` + name || ""}!
      </h3>

      {/* Main Stats Card */}
      <div className="bg-grey-800 rounded-3xl mb-2 relative overflow-hidden">
        <div className="pt-6 pb-4 px-5">
          <div className="flex justify-between px-1 items-center mb-4">
            <h3>Required Effort</h3>
            <div className="px-2 py-1 bg-blue-500 uppercase text-xs rounded-xl">
              {EFFORT_LEVELS[1]}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-tangerine-500 h-8 rounded-full flex px-4 mb-1">
            {EFFORT_LEVELS.map((level, index) => {
              return (
                <div
                  key={level}
                  className="h-full w-full flex items-center justify-center"
                >
                  {index === 1 ? (
                    <div className="h-9 w-2 bg-white rounded-full" />
                  ) : (
                    <div className="h-1 w-1 bg-white/40 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="uppercase flex justify-between text-grey-600 px-7">
            <p className="text-sm">Low</p>
            <p className="text-sm">High</p>
          </div>
        </div>

        {/* Body comparison with background */}
        <div className="relative pb-4">
          <img
            src="/man-funnel/starting-point/bg.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative flex justify-between">
            <img
              src={bodyTypeImage}
              alt={bodyTypeLabel}
              className="w-1/3 object-cover object-top -scale-x-100"
            />
            <img
              src={bodyTargetImage}
              alt={bodyTypeTarget && targetBodyType[bodyTypeTarget].title}
              className="w-1/3 object-cover object-top"
            />
          </div>

          <div className="absolute left-0 right-0 bottom-0 flex items-center bg-black/40 backdrop-blur-md">
            <div className="flex-1 text-center py-2">
              <p className="font-bold text-sm">{bodyTypeLabel}</p>
              <p className="text-grey-400 text-xs">{bmi.toFixed(1)} BMI</p>
            </div>
            {/* Chevron arrow */}
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="shrink-0 text-grey-500"
            >
              <path
                d="M4 4L12 12L4 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex-1 text-center py-2">
              <p className="font-bold text-sm">
                {bodyTypeTarget && targetBodyType[bodyTypeTarget].title}
              </p>
              <p className="text-grey-400 text-xs">
                {bodyTypeTarget &&
                  targetBodyType[bodyTypeTarget].BMI.toFixed(1) + ` BMI`}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 pt-4 pb-6">
          <p className="text-xs text-blue-200 mb-2">What it means for you</p>
          <p className="text-white font-semibold leading-relaxed">
            {personalizedMessage}
          </p>
        </div>
      </div>

      {/* BMI Section */}
      {/*<div className="bg-grey-800 rounded-3xl p-6 mb-2">
        <BmiGauge value={bmi} min={15} max={40} />

        <p className="text-sm text-grey-400 mt-6">{bmiExplanation}</p>
      </div>*/}

      {/* Continue Button */}
      <div className="mt-auto">
        <Button type="submit" onClick={() => nextStep()}>
          Craft My Plan
        </Button>
      </div>
    </section>
  );
}
