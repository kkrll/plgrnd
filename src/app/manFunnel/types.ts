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
  | "starting-point";

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

export const FUNNEL_STEPS: FunnelStepConfig[] = [
  ...GOALS_SECTION,
  // Future sections will be added here:
  // ...SECTION_2,
  // ...SECTION_3,
  // ...SECTION_4,
];
