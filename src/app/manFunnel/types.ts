// Funnel step definitions and types
export type FunnelStep = 
  | 'age'
  | 'gender'
  | 'name'
  | 'goals'
  | 'goal-detail';

export interface FunnelData {
  age?: string;
  gender?: 'male' | 'female';
  name?: string;
  goal?: string;
}

export interface FunnelStepConfig {
  id: FunnelStep;
  title: string;
  showProgressBar: boolean;
  totalSteps: number;
}

export const FUNNEL_STEPS: FunnelStepConfig[] = [
  { id: 'age', title: 'Get a Personalized Workout Plan', showProgressBar: false, totalSteps: 5 },
  { id: 'gender', title: 'Who are we building the custom plan for?', showProgressBar: false, totalSteps: 5 },
  { id: 'name', title: 'What should we call you?', showProgressBar: false, totalSteps: 5 },
  { id: 'goals', title: 'What is your primary goal today?', showProgressBar: true, totalSteps: 5 },
  { id: 'goal-detail', title: 'The right balance', showProgressBar: true, totalSteps: 5 },
];
