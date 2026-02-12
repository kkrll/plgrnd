"use client";

import { useEffect, useRef, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

const Rating = () => {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <div className="bg-[#00B67A] h-5 w-5 flex items-center justify-center">
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 0L8.03444 4.58359H13L8.98278 7.41641L6.5 9.16718L9.36639 8.56231L9.75 9.7082L10.5172 12L6.5 9.16718L2.48278 12L4.01722 7.41641L0 4.58359H4.96556L6.5 0Z"
                fill="white"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

const Reviews = [
  {
    name: "Manuel O.",
    title: "Amazing App",
    text: "The Zing app is absolutely amazing. I started using it in April 2025 at 195 lbs after losing 65 pounds and feeling pretty flabby. From April to July, the results were incredible. The workouts are intelligently tailored to push you to your limits while still taking injuries into account. Hands down, the best fitness app I’ve ever used.",
  },
  {
    name: "Sophia",
    title: "Just do it!",
    text: "It is very easy to just do it, to fallow the Training plan, simple, you dont do 50 différent workout, répétition is the key, perfection is the master to itch exercise. Love that you can modify your plan along the way, its simple, well explain I wake up at 4:30 am, at 5 Im at the gym or house, at 6 workout done shower taken lets go for this amazing day! 👊💪💪✌️",
  },
  {
    name: "Matthew S.",
    title: "Zing helps me be consistent",
    text: "Zing helps me be consistent with workouts and also helps me be consistent with hitting every muscle group. I also love the workout option to select my days for workouts since I do not have a consistent work schedule so I can look ahead at my next week and adjust what days I will be working out.",
  },
];

export default function AnalyzingStep() {
  const { nextStep, funnelData } = useFunnelContext();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getAgeGroup = (age?: string) => {
    switch (age) {
      case "18-29":
        return "under 30";
      case "30-39":
        return "in their 30s";
      case "40-49":
        return "in their 40s";
      case "50+":
        return "over 50";
      default:
        return "";
    }
  };

  useEffect(() => {
    // Animate progress from 0 to 100 over 5 seconds
    const duration = 5000;
    const intervalTime = 50; // Update every 50ms
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsComplete(true);
      }
      setProgress(currentProgress);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Autoplay carousel
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let stopped = false;

    const autoplay = setInterval(() => {
      if (stopped || !container) return;
      const cardWidth =
        (container.firstElementChild as HTMLElement)?.offsetWidth ?? 0;
      const gap = 16; // gap-4 = 16px
      const maxScroll = container.scrollWidth - container.clientWidth;
      const nextScroll = container.scrollLeft + cardWidth + gap;

      if (nextScroll > maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      }
    }, 3000);

    const pause = () => {
      stopped = true;
      clearInterval(autoplay);
    };
    container.addEventListener("touchstart", pause, { once: true });
    container.addEventListener("pointerdown", pause, { once: true });

    return () => {
      clearInterval(autoplay);
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("pointerdown", pause);
    };
  }, []);

  return (
    <section className="w-full min-h-screen px-6 pt-6 pb-12 flex flex-col  bg-black text-white">
      <div className="h-full">
        <Logo />
        <h2 className="mb-12">
          {funnelData.name}, over 500k men in their{" "}
          {getAgeGroup(funnelData.age)} have already tried Zing.
        </h2>
        <div
          ref={scrollRef}
          className="flex gap-4 items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {Reviews.map((review, i) => (
            <div
              key={i}
              className="bg-grey-800 p-6 rounded-3xl snap-start shrink-0 w-[calc(100vw-48px)] max-w-sm"
            >
              <div className="mb-4 flex w-full justify-between">
                <Rating />
                <p className="text-xs text-grey-400">{review.name}</p>
              </div>
              <h3 className="text-lg mb-2">{review.title}</h3>
              <p className="text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
      {!isComplete ? (
        <>
          {/* Text and progress bar */}
          <div className="flex-shrink-0 mb-8">
            <h2 className="text-center mb-2">Analyzing your answers...</h2>
            <p className="text-center text-gray-400 mb-8">
              Meanwhile take a look at what awaits you
            </p>

            {/* Progress bar */}
            <div className="flex gap-2 items-center">
              <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-greenery-700 to-greenery-400  transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-right text-xl font-bold mt-4 w-14">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Completion message */}
          <div className="flex-shrink-0">
            <h2 className="text-center mb-8">Your starting point is ready!</h2>

            <Button type="submit" onClick={() => nextStep()}>
              Continue
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
