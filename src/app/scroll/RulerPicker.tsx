"use client";

import { useState, useRef, useEffect } from "react";

interface RulerPickerProps {
  min?: number;
  max?: number;
  step?: number;
  presetValue?: number | null;
  defaultValue?: number;
  unit?: string;
  onChange?: (value: number) => void;
}

export default function RulerPicker({
  min = 0,
  max = 200,
  step = 1,
  presetValue,
  defaultValue = 176,
  unit = "cm",
  onChange,
}: RulerPickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef<number>(0); // FIX: Added missing ref
  const [displayValue, setDisplayValue] = useState(defaultValue);

  // Drag state for desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const TICK_DISTANCE = 10; // Pixel distance between steps
  const MARK_EVERY = 10; // Long tick every 10 steps
  const totalSteps = (max - min) / step;

  function isDifference(value: number, isMajor: boolean): string {
    if (!presetValue)
      return isMajor ? "bg-gray-200 h-10 w-0.5" : "bg-gray-600 h-6 w-0.5";

    // Highlight the difference range, excluding the preset value itself
    let shouldHighlight = false;

    if (displayValue > presetValue) {
      // When slider is above preset, highlight between preset and current (exclusive of preset)
      shouldHighlight = value > presetValue && value <= displayValue;
    } else if (displayValue < presetValue) {
      // When slider is below preset, highlight between current and preset (exclusive of preset)
      shouldHighlight = value >= displayValue && value < presetValue;
    }

    if (shouldHighlight) {
      return isMajor ? "bg-blue-500 h-10 w-0.5" : "bg-blue-500 h-6 w-0.5";
    }

    return isMajor ? "bg-gray-200 h-10 w-0.5" : "bg-gray-600 h-6 w-0.5";
  }

  // Handle Scroll Interaction
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;

    // Calculate which "step" index we are at (0, 1, 2...)
    const currentStepIndex = Math.round(scrollLeft / TICK_DISTANCE);

    // Haptics Logic
    if (currentStepIndex !== lastStepRef.current) {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        // A tiny, sharp pulse (5ms)
        navigator.vibrate(5);
      }
      lastStepRef.current = currentStepIndex;
    }

    // Value Calculation
    const calculatedValue = Math.min(
      Math.max(min + currentStepIndex * step, min),
      max,
    );

    setDisplayValue(calculatedValue);

    // Only fire onChange if it exists
    if (onChange) {
      onChange(calculatedValue);
    }
  };

  // Desktop drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeftStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const delta = e.pageX - startX.current;
    scrollRef.current.scrollLeft = scrollLeftStart.current - delta;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };

  // Initial Positioning
  useEffect(() => {
    if (scrollRef.current) {
      // Calculate where the scrollbar needs to be to center the defaultValue
      const initialSteps = (defaultValue - min) / step;
      const initialScroll = initialSteps * TICK_DISTANCE;

      scrollRef.current.scrollLeft = initialScroll;
      // Sync the ref so we don't vibrate on initial load
      lastStepRef.current = initialSteps;
    }
  }, [defaultValue, min, step]); // Added dependencies for safety

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-black text-white p-6 rounded-3xl">
      {/* 1. The Value Display */}
      <div className="mb-8 text-center">
        <span className="text-6xl font-bold tracking-tighter">
          {displayValue}
        </span>
        <span className="text-xl text-gray-400 ml-2 font-medium">{unit}</span>
      </div>

      {/* 2. The Ruler Container */}
      <div className="relative w-full h-24">
        {/* Center Indicator (The Blue Line) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-blue-500 rounded-full z-20 shadow-[0_0_10px_rgba(59,130,246,0.8)] pointer-events-none" />

        {/* Fade Gradients (for depth) */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full overflow-x-auto no-scrollbar flex items-end snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing select-none"
        >
          {/* Spacer Left */}
          <div className="shrink-0" style={{ minWidth: "50%" }} />

          {/* Ticks Rendering */}
          <div className="flex h-full items-end">
            {Array.from({ length: totalSteps + 1 }).map((_, i) => {
              const isMajor = i % MARK_EVERY === 0;
              const currentValue = min + i * step;
              return (
                <div
                  key={i}
                  className="flex flex-col justify-end items-center shrink-0 snap-center"
                  style={{ width: TICK_DISTANCE }}
                >
                  {/* The visual line */}
                  <div
                    className={`rounded-full ${isDifference(currentValue, isMajor)}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Spacer Right */}
          <div className="shrink-0" style={{ minWidth: "50%" }} />
        </div>
      </div>
    </div>
  );
}
