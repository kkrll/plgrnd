"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [cardExiting, setCardExiting] = useState(false);

  // Loader 1: runs 0→100
  useEffect(() => {
    if (phase !== "loader1") return;
    const duration = 1500;
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
    if (
      phase !== "loader2" &&
      phase !== "loader2-resume" &&
      phase !== "loader2-finish"
    )
      return;

    const target =
      phase === "loader2" ? 25 : phase === "loader2-resume" ? 90 : 100;
    const startFrom =
      phase === "loader2" ? 0 : phase === "loader2-resume" ? 25 : 90;
    const duration =
      phase === "loader2" ? 1500 : phase === "loader2-resume" ? 3000 : 500;
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

  // Show overlay when entering a question phase
  useEffect(() => {
    if (phase === "water-question" || phase === "sleep-question") {
      setCardExiting(false);
      setOverlayVisible(true);
    }
  }, [phase]);

  const dismissOverlay = useCallback((nextPhase: Phase) => {
    setCardExiting(true);
    setTimeout(() => {
      setOverlayVisible(false);
      setCardExiting(false);
      setPhase(nextPhase);
    }, 300); // matches slideDown duration
  }, []);

  const handleWater = useCallback(
    (option: { id: string; label: string }) => {
      updateData({ water: option });
      dismissOverlay("loader2-resume");
    },
    [updateData, dismissOverlay],
  );

  const handleSleep = useCallback(
    (option: { id: string; label: string }) => {
      updateData({ sleep: option });
      dismissOverlay("loader2-finish");
    },
    [updateData, dismissOverlay],
  );

  return (
    <section className="w-full min-h-screen pt-6 px-6 flex flex-col bg-black text-white">
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
      {overlayVisible &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col justify-end items-center transition-all duration-300"
            style={{
              backgroundColor: cardExiting ? "transparent" : "rgba(0,0,0,0.65)",
            }}
          >
            <div
              className={`flex-shrink-0 bg-grey-800 max-w-[420px] rounded-t-3xl w-full px-6 pt-6 pb-6 ${cardExiting ? "question-out" : "question-in"}`}
            >
              <div className="flex gap-3 items-center mb-6">
                {/* Red square icon placeholder */}
                {phase === "water-question" ? (
                  <svg
                    width="36"
                    height="38"
                    viewBox="0 0 36 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M13.4219 4.10854H22.5156C23.3125 4.10854 23.9062 3.53302 23.9062 2.68574V1.4228C23.9062 0.591502 23.3125 0 22.5156 0H13.4219C12.5937 0 12.0312 0.591502 12.0312 1.4228V2.68574C12.0312 3.53302 12.5937 4.10854 13.4219 4.10854ZM15.8906 3.74085L13.3906 2.98949L10.4062 7.2419C9.28125 8.85655 9 10.3912 9 12.5654V32.5166C9 36.0337 10.7188 37.984 13.8438 37.984H22.0781C25.1875 37.984 26.9375 36.0337 26.9375 32.5166V12.5654C26.9375 10.3912 26.625 8.85655 25.5 7.2419L22.5312 2.98949L20.0156 3.74085L23.3594 8.58477C24.2656 9.92764 24.4219 10.743 24.4219 12.5654V32.5166C24.4219 34.419 23.6094 35.4102 22.0781 35.4102H13.8438C12.3125 35.4102 11.5156 34.419 11.5156 32.5166V12.5654C11.5156 10.743 11.6406 9.92764 12.5625 8.58477L15.8906 3.74085ZM10.5469 12.2137V14.228H25.3594V12.2137H10.5469ZM17.9531 27.257C20.1562 27.257 21.5781 25.8183 21.5781 23.6761C21.5781 22.541 21.125 21.6457 20.8438 21.0863C20.2969 19.7914 19.3281 18.1607 18.5156 16.9137C18.3594 16.6579 18.1719 16.53 17.9531 16.53C17.75 16.53 17.5625 16.6579 17.3906 16.9137C16.5781 18.1607 15.6406 19.7914 15.0625 21.0863C14.8125 21.6457 14.3281 22.541 14.3281 23.6761C14.3281 25.8183 15.7656 27.257 17.9531 27.257ZM10.5469 29.9109V31.9251H25.3594V29.9109H10.5469Z"
                      fill="white"
                      fill-opacity="0.85"
                    />
                  </svg>
                ) : (
                  <svg
                    width="36"
                    height="40"
                    viewBox="0 0 36 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M25.3655 7.52211H21.1433V7.43362L25.477 1.99999C25.8677 1.50442 26.0165 1.22123 26.0165 0.902654C26.0165 0.336283 25.5701 0 24.9376 0H18.9858C18.4093 0 18 0.371681 18 0.920353C18 1.48672 18.4093 1.84071 18.9858 1.84071H22.9661V1.9292L18.5766 7.34513C18.1859 7.823 18.0558 8.08848 18.0558 8.46017C18.0558 8.97345 18.465 9.34512 19.0974 9.34512H25.3655C25.9421 9.34512 26.3512 9.00883 26.3512 8.42477C26.3512 7.87609 25.9421 7.52211 25.3655 7.52211ZM34.0701 14.3009H31.0941V14.2301L34.1817 10.3717C34.535 9.92918 34.6838 9.6637 34.6838 9.32743C34.6838 8.81415 34.256 8.49556 33.6795 8.49556H29.1226C28.6017 8.49556 28.2112 8.84955 28.2112 9.34512C28.2112 9.91149 28.6017 10.2478 29.1226 10.2478H31.801V10.3186L28.7505 14.1416C28.3972 14.5664 28.267 14.8496 28.267 15.2035C28.267 15.6815 28.6576 16.0353 29.2342 16.0353H34.0701C34.6281 16.0353 35 15.7168 35 15.1681C35 14.6372 34.6281 14.3009 34.0701 14.3009ZM25.8677 20.3362H23.3381V20.2654L25.9606 16.9558C26.2955 16.5132 26.4443 16.2655 26.4443 15.9646C26.4443 15.469 26.035 15.1681 25.477 15.1681H21.4782C20.9759 15.1681 20.6039 15.4867 20.6039 15.9823C20.6039 16.5132 20.9759 16.8142 21.4782 16.8142H23.7101V16.9027L21.1247 20.1946C20.79 20.6017 20.6598 20.8673 20.6598 21.2036C20.6598 21.6637 21.0318 22 21.5711 22H25.8677C26.3885 22 26.7419 21.6637 26.7419 21.1681C26.7419 20.6725 26.3885 20.3362 25.8677 20.3362Z"
                      fill="white"
                    />
                    <path
                      d="M16.0578 40C22.3467 40 27.4841 36.3656 29.8224 31.2046C30.1058 30.5686 30.0351 30.0235 29.7162 29.6963C29.4504 29.442 28.9899 29.4056 28.4407 29.5873C27.0058 30.187 25.3583 30.4778 23.4628 30.4778C15.5796 30.4778 10.4599 25.3895 10.4599 17.4483C10.4599 15.4312 10.9736 13.0688 11.5582 11.8331C11.877 11.1971 11.8594 10.6518 11.5936 10.3248C11.3102 9.96134 10.761 9.88865 10.0701 10.1794C4.63159 12.5963 1 18.2115 1 24.5173C1 33.0764 7.51916 40 16.0578 40Z"
                      fill="white"
                    />
                  </svg>
                )}
                <h3 className="text-xl font-bold">
                  {phase === "water-question"
                    ? "How many glasses of water do you drink daily?"
                    : "How much sleep do you usually get?"}
                </h3>
              </div>
              <div className="flex gap-3">
                {(phase === "water-question"
                  ? WATER_OPTIONS
                  : SLEEP_OPTIONS
                ).map((option) => (
                  <button
                    key={option.id}
                    onClick={() =>
                      phase === "water-question"
                        ? handleWater(option)
                        : handleSleep(option)
                    }
                    className="flex-1 bg-grey-700 hover:bg-grey-600 rounded-xl py-4 px-3 text-center font-medium transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
