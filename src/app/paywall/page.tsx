"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import PromoCodeBanner from "./PromoCodeBanner";
import PromoCodeBannerShader from "./PromoCodeBannerShader";

const STOPS = [
  { value: 10, image: "/Target/1.png" },
  { value: 30, image: "/Target/2.png" },
  { value: 50, image: "/Target/3.png" },
  { value: 70, image: "/Target/4.png" },
  { value: 90, image: "/Target/5.png" },
];

const AUTOPLAY_INTERVAL = 2000; // 2 seconds
const USER_PAUSE_DURATION = 20000; // 20 seconds

const PaywallPage = () => {
  const [activeStop, setActiveStop] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay functionality
  useEffect(() => {
    if (!isPaused) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveStop((prev) => (prev + 1) % STOPS.length);
      }, AUTOPLAY_INTERVAL);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused]);

  const handleUserInteraction = () => {
    setIsPaused(true);

    // Clear existing pause timer
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    // Resume autoplay after 20 seconds
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, USER_PAUSE_DURATION);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Find nearest stop
    const nearest = STOPS.reduce((prev, curr) =>
      Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
    );
    const stopIndex = STOPS.findIndex((stop) => stop.value === nearest.value);
    setActiveStop(stopIndex);
    handleUserInteraction();
  };

  const handleStopClick = (index: number) => {
    setActiveStop(index);
    handleUserInteraction();
  };

  return (
    <div className="bg-black min-h-screen text-white relative pb-10">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 right-0 h-[434px] overflow-hidden">
        <Image
          src="/Target/bg.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Header */}
      <div className="px-6 pt-6 relative z-10">
        <h1 className="text-[32px] font-semibold leading-[1.25] text-center w-full">
          Let&apos;s reach your goal
          <p className="text-[#C490F9] text-center w-full">
            First week&apos;s on us
          </p>
        </h1>
      </div>

      {/* Image Section */}
      <div className="mt-16 flex justify-center relative z-10">
        <div className="relative w-[70%] h-[320px]">
          <Image
            src={STOPS[activeStop].image}
            alt="Body transformation"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Slider Section */}
      <div className="px-6 relative z-10">
        <div className="relative">
          {/* Slider Background */}
          <div className="bg-gradient-to-r from-[#24262b] from-50% to-[#451278] h-[40px] rounded-[24px] border border-[#797f91] relative overflow-hidden">
            {/* Grid Dots */}
            <div className="absolute inset-0 flex items-center justify-between ">
              {STOPS.map((stop, i) => (
                <button
                  key={i}
                  onClick={() => handleStopClick(i)}
                  className="w-full h-full flex justify-center items-center rounded-full bg-white/24 hover:bg-white/50 transition-colors z-20 relative"
                >
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 16 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2L12 12L2 22"
                      stroke="white"
                      strokeOpacity="0.24"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Slider Handle */}
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={STOPS[activeStop].value}
            onChange={handleSliderChange}
            className="absolute top-0 left-0 w-full h-[40px] opacity-0 cursor-pointer z-40"
          />
          <div
            className="absolute top-[-4px] w-4 h-[48px] bg-black border-4 border-white rounded-[30px]  transition-all duration-200"
            style={{ left: `calc(${STOPS[activeStop].value}% - 4px)` }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-4 text-[12px] uppercase font-semibold px-4">
          <span className="w-[96px]">Today</span>
          <span>Your journey</span>
          <span className="w-[96px] text-end">Goal</span>
        </div>
        <p className="text-[#797f91] text-[12px] text-center mt-1">
          This is not a guarantee or promise of results
        </p>
      </div>

      {/* AI-Optimized Plan Section */}
      <div className="px-6 mt-6">
        <div className="bg-[#24262b] rounded-3xl px-6 pb-6 pt-4">
          <p className="text-[#C490F9] text-[12px] w-full text-center uppercase font-semibold mb-6">
            Your AI-Optimized Plan
          </p>

          <div className="grid grid-cols-2 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="12" r="4" fill="white" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#BEC4D5] text-[12px]">Your Goal</p>
                  <p className="text-white text-[16px] font-semibold">
                    Lose weight
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#4f535e] w-full" />

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L12 22M2 12L22 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#BEC4D5] text-[12px]">Target Weight</p>
                  <p className="text-white text-[16px] font-semibold">
                    180 lbs
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 pl-4 border-l border-[#4f535e]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 17L9 11L13 15L21 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#BEC4D5] text-[12px]">Your 4w Progress</p>
                  <p className="text-white text-[16px] font-semibold">-5 kg</p>
                </div>
              </div>

              <div className="h-px bg-[#4f535e] w-full" />

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="4"
                      y="10"
                      width="4"
                      height="10"
                      fill="white"
                      rx="1"
                    />
                    <rect
                      x="10"
                      y="7"
                      width="4"
                      height="13"
                      fill="white"
                      rx="1"
                    />
                    <rect
                      x="16"
                      y="4"
                      width="4"
                      height="16"
                      fill="white"
                      rx="1"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#BEC4D5] text-[12px]">Level</p>
                  <p className="text-white text-[16px] font-semibold">
                    Advanced
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code Banner */}
      <PromoCodeBanner />

      <PromoCodeBannerShader />
    </div>
  );
};

export default PaywallPage;
