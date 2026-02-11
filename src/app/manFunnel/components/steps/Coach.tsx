"use client";

import { useEffect, useRef, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";

const options = [
  { id: "john", label: "Tough love and high intensity" },
  { id: "jennifer", label: "Science based for long term results" },
  { id: "sarah", label: "Sassy energy, max motivation" },
];

const RECOMMENDED = "john";

export default function Coach() {
  const { funnelData, nextStep, updateData } = useFunnelContext();
  const location = funnelData["location"];
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const handleSelect = (coachId: string) => {
    updateData({ coach: coachId });
    nextStep();
  };

  return (
    <section className="w-full min-h-screen flex flex-col">
      <div className="p-6 flex flex-col gap-2">
        <h2>We found 3 coaches for you</h2>
        <p className="text-grey-400">
          Choose a coach to complete the setup. You can change your coach
          anytime.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-scroll snap-x snap-mandatory pt-6 w-full mx-auto"
        style={{
          scrollbarWidth: "none",
          paddingLeft: "calc(50% - 7.5rem)",
          paddingRight: "calc(50% - 7.5rem)",
        }}
      >
        {options.map((coach, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={coach.id}
              data-index={i}
              className="snap-center shrink-0 w-60 relative flex flex-col justify-end transition-all duration-300"
              style={{
                transform: isActive ? "scale(1)" : "scale(0.9)",
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {/* Coach image */}
              <div className="relative aspect-[3/4]">
                <img
                  src={`/man-funnel/coach/${coach.id}.webp`}
                  alt={coach.id}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                />

                {coach.id === RECOMMENDED && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-bold uppercase px-2 py-1 rounded-full whitespace-nowrap">
                    Perfect for your goal
                  </div>
                )}

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center text-center gap-1">
                  <h3 className="text-2xl font-bold capitalize">{coach.id}</h3>
                  <p className="text-grey-400 text-sm mb-4">{coach.label}</p>
                  <button
                    onClick={() => handleSelect(coach.id)}
                    className="pressable w-full bg-white text-black font-semibold py-4 rounded-2xl transition-all"
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
        {options.map((_, i) => (
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
