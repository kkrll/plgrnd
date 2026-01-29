// Funnel step definitions and types
export type FunnelStep =
  | "age"
  | "gender"
  | "name"
  | "feedback-early"
  | "consent"
  | "height"
  | "weight"
  | "target-weight"
  | "goals"
  | "goal-detail"
  | "motivation"
  | "body-type"
  | "body-type-target"
  | "body-scan"
  | "focus-muscles"
  | "fitness-history"
  | "hard-to-lose"
  | "muscle-gain-ease"
  | "testimony"
  | "fitness-level"
  | "analyzing"
  | "starting-point"
  | "lifestyle"
  | "freetime"
  | "features"
  | "water"
  | "sleep"
  | "eating-habits"
  | "food-cravings"
  | "quote-1"
  | "quote-2"
  | "quote-3"
  | "quote-4"
  | "blockers"
  | "location"
  | "exercise-frequency"
  | "exercise-duration"
  | "equipment"
  | "cardio"
  | "cardio-equipment"
  | "injuries"
  | "fin";

export interface FunnelData {
  age?: string;
  gender?: "male" | "female";
  name?: string;
  goal?: GoalType;
  motivations?: string[];
  bodyType?: string;
  bodyTypeTarget?: string;
  focusMuscles?: Array<{ id: string; label: string }>;
  fitnessLevel?: string;
  hardToLoseAreas?: string[];
  muscleGainEase?: string;
  heightCm?: number;
  weightKg?: number;
  targetWeightKg?: number;
  fitnessHistory?: string;
  lifestyle?: { id: string; label: string };
  freetime?: { id: string; label: string };
  water?: { id: string; label: string };
  sleep?: { id: string; label: string };
  eatingHabits?: { id: string; label: string }[];
  foodCravings?: { id: string; label: string }[];
  quotes?: Record<string, boolean>;
  exerciseFrequency?: { id: string; label: string };
  exerciseDuration?: { id: string; label: string };
  location?: { id: string; label: string };
  equipment?: { id: string; label: string }[];
  cardio?: boolean;
  cardioEquipment?: { id: string; label: string }[];
  injuries?: { id: string; label: string }[];
}

export interface FunnelStepConfig {
  id: FunnelStep;
  title: string;
  showProgressBar: boolean;
  section: number; // 0-3 (of 4 sections)
  totalSteps: number;
  order: number;
  conditional?: (data: FunnelData) => boolean;
}

export type GoalType = "firmer-body" | "muscle" | "weight" | "mental-balance";

const GOALS_SECTION_RAW: Omit<FunnelStepConfig, "totalSteps">[] = [
  {
    id: "age",
    title: "Get a Personalized Workout Plan",
    showProgressBar: false,
    section: 0,
    order: 0,
  },
  {
    id: "gender",
    title: "Who are we building the custom plan for?",
    showProgressBar: false,
    section: 0,
    order: 1,
  },
  {
    id: "name",
    title: "What should we call you?",
    showProgressBar: false,
    section: 0,
    order: 2,
  },
  {
    id: "feedback-early",
    title: `Now it's your turn.`,
    showProgressBar: false,
    section: 0,
    order: 3,
  },
  {
    id: "consent",
    title: `Ready for your personalized Zing plan?`,
    showProgressBar: false,
    section: 0,
    order: 4,
  },
  {
    id: "goals",
    title: "What is your primary goal today?",
    showProgressBar: true,
    section: 0,
    order: 5,
  },
  {
    id: "goal-detail",
    title: "The right balance",
    showProgressBar: true,
    section: 0,
    order: 6,
  },
  {
    id: "motivation",
    title: "What's your main motivation to work out?",
    showProgressBar: true,
    section: 0,
    order: 7,
  },
  {
    id: "body-type",
    title: "What best matches your current body type?",
    showProgressBar: true,
    section: 0,
    order: 8,
  },
  {
    id: "body-type-target",
    title: "What's your dream body?",
    showProgressBar: true,
    section: 0,
    order: 9,
  },
  {
    id: "body-scan",
    title: "You can get more precise evaluation with Body Scan",
    showProgressBar: false,
    section: 0,
    order: 10,
  },
  {
    id: "focus-muscles",
    title: "What's your current muscle-building goal?",
    showProgressBar: true,
    section: 0,
    order: 11,
  },
  {
    id: "fitness-level",
    title: "How would you describe your training and nutrition?",
    showProgressBar: true,
    section: 0,
    order: 12,
  },
  {
    id: "hard-to-lose",
    title: "Where is fat hardest to lose?",
    showProgressBar: true,
    section: 0,
    order: 13,
  },
  {
    id: "muscle-gain-ease",
    title: "How easily do you gain muscle?",
    showProgressBar: true,
    section: 0,
    order: 14,
    conditional: (data) =>
      data.goal === "firmer-body" || data.goal === "muscle",
  },
  {
    id: "testimony",
    title: "Success Story",
    showProgressBar: true,
    section: 0,
    order: 15,
  },
  {
    id: "height",
    title: "How tall are you?",
    showProgressBar: true,
    section: 0,
    order: 16,
  },
  {
    id: "weight",
    title: "What's your current weight?",
    showProgressBar: true,
    section: 0,
    order: 17,
  },
  {
    id: "target-weight",
    title: "What's your target weight?",
    showProgressBar: true,
    section: 0,
    order: 18,
  },
  {
    id: "fitness-history",
    title: "How long ago were you in the best shape of your life?",
    showProgressBar: true,
    section: 0,
    order: 19,
  },
  {
    id: "analyzing",
    title: "Analyzing your answers...",
    showProgressBar: false,
    section: 0,
    order: 20,
  },
  {
    id: "starting-point",
    title: "Your Starting Point",
    showProgressBar: true,
    section: 0,
    order: 21,
  },
];

export const GOALS_SECTION: FunnelStepConfig[] = GOALS_SECTION_RAW.map(
  (step) => ({
    ...step,
    totalSteps: GOALS_SECTION_RAW.length,
  }),
);

const LIFESTYLE_AND_HABITS_RAW: Omit<FunnelStepConfig, "totalSteps">[] = [
  {
    id: "lifestyle",
    title: "What’s your lifestyle like?",
    showProgressBar: true,
    section: 1,
    order: 0,
  },
  {
    id: "freetime",
    title: "What’s your lifestyle like?",
    showProgressBar: true,
    section: 1,
    order: 1,
  },
  {
    id: "features",
    title: "Just 5 minutes a day",
    showProgressBar: true,
    section: 1,
    order: 2,
  },
  {
    id: "water",
    title: "How much water do you drink daily?",
    showProgressBar: true,
    section: 1,
    order: 3,
  },
  {
    id: "sleep",
    title: "How much sleep do you usually get?",
    showProgressBar: true,
    section: 1,
    order: 4,
  },
  {
    id: "eating-habits",
    title: "Do you have any of the following habits?",
    showProgressBar: true,
    section: 1,
    order: 5,
  },
  {
    id: "food-cravings",
    title: "What foods do you crave most often?",
    showProgressBar: true,
    section: 1,
    order: 6,
  },
  {
    id: "quote-1",
    title: "Eating is one of the ways I usually deal with stress",
    showProgressBar: true,
    section: 1,
    order: 7,
  },
  {
    id: "quote-2",
    title: "I struggle to resist certain foods or snacks",
    showProgressBar: true,
    section: 1,
    order: 8,
  },
  {
    id: "quote-3",
    title: "I’m not sure how to choose workouts that are suitable for me",
    showProgressBar: true,
    section: 1,
    order: 9,
  },
  {
    id: "quote-4",
    title: "I struggle to stay consistent and need some outside motivation",
    showProgressBar: true,
    section: 1,
    order: 10,
  },
  {
    id: "blockers",
    title: "Blockers",
    showProgressBar: false,
    section: 1,
    order: 11,
  },
];

export const LIFESTYLE_AND_HABITS_SECTION: FunnelStepConfig[] =
  LIFESTYLE_AND_HABITS_RAW.map((step) => ({
    ...step,
    totalSteps: LIFESTYLE_AND_HABITS_RAW.length,
  }));

const PLAN_PERSONALIZATION_RAW: Omit<FunnelStepConfig, "totalSteps">[] = [
  {
    id: "location",
    title: "Where do you want to train?",
    showProgressBar: true,
    section: 2,
    order: 0,
  },
  {
    id: "exercise-frequency",
    title: "How often do you work out?",
    showProgressBar: true,
    section: 2,
    order: 1,
  },
  {
    id: "exercise-duration",
    title: "How long do you want your workouts to be?",
    showProgressBar: true,
    section: 2,
    order: 2,
  },
  {
    id: "equipment",
    title: "What equipment do you have?",
    showProgressBar: true,
    section: 2,
    order: 3,
  },
  {
    id: "cardio",
    title: "Should Zing add cardio exercises to your plan?",
    showProgressBar: true,
    section: 2,
    order: 4,
  },
  {
    id: "cardio-equipment",
    title: "What equipment do you have?",
    showProgressBar: true,
    section: 2,
    order: 5,
    conditional: (data) => data.cardio === true,
  },
  {
    id: "injuries",
    title: "Do you have any of the following injuries?",
    showProgressBar: true,
    section: 2,
    order: 6,
  },
  {
    id: "fin",
    title: "Thank you!",
    showProgressBar: false,
    section: 2,
    order: 7,
  },
];

export const PLAN_PERSONALIZATION_SECTION: FunnelStepConfig[] =
  PLAN_PERSONALIZATION_RAW.map((step) => ({
    ...step,
    totalSteps: PLAN_PERSONALIZATION_RAW.length,
  }));

export const FUNNEL_STEPS: FunnelStepConfig[] = [
  ...GOALS_SECTION,
  ...LIFESTYLE_AND_HABITS_SECTION,
  ...PLAN_PERSONALIZATION_SECTION,
];
