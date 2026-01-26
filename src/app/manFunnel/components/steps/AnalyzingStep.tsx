"use client";

import { useEffect, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";

export default function AnalyzingStep() {
  const { nextStep } = useFunnelContext();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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

  return (
    <section className="w-full h-screen p-6 flex flex-col overflow-hidden bg-black text-white">
      {!isComplete ? (
        <>
          {/* Video section - centered */}
          <div className="flex-1 flex items-center justify-center mb-8 overflow-hidden">
            <div className="video-container h-full max-h-[60vh]">
              <video
                src="/man-funnel/body-scan/body-scan_c.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-auto max-w-full object-contain"
              />
            </div>
          </div>

          {/* Text and progress bar */}
          <div className="flex-shrink-0 mb-8">
            <h2 className="text-center mb-2">
              Analyzing your answers...
            </h2>
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
          {/* Video section - centered */}
          <div className="flex-1 flex items-center justify-center mb-8 overflow-hidden">
            <div className="video-container h-full max-h-[60vh]">
              <video
                src="/man-funnel/body-scan/body-scan_c.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-auto max-w-full object-contain"
              />
            </div>
          </div>

          {/* Completion message */}
          <div className="flex-shrink-0">
            <h2 className="text-center mb-8">
              Your starting point is ready!
            </h2>

            <Button type="submit" onClick={() => nextStep()}>
              Continue
            </Button>
          </div>
        </>
      )
      }
    </section >
  );
}
