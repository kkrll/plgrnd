"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_REPS = 12; // adjust to desired amount

const InteractiveWorkout = () => {
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [repCount, setRepCount] = useState(0);
  const [webcamError, setWebcamError] = useState<string | null>(null);

  // Get user webcam stream once component mounts
  useEffect(() => {
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam", err);
        setWebcamError("Unable to access webcam. Please grant permission.");
      }
    };

    enableWebcam();
  }, []);

  // TEMP: Simulate counting reps every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRepCount((prev) => (prev < TOTAL_REPS ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center w-full min-h-screen gap-6 p-6 bg-gray-50">
      {/* Videos section */}
      <section className="flex w-full max-w-6xl gap-6">
        {/* Coach video */}
        <video
          className="w-1/2 rounded-lg border border-gray-300 shadow-sm"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* User webcam video */}
        <div className="relative w-1/2">
          <video
            ref={userVideoRef}
            className="w-full rounded-lg border border-gray-300 shadow-sm"
            autoPlay
            playsInline
            muted
          />
          {webcamError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg text-red-600 font-semibold text-center p-4">
              {webcamError}
            </div>
          )}
        </div>
      </section>

      {/* Repetition progress bars */}
      <section className="flex flex-col items-center w-full max-w-4xl gap-2">
        <div className="flex w-full gap-1">
          {Array.from({ length: TOTAL_REPS }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-4 rounded ${
                idx < repCount ? "bg-purple-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium">
          {repCount}/{TOTAL_REPS} reps
        </span>
      </section>
    </main>
  );
};

export default InteractiveWorkout;
