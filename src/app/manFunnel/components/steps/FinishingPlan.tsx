"use client";

import { useEffect, useState, useCallback } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Logo from "../Logo";

type Phase =
  | "loader1"
  | "loader2"
  | "water-question"
  | "loader2-resume"
  | "sleep-question"
  | "loader2-finish"
  | "loader3";

const WATER_OPTIONS = [
  { id: "up-to-2", label: "Up to 2" },
  { id: "2-to-6", label: "2 to 6" },
  { id: "6-plus", label: "6+" },
];

const SLEEP_OPTIONS = [
  { id: "up-to-5", label: "Up to 5" },
  { id: "6-to-8", label: "6 - 8" },
  { id: "8-plus", label: "8+" },
];

export default function FinishingPlan() {
  const { nextStep, updateData } = useFunnelContext();
  const [phase, setPhase] = useState<Phase>("loader1");
  const [bar1, setBar1] = useState(0);
  const [bar2, setBar2] = useState(0);
  const [bar3, setBar3] = useState(0);

  // Loader 1: runs 0→100
  useEffect(() => {
    if (phase !== "loader1") return;
    const duration = 3000;
    const interval = 50;
    const inc = 100 / (duration / interval);
    let val = 0;
    const id = setInterval(() => {
      val += inc;
      if (val >= 100) {
        val = 100;
        clearInterval(id);
        setPhase("loader2");
      }
      setBar1(val);
    }, interval);
    return () => clearInterval(id);
  }, [phase]);

  // Loader 2: runs 0→25, pauses for water, resumes 25→90, pauses for sleep, resumes 90→100
  useEffect(() => {
    if (phase !== "loader2" && phase !== "loader2-resume" && phase !== "loader2-finish") return;

    const target = phase === "loader2" ? 25 : phase === "loader2-resume" ? 90 : 100;
    const startFrom = phase === "loader2" ? 0 : phase === "loader2-resume" ? 25 : 90;
    const duration = phase === "loader2" ? 1500 : phase === "loader2-resume" ? 3000 : 500;
    const interval = 50;
    const totalSteps = duration / interval;
    const inc = (target - startFrom) / totalSteps;
    let val = startFrom;

    const id = setInterval(() => {
      val += inc;
      if (val >= target) {
        val = target;
        clearInterval(id);
        if (phase === "loader2") setPhase("water-question");
        else if (phase === "loader2-resume") setPhase("sleep-question");
        else setPhase("loader3");
      }
      setBar2(val);
    }, interval);
    return () => clearInterval(id);
  }, [phase]);

  // Loader 3: x2 faster
  useEffect(() => {
    if (phase !== "loader3") return;
    const duration = 1500;
    const interval = 50;
    const inc = 100 / (duration / interval);
    let val = 0;
    const id = setInterval(() => {
      val += inc;
      if (val >= 100) {
        val = 100;
        clearInterval(id);
        nextStep();
      }
      setBar3(val);
    }, interval);
    return () => clearInterval(id);
  }, [phase, nextStep]);

  const handleWater = useCallback(
    (option: { id: string; label: string }) => {
      updateData({ water: option });
      setPhase("loader2-resume");
    },
    [updateData]
  );

  const handleSleep = useCallback(
    (option: { id: string; label: string }) => {
      updateData({ sleep: option });
      setPhase("loader2-finish");
    },
    [updateData]
  );

  const showQuestion = phase === "water-question" || phase === "sleep-question";

  return (
    <section className="w-full min-h-screen p-6 flex flex-col bg-black text-white">
      <div className="flex-1">
        <Logo />
        <h2 className="text-2xl font-bold mb-12">Finishing your program...</h2>

        {/* Progress bars */}
        <div className="flex flex-col gap-8">
          {/* Bar 1 */}
          <div>
            <div className="flex justify-between mb-2">
              <span className={bar1 >= 100 ? "text-white" : "text-gray-400"}>
                Goals and preferences...
              </span>
              <span className="font-bold">{Math.round(bar1)}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-greenery-700 to-greenery-400 transition-all duration-100 ease-linear"
                style={{ width: `${bar1}%` }}
              />
            </div>
          </div>

          {/* Bar 2 */}
          <div>
            <div className="flex justify-between mb-2">
              <span className={bar2 >= 100 ? "text-white" : "text-gray-400"}>
                Activity level...
              </span>
              <span className="font-bold">{Math.round(bar2)}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-greenery-700 to-greenery-400 transition-all duration-100 ease-linear"
                style={{ width: `${bar2}%` }}
              />
            </div>
          </div>

          {/* Bar 3 */}
          <div>
            <div className="flex justify-between mb-2">
              <span className={bar3 >= 100 ? "text-white" : "text-gray-400"}>
                Motivation...
              </span>
              <span className="font-bold">{Math.round(bar3)}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-greenery-700 to-greenery-400 transition-all duration-100 ease-linear"
                style={{ width: `${bar3}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question overlay */}
      {showQuestion && (
        <div className="flex-shrink-0 bg-gray-800 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-3 mb-6">
            {/* Red square icon placeholder */}
            <div className="w-10 h-10 bg-red-500 rounded-lg flex-shrink-0" />
            <h3 className="text-xl font-bold">
              {phase === "water-question"
                ? "How many glasses of water do you drink daily?"
                : "How much sleep do you usually get?"}
            </h3>
          </div>
          <div className="flex gap-3">
            {(phase === "water-question" ? WATER_OPTIONS : SLEEP_OPTIONS).map(
              (option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    phase === "water-question"
                      ? handleWater(option)
                      : handleSleep(option)
                  }
                  className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-4 px-3 text-center font-medium transition-colors"
                >
                  {option.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
}
