"use client";

import { useEffect, useRef, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";

const options = {
  home: [
    {
      id: "easy-home",
      label: "Easy Start",
      duration: 15,
      frequency: 2,
      quote: "Build the habit without the burnout and get moving consistently.",
    },
    {
      id: "balanced-home",
      label: "Balanced",
      duration: 25,
      frequency: 3,
      quote:
        "The balanced route. Steady progress fitting into your life not taking it over.",
    },
    {
      id: "challenging-home",
      label: "Challenging",
      duration: 45,
      frequency: 5,
      quote:
        "Commitment for maximum results.  For those ready to push their limits daily.",
    },
  ],
  gym: [
    {
      id: "easy-gym",
      label: "Easy Start",
      duration: 30,
      frequency: 2,
      quote: "Build the habit without the burnout and get moving consistently.",
    },
    {
      id: "balanced-gym",
      label: "Balanced",
      duration: 60,
      frequency: 3,
      quote:
        "The balanced route. Steady progress fitting into your life not taking it over.",
    },
    {
      id: "challenging-gym",
      label: "Challenging",
      duration: 90,
      frequency: 5,
      quote:
        "Commitment for maximum results.  For those ready to push their limits daily.",
    },
  ],
};

const RECOMMENDED = "balanced";

export default function Program() {
  const { funnelData, nextStep, updateData } = useFunnelContext();
  const location = funnelData["location"];
  const scrollRef = useRef<HTMLDivElement>(null);
  const programOptions =
    options[location?.id as keyof typeof options] ?? options.gym;
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is in view via IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const coach = funnelData.coach ?? "john";

  const handleSelect = (programId: string) => {
    updateData({ program: programId });
    nextStep();
  };

  return (
    <section className="w-full min-h-screen flex flex-col">
      <div className="p-6 flex flex-col gap-2">
        <h2>Choose your training program</h2>
        <p className="text-grey-400">
          Pick the intensity that fits your lifestyle. You can change it
          anytime.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-scroll snap-x snap-mandatory pt-6 w-full mx-auto flex-1"
        style={{
          scrollbarWidth: "none",
          paddingLeft: "calc(50% - 7.5rem)",
          paddingRight: "calc(50% - 7.5rem)",
        }}
      >
        {programOptions.map((option, i) => {
          const isActive = activeIndex === i;
          const isRecommended = option.label === "Balanced";
          return (
            <div
              key={option.id}
              data-index={i}
              className="snap-center shrink-0 w-80 h-80 relative flex flex-col transition-all duration-300"
              style={{
                transform: isActive ? "scale(1)" : "scale(0.9)",
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {/* Recommended badge */}
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full whitespace-nowrap">
                  Perfect for your goal
                </div>
              )}

              <div className=" rounded-3xl overflow-hidden flex flex-col">
                {/* Image area with title and stats */}
                <div className="relative flex flex-col justify-between p-4 aspect-[2/1]">
                  <img
                    src={`/man-funnel/plan/${option.id}.webp`}
                    alt={option.label}
                    className="absolute inset-0 w-full object-cover object-top"
                  />
                  {/* Title */}
                  <h1
                    className={`font-semibold z-10 ${location?.id === "home" ? "text-black" : "text-white"}`}
                  >
                    {option.label}
                  </h1>

                  {/* Stats */}
                  <div
                    className={`flex flex-col gap-1 text-sm ${location?.id === "home" ? "text-grey-600" : "text-grey-400"}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_4559_8375)">
                            <path
                              d="M5.93023 11.9941C9.2035 11.9941 11.8605 9.30722 11.8605 5.99707C11.8605 2.68692 9.2035 0 5.93023 0C2.65697 0 0 2.68692 0 5.99707C0 9.30722 2.65697 11.9941 5.93023 11.9941ZM5.93023 10.9946C3.19767 10.9946 0.988372 8.7604 0.988372 5.99707C0.988372 3.23371 3.19767 0.999511 5.93023 0.999511C8.66277 0.999511 10.8721 3.23371 10.8721 5.99707C10.8721 8.7604 8.66277 10.9946 5.93023 10.9946Z"
                              fill="currentColor"
                            />
                            <path
                              d="M2.8894 6.63157H5.92429C6.15101 6.63157 6.33125 6.45517 6.33125 6.21999V2.25724C6.33125 2.02794 6.15101 1.85156 5.92429 1.85156C5.69754 1.85156 5.52314 2.02794 5.52314 2.25724V5.81432H2.8894C2.65684 5.81432 2.48242 5.99072 2.48242 6.21999C2.48242 6.45517 2.65684 6.63157 2.8894 6.63157Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4559_8375">
                              <rect width="12" height="12" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span>{option.duration} min workouts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>
                        <svg
                          width="12"
                          height="11"
                          viewBox="0 0 12 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_4559_8500)">
                            <path
                              d="M1.86812 10.9998H9.99505C11.2385 10.9998 11.8572 10.3791 11.8572 9.14952V1.86196C11.8572 0.632445 11.2385 0.0117188 9.99505 0.0117188H1.86812C0.624689 0.0117188 0 0.626475 0 1.86196V9.14952C0 10.385 0.624689 10.9998 1.86812 10.9998ZM1.77888 10.0388C1.24938 10.0388 0.957857 9.75833 0.957857 9.20327V3.57493C0.957857 3.02583 1.24938 2.73934 1.77888 2.73934H10.0724C10.6019 2.73934 10.8994 3.02583 10.8994 3.57493V9.20327C10.8994 9.75833 10.6019 10.0388 10.0724 10.0388H1.77888ZM4.77143 4.88202H5.12245C5.33069 4.88202 5.39615 4.82235 5.39615 4.61344V4.26129C5.39615 4.05242 5.33069 3.98676 5.12245 3.98676H4.77143C4.56323 3.98676 4.49183 4.05242 4.49183 4.26129V4.61344C4.49183 4.82235 4.56323 4.88202 4.77143 4.88202ZM6.74668 4.88202H7.09767C7.30591 4.88202 7.3773 4.82235 7.3773 4.61344V4.26129C7.3773 4.05242 7.30591 3.98676 7.09767 3.98676H6.74668C6.53844 3.98676 6.46705 4.05242 6.46705 4.26129V4.61344C6.46705 4.82235 6.53844 4.88202 6.74668 4.88202ZM8.72185 4.88202H9.07288C9.28112 4.88202 9.35251 4.82235 9.35251 4.61344V4.26129C9.35251 4.05242 9.28112 3.98676 9.07288 3.98676H8.72185C8.51365 3.98676 8.4482 4.05242 8.4482 4.26129V4.61344C8.4482 4.82235 8.51365 4.88202 8.72185 4.88202ZM2.79623 6.83373H3.1413C3.35548 6.83373 3.42093 6.77407 3.42093 6.56516V6.21301C3.42093 6.00414 3.35548 5.94443 3.1413 5.94443H2.79623C2.58205 5.94443 2.51661 6.00414 2.51661 6.21301V6.56516C2.51661 6.77407 2.58205 6.83373 2.79623 6.83373ZM4.77143 6.83373H5.12245C5.33069 6.83373 5.39615 6.77407 5.39615 6.56516V6.21301C5.39615 6.00414 5.33069 5.94443 5.12245 5.94443H4.77143C4.56323 5.94443 4.49183 6.00414 4.49183 6.21301V6.56516C4.49183 6.77407 4.56323 6.83373 4.77143 6.83373ZM6.74668 6.83373H7.09767C7.30591 6.83373 7.3773 6.77407 7.3773 6.56516V6.21301C7.3773 6.00414 7.30591 5.94443 7.09767 5.94443H6.74668C6.53844 5.94443 6.46705 6.00414 6.46705 6.21301V6.56516C6.46705 6.77407 6.53844 6.83373 6.74668 6.83373ZM8.72185 6.83373H9.07288C9.28112 6.83373 9.35251 6.77407 9.35251 6.56516V6.21301C9.35251 6.00414 9.28112 5.94443 9.07288 5.94443H8.72185C8.51365 5.94443 8.4482 6.00414 8.4482 6.21301V6.56516C8.4482 6.77407 8.51365 6.83373 8.72185 6.83373ZM2.79623 8.79141H3.1413C3.35548 8.79141 3.42093 8.72578 3.42093 8.51688V8.16472C3.42093 7.95582 3.35548 7.89615 3.1413 7.89615H2.79623C2.58205 7.89615 2.51661 7.95582 2.51661 8.16472V8.51688C2.51661 8.72578 2.58205 8.79141 2.79623 8.79141ZM4.77143 8.79141H5.12245C5.33069 8.79141 5.39615 8.72578 5.39615 8.51688V8.16472C5.39615 7.95582 5.33069 7.89615 5.12245 7.89615H4.77143C4.56323 7.89615 4.49183 7.95582 4.49183 8.16472V8.51688C4.49183 8.72578 4.56323 8.79141 4.77143 8.79141ZM6.74668 8.79141H7.09767C7.30591 8.79141 7.3773 8.72578 7.3773 8.51688V8.16472C7.3773 7.95582 7.30591 7.89615 7.09767 7.89615H6.74668C6.53844 7.89615 6.46705 7.95582 6.46705 8.16472V8.51688C6.46705 8.72578 6.53844 8.79141 6.74668 8.79141Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4559_8500">
                              <rect width="12" height="11" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span>{option.frequency} days per week</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="z-10 px-4 pb-4 pt-3 flex flex-col gap-4 bg-gradient-to-r from-blue-600 to-blue-400">
                  <div className=" flex items-start gap-2">
                    <img
                      src={`/man-funnel/avatars/${coach}.png`}
                      alt=""
                      className="w-8 h-8 shrink-0 mt-0.5"
                    />
                    <p className="text-sm leading-snug">{option.quote}</p>
                  </div>
                  <button
                    onClick={() => handleSelect(option.id)}
                    className="pressable w-full bg-white text-black font-semibold py-3 rounded-2xl transition-all"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1 py-6">
        {programOptions.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-11 bg-white" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
