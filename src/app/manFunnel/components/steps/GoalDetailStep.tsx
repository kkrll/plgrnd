"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import { GoalType } from "../../types";
import Button from "../Button";

export default function GoalDetailStep() {
  const { funnelData, nextStep } = useFunnelContext();
  const { goal } = funnelData;

  type GoalContentType = {
    heading: React.ReactNode;
    description: string | null;
    illustration: string;
    cta: string;
  };

  const goalContent: Record<GoalType, GoalContentType> = {
    "firmer-body": {
      heading: (
        <>
          The right balance of{" "}
          <span className="text-blue-300">
            training, recovery, and intensity
          </span>{" "}
          for a toned body
        </>
      ),
      description: null,
      illustration: "/man-funnel/stats/firmer-body.png",
      cta: "Build My Toning Plan",
    },
    muscle: {
      heading: (
        <>
          Up to <span className="text-blue-300">35% stronger</span> in the first
          3 months
        </>
      ),
      description:
        "Zing helped  559,173 people build  strength with structured, AI-guided workouts",
      illustration: "/man-funnel/stats/muscle.png",
      cta: "Build My Strength Plan",
    },
    weight: {
      heading: (
        <>
          With Zing's personalized plan, lose up to{" "}
          <span className="text-blue-300">3x more weight</span>{" "}
        </>
      ),
      description: `You're not alone, we've helped 836,627 people lose weight`,
      illustration: "/man-funnel/stats/weight.png",
      cta: "Build My Weight Loss Plan",
    },
    "mental-balance": {
      heading: (
        <>
          Zing users feel <span className="text-blue-300">less stressed</span>{" "}
          and more <span className="text-blue-300">mentally balanced</span> in
          just 2-3 weeks
        </>
      ),
      description: null,
      illustration: "/man-funnel/stats/mental-balance.png",
      cta: "Build My Stress Relief Plan",
    },
  };

  return (
    <section className="w-full p-6 flex-1 flex flex-col">
      <div className="flex flex-col flex-1">
        <h2 className="text-center mb-2">
          {goal && goalContent[goal]?.heading}
        </h2>
        <p className="text-center">{goal && goalContent[goal]?.description}</p>
        <img src={goal && goalContent[goal]?.illustration} alt="" />
      </div>

      <Button onClick={() => nextStep()}>
        {goal && goalContent[goal]?.cta}
      </Button>
    </section>
  );
}
