"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import { Divider } from "../Divider";

const blockersWeightLoss = [
    { label: "Inconsistent routine", pct: 47, color: "bg-gradient-to-r from-greenery-600 to-greenery-400 text-black" }, // The lime green
    { label: "Low energy & recovery", pct: 33, color: "bg-gradient-to-r from-blue-700 to-blue-500 text-white" }, // The royal blue
    { label: "Nutrition habits", pct: 20, color: "bg-gradient-to-r from-blue-700 to-blue-500 text-white w-[20%]" } // The smaller blue
];
const blockersMuscle = [
    { label: "Lack of structure", pct: 47, color: "bg-gradient-to-r from-greenery-600 to-greenery-400 text-black" }, // The lime green
    { label: "Recovery & sleep", pct: 33, color: "bg-gradient-to-r from-blue-700 to-blue-500 text-white" }, // The royal blue
    { label: "Nutrition habits", pct: 20, color: "bg-gradient-to-r from-blue-700 to-blue-500 text-white w-[20%]" } // The smaller blue
];

export default function BlockersStep() {
    const { funnelData, nextStep } = useFunnelContext();

    const isMuscleGoal = funnelData.goal === "firmer-body" || funnelData.goal === "muscle";

    const blockers = isMuscleGoal ? blockersMuscle : blockersWeightLoss;

    return (
        <section className="w-full px-6 pt-6 pb-24 flex flex-col bg-black text-white overflow-y-auto">

            <div>
                <h2 className="w-full text-center my-2">
                    {isMuscleGoal
                        ? "Your Muscle-Building Blockers"
                        : "Your Weight-Loss Blockers"}
                </h2>
                <p className="text-grey-400 text-center">
                    {isMuscleGoal
                        ? "Based on your answers, these are the main factors limiting strength and size gains."
                        : "Your answers helped us identify the main factors slowing your progress."}
                </p>
            </div>

            <Divider className="my-10" />

            <div className="flex flex-col gap-4">
                <h3 className="uppercase w-full text-center">
                    What’s holding you back
                </h3>
                <div className="flex flex-col rounded-3xl bg-grey-800 overflow-hidden">
                    <div className="flex flex-col gap-2 p-6">
                        {blockers.map((item, i) => (
                            <div key={i} className="relative h-10 flex items-center justify-end p-3 w-full bg-grey-900 rounded-xl overflow-hidden border border-gray-700/50">
                                {/* The Filled Bar */}
                                <div
                                    className={`absolute left-0 top-0 h-full rounded-xl flex items-center justify-between px-3 font-semibold text-sm ${item.color}`}
                                    style={{ width: `calc(${item.pct / blockers[0].pct * 100}% - 56px)` }}
                                >

                                    <span className="whitespace-nowrap ">{item.label}</span>
                                </div>
                                <span>{item.pct}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 p-6 bg-gradient-to-r from-blue-600 to-blue-400">
                        <h3 className="text-xl font-bold text-white mb-1">
                            Inconsistent routine
                        </h3>
                        <p className="text-sm">
                            {isMuscleGoal
                                ? "Building muscle requires a clear progression plan. Random workouts make it hard to improve strength week to week — even if you train often."
                                : "Progress doesn’t come from being perfect — it comes from repeating a routine you can stick to."}
                        </p>
                        <p className="text-sm">
                            {!isMuscleGoal && "When workouts or healthy habits drop off after 1–2 weeks, results slow down even if motivation is high."}
                        </p>
                    </div>
                </div>
            </div>



            {/* Continue Button */}
            <div className="mt-auto">
                <Button type="submit" onClick={() => nextStep()}>
                    Personalize My Plan
                </Button>
            </div>
        </section>
    );
}
