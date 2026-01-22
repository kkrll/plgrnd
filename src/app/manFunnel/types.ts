// Funnel step definitions and types
export type FunnelStep =
  | "age"
  | "gender"
  | "name"
  | "feedback-early"
  | "consent"
  | "goals"
  | "goal-detail";

export interface FunnelData {
  age?: string;
  gender?: "male" | "female";
  name?: string;
  goal?: string;
}

export interface FunnelStepConfig {
  id: FunnelStep;
  title: string;
  showProgressBar: boolean;
  section: number; // 0-3 (of 4 sections)
  totalSteps: number;
  order: number;
}

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
