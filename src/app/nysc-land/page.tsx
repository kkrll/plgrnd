"use client";

import Logo from "./logo";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const AUTO_ADVANCE_MS = 8_000;

const CARDS = [
  {
    id: "intro",
    eyebrow: "MYCO",
    title: "Your Daily Workout Plan",
    badge: "30 days free for NYSC members",
  },
  {
    id: "body-scan",
    eyebrow: "A coach who knows your body...",
    title: "Body Scan",
    body: "With just two selfies, scan your body and create a workout plan based on your muscle analysis and body composition.",
  },
  {
    id: "fitness-plan",
    eyebrow: "Builds a hyper personalized plan around it",
    title: "Fitness Plan",
    body: "A plan that adapts itself around your recovery, energy and progress.",
  },
  {
    id: "workouts",
    eyebrow: "Guides you through the workout",
    title: "Workouts",
    body: "600+ exercises with video — at the gym or at home, no guessing.",
  },
  {
    id: "coach",
    eyebrow: "...and never logs off",
    title: "24/7 Training Coach",
    body: "Got a question? Ask MYCO anything, anytime — form, swaps, motivation, lifestyle",
  },
] as const;

const Steps = ({
  step,
  animate,
  progressKey,
  className,
}: {
  step: number;
  animate: boolean;
  progressKey: number;
  className?: string;
}) => {
  return (
    <div
      className={`flex gap-2 w-full transition-all duration-300 ${className}`}
    >
      {[1, 2, 3, 4].map((item) => {
        const isCompleted = item < step;
        const isActive = item === step;

        return (
          <div
            key={item}
            className="h-1 flex-1 overflow-hidden rounded-full bg-black/10"
          >
            <div
              key={isActive ? `${item}-${progressKey}` : item}
              className={`h-full w-full origin-left rounded-full bg-black ${
                isActive && animate ? "nysc-story-fill-active" : ""
              }`}
              style={{
                ["--story-duration" as string]: `${AUTO_ADVANCE_MS}ms`,
                transform:
                  isCompleted || (isActive && !animate)
                    ? "scaleX(1)"
                    : isActive
                      ? undefined
                      : "scaleX(0)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const NyscLandPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const isAutoScrolling = useRef(false);
  const autoScrollResetTimer = useRef<number | null>(null);
  const [step, setStep] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  stepRef.current = step;

  const disableAutoScroll = useCallback(() => {
    setAutoScrollEnabled(false);
  }, []);

  const scrollToStep = useCallback((index: number) => {
    const root = scrollRef.current;
    if (!root?.children[index]) return;

    isAutoScrolling.current = true;
    setStep(index);
    setProgressKey((key) => key + 1);

    (root.children[index] as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    if (autoScrollResetTimer.current !== null) {
      window.clearTimeout(autoScrollResetTimer.current);
    }

    autoScrollResetTimer.current = window.setTimeout(() => {
      isAutoScrolling.current = false;
    }, 800);

    if (index >= CARDS.length - 1) {
      setAutoScrollEnabled(false);
    }
  }, []);

  const updateStepFromScroll = useCallback(() => {
    const root = scrollRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const centerY = rootRect.top + rootRect.height / 2;
    let best = 0;
    let minDist = Infinity;

    Array.from(root.children).forEach((node, i) => {
      const r = (node as HTMLElement).getBoundingClientRect();
      const childCenterY = r.top + r.height / 2;
      const d = Math.abs(childCenterY - centerY);
      if (d < minDist) {
        minDist = d;
        best = i;
      }
    });

    setStep((prev) => {
      if (prev !== best) {
        setProgressKey((key) => key + 1);

        if (best >= CARDS.length - 1) {
          setAutoScrollEnabled(false);
        }
      }
      return best;
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (isAutoScrolling.current) return;

    disableAutoScroll();
    updateStepFromScroll();
  }, [disableAutoScroll, updateStepFromScroll]);

  useLayoutEffect(() => {
    updateStepFromScroll();
    const onResize = () => updateStepFromScroll();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateStepFromScroll]);

  useEffect(() => {
    if (!autoScrollEnabled) return;

    const intervalId = window.setInterval(() => {
      if (stepRef.current >= CARDS.length - 1) {
        setAutoScrollEnabled(false);
        return;
      }

      scrollToStep(stepRef.current + 1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [autoScrollEnabled, scrollToStep]);

  useEffect(() => {
    return () => {
      if (autoScrollResetTimer.current !== null) {
        window.clearTimeout(autoScrollResetTimer.current);
      }
    };
  }, []);

  return (
    <div className="relative h-dvh bg-white">
      <style jsx global>{`
        @keyframes nysc-story-progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .nysc-story-fill-active {
          animation: nysc-story-progress var(--story-duration, 20s) linear
            forwards;
        }
      `}</style>

      <div className="absolute top-0 left-0 right-0 flex flex-col gap-2 shrink-0 items-center justify-center p-4 bg-white/60 backdrop-blur-sm z-10">
        <Logo
          className={
            step !== 0
              ? "opacity-0 -translate-y-full max-h-0"
              : "opacity-100 translate-y-0 max-h-24"
          }
        />
        <Steps
          step={step}
          animate={autoScrollEnabled}
          progressKey={progressKey}
          className={
            step === 0
              ? "opacity-0 translate-y-full"
              : "opacity-100 translate-y-0"
          }
        />
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={disableAutoScroll}
        onPointerDown={disableAutoScroll}
        className="no-scrollbar h-full min-h-0 overflow-y-auto snap-y snap-mandatory touch-pan-y py-24"
      >
        {CARDS.map((card) => (
          <div
            key={card.id}
            className="flex h-[100%] shrink-0 snap-center snap-always flex-col items-center justify-center px-4 py-2 text-black"
          >
            <div className="flex w-full h-full max-w-md flex-col items-stretch justify-between gap-2 rounded-2xl bg-gray-200 p-6">
              <h1 className="text-2xl font-semibols text-gray-600">
                {card.eyebrow}
              </h1>
              <div>
                <h2 className="text-xl text-left font-semibold w-full">
                  {card.title}
                </h2>
                {"badge" in card && card.badge ? (
                  <p className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                    {card.badge}
                  </p>
                ) : null}
                {"body" in card && card.body ? (
                  <p className="text-base text-gray-700">{card.body}</p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4 shrink-0"
        style={{
          background: "linear-gradient(#FFFFFF00 49%, #FFFFFFFF 50%)",
        }}
      >
        <button
          className="w-full rounded-2xl px-4 pb-4 pt-3 transition-colors duration-300"
          style={{
            background:
              step === 4
                ? "black"
                : "linear-gradient(90deg, #F4EAFE 0%, #FFDADC 100%)",
            color: step === 4 ? "white" : "black",
          }}
        >
          Build my plan
        </button>
      </div>
    </div>
  );
};

export default NyscLandPage;
