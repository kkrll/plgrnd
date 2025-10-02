"use client";

import Image from "next/image";
import Progress from "./progress";
import { useState, useEffect } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import purpleStarsAnimation from "@/../../public/personalisation/Purple Stars.json";

type AnimationPhase = null | "start" | "middle" | "end";

export default function Personalisation() {
  const [currentLevel, setCurrentLevel] = useState(2);
  const [updatedLevel, setUpdatedLevel] = useState(2);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(null);

  useEffect(() => {
    if (currentLevel === 0) return;

    // Standard animation for levels 0-3
    // Start: height grows, symbols fade out
    setAnimationPhase("start");

    const middleTimer = setTimeout(() => {
      // Middle: bar width grows
      setAnimationPhase("middle");
      setUpdatedLevel(currentLevel);
    }, 150);

    const endTimer = setTimeout(() => {
      // End: height shrinks, symbols fade in
      setAnimationPhase("end");
    }, 1650); // 150ms + 1500ms

    const resetTimer = setTimeout(() => {
      // Reset animation state
      setAnimationPhase(null);
    }, 1800); // 150ms + 1500ms + 150ms

    return () => {
      clearTimeout(middleTimer);
      clearTimeout(endTimer);
      clearTimeout(resetTimer);
    };
  }, [currentLevel]);
  return (
    <div className="bg-[#f3f4f7] relative w-full min-h-screen">
      {/* Status Bar */}
      <div className="absolute content-stretch flex h-[59px] items-end justify-center left-0 top-0 w-full max-w-[390px]">
        <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-full items-center justify-center min-h-px min-w-px relative shrink-0">
          <div className="h-[21px] relative rounded-[24px] shrink-0 w-[54px]">
            <div className="absolute font-semibold h-[20px] leading-[0] left-[27px] not-italic text-[17px] text-black text-center top-px tracking-[-0.408px] translate-x-[-50%] w-[54px]">
              <p className="leading-[22px]">9:41</p>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col h-full items-center pb-0 pt-[10px] px-0 relative shrink-0">
          <div className="bg-black h-[37px] relative rounded-[100px] shrink-0 w-[125px]" />
        </div>
        <div className="basis-0 content-stretch flex gap-[8px] grow h-full items-center justify-center min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
            <div className="h-[12px] relative shrink-0 w-[18px]">
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path
                  d="M16.5 0C17.3284 0 18 0.671573 18 1.5V10.5C18 11.3284 17.3284 12 16.5 12H1.5C0.671573 12 0 11.3284 0 10.5V1.5C0 0.671573 0.671573 0 1.5 0H16.5Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="h-[11.834px] relative shrink-0 w-[17px]">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <path
                  d="M8.5 0C11.5376 0 14 2.46243 14 5.5C14 8.53757 11.5376 11 8.5 11C5.46243 11 3 8.53757 3 5.5C3 2.46243 5.46243 0 8.5 0Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="h-[13px] relative shrink-0 w-[27.401px]">
              <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="21"
                  height="9"
                  rx="2"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M25 4.5C25 4.22386 25.2239 4 25.5 4H26C26.5523 4 27 4.44772 27 5V8C27 8.55228 26.5523 9 26 9H25.5C25.2239 9 25 8.77614 25 8.5V4.5Z"
                  fill="black"
                />
                <rect x="4" y="4" width="17" height="5" rx="1" fill="black" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full relative opacity-10">
          {/* Purple gradient blob */}
          <div className="absolute top-[20%] left-[20%] w-[400px] h-[600px] bg-gradient-to-br from-[#8c25f4] to-[#5177eb] rounded-full blur-[100px] transform rotate-45" />
          {/* Blue gradient blob */}
          <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[350px] bg-gradient-to-tl from-[#5177eb] to-[#8c25f4] rounded-full blur-[100px] transform -rotate-12" />
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute content-stretch flex flex-col gap-[24px] items-end left-[23px] top-[128px] w-[calc(100%-46px)] max-w-[512px]">
        <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {/* Avatar Section */}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
              <div className="relative shrink-0 size-[80px]">
                <div className="absolute bg-[#d7dae5] inset-0 rounded-full overflow-hidden">
                  <Image
                    src="/personalisation/image.png"
                    alt="User avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Plus Icon Badge */}
                <div className="absolute bg-gradient-to-r content-stretch flex from-[#c490f9] items-center left-[56px] rounded-[23.04px] to-[#5177eb] top-[56px] via-50% via-[#8c25f4] size-[24px] justify-center border-2 border-[#f4eafe]">
                  <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e3cafc] text-[15px] text-center">
                    <p className="leading-[27px]">+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <h1 className="font-semibold leading-[40px] relative shrink-0 text-[32px] text-[rgba(0,0,0,0.8)] tracking-[0.1312px] w-full">
                  I start by learning how you move, then adapt your training.
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="backdrop-blur-[20px] w-full backdrop-filter bg-white box-border content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[32px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] shrink-0 max-w-full">
          {/* Header */}
          <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full min-h-[24px]">
            {/* With Spinner */}
            {animationPhase === "middle" && (
              <div className="absolute inset-0 flex gap-[4px] items-center animate-fade-in">
                {/* Loading Animation */}
                <div className="inline-grid place-items-start relative shrink-0">
                  <div className="flex items-center justify-center ml-0 mt-0 relative size-[24px]">
                    <Lottie
                      animationData={purpleStarsAnimation}
                      loop={true}
                      className="size-[24px]"
                    />
                  </div>
                </div>
                <div className="basis-0 font-semibold grow min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-black tracking-[-0.0496px]">
                  <p className="leading-[22px]">
                    Setting up smarter progression…
                  </p>
                </div>
              </div>
            )}

            {animationPhase === "end" && (
              <div className="absolute inset-0 flex gap-[4px] items-center animate-fade-out-text">
                {/* Loading Animation */}
                <div className="inline-grid place-items-start relative shrink-0">
                  <div className="flex items-center justify-center ml-0 mt-0 relative size-[24px]">
                    <Lottie
                      animationData={purpleStarsAnimation}
                      loop={true}
                      className="size-[24px]"
                    />
                  </div>
                </div>
                <div className="basis-0 font-semibold grow min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-black tracking-[-0.0496px]">
                  <p className="leading-[22px]">
                    Setting up smarter progression…
                  </p>
                </div>
              </div>
            )}

            {/* Without Spinner */}
            {animationPhase === null && (
              <div className="absolute inset-0 flex items-center animate-fade-in">
                <div className="font-semibold not-italic text-[16px] text-black tracking-[-0.0496px]">
                  <p className="leading-[22px]">Calibration moving ahead!</p>
                </div>
              </div>
            )}

            {animationPhase === "start" && (
              <div className="absolute inset-0 flex items-center animate-fade-out-text">
                <div className="font-semibold not-italic text-[16px] text-black tracking-[-0.0496px]">
                  <p className="leading-[22px]">Calibration moving ahead!</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Steps */}
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <Progress
              currentLevel={updatedLevel}
              animationPhase={animationPhase}
            />
            {/* Progress Bar */}

            {/* Labels */}
            <div className="content-stretch px-3 flex font-semibold items-start justify-between leading-[0] not-italic relative shrink-0 text-[12px] uppercase w-full">
              <div className="relative shrink-1 text-[#a3abc3] text-center w-[56px]">
                <p className="leading-[16px]">Profile</p>
              </div>
              <div className="relative shrink-2 text-black text-nowrap">
                <p className="leading-[16px] whitespace-pre">Workouts</p>
              </div>
              <div className="relative shrink-1 text-[#a3abc3] text-center w-[56px]">
                <p className="leading-[16px]">Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 w-full  p-8">
        {/* Button */}
        <div className="w-full flex flex-col gap-2 items-start">
          <p className="text-black">Workouts done:</p>
          <div className="flex gap-2 w-full">
            {[0, 1, 2, 3].map((level) => (
              <button
                className={`px-4 py-2 w-full ${
                  level === currentLevel - 1 ? "bg-[#681bb5]" : "bg-black"
                } rounded-xl text-white`}
                key={level}
                onClick={() => {
                  setCurrentLevel(level + 1);
                }}
              >
                {level}
              </button>
            ))}
          </div>
          <Link
            href="/personalisation-four"
            className={`px-4 py-2 w-full bg-black rounded-xl text-white text-center block`}
          >
            Variant A
          </Link>
        </div>
      </div>
    </div>
  );
}
