"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type RulerValueRenderer = (value: number) => React.ReactNode;

interface RulerPickerProps {
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
  presetValue?: number | null;
  onChange?: (value: number) => void;

  /** Tick layout */
  tickDistancePx?: number;
  majorEvery?: number;

  /** Value display */
  renderValue?: RulerValueRenderer;
  unitLabel?: string;
}

export default function RulerPicker({
  min,
  max,
  step = 1,
  defaultValue,
  presetValue,
  onChange,
  tickDistancePx = 10,
  majorEvery = 10,
  renderValue,
  unitLabel,
}: RulerPickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const [displayValue, setDisplayValue] = useState(defaultValue);

  const TICK_DISTANCE = tickDistancePx;
  const totalSteps = useMemo(() => Math.round((max - min) / step), [max, min, step]);

  const tickClassName = (currentValue: number, isMajor: boolean) => {
    if (!presetValue) return isMajor ? "bg-gray-200 h-10 w-0.5" : "bg-gray-600 h-6 w-0.5";

    let shouldHighlight = false;
    if (displayValue > presetValue) {
      shouldHighlight = currentValue > presetValue && currentValue <= displayValue;
    } else if (displayValue < presetValue) {
      shouldHighlight = currentValue >= displayValue && currentValue < presetValue;
    }

    if (shouldHighlight) return isMajor ? "bg-blue-500 h-10 w-0.5" : "bg-blue-500 h-6 w-0.5";
    return isMajor ? "bg-gray-200 h-10 w-0.5" : "bg-gray-600 h-6 w-0.5";
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const currentStepIndex = Math.round(scrollLeft / TICK_DISTANCE);

    if (currentStepIndex !== lastStepRef.current) {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(5);
      lastStepRef.current = currentStepIndex;
    }

    const calculatedValue = Math.min(Math.max(min + currentStepIndex * step, min), max);
    setDisplayValue(calculatedValue);
    onChange?.(calculatedValue);
  };

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

  // Initial position (only on mount)
  useEffect(() => {
    if (!scrollRef.current) return;
    const initialSteps = (defaultValue - min) / step;
    const initialScroll = initialSteps * TICK_DISTANCE;
    scrollRef.current.scrollLeft = initialScroll;
    lastStepRef.current = initialSteps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-black text-white p-6 rounded-3xl">
      <div className="mb-8 text-center">
        {renderValue ? (
          <div className="text-6xl font-bold tracking-tighter">{renderValue(displayValue)}</div>
        ) : (
          <>
            <span className="text-6xl font-bold tracking-tighter">{displayValue}</span>
            {unitLabel && <span className="text-xl text-gray-400 ml-2 font-medium">{unitLabel}</span>}
          </>
        )}
      </div>

      <div className="relative w-full h-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-blue-500 rounded-full z-20 shadow-[0_0_10px_rgba(59,130,246,0.8)] pointer-events-none" />
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
          <div className="shrink-0" style={{ minWidth: "50%" }} />

          <div className="flex h-full items-end">
            {Array.from({ length: totalSteps + 1 }).map((_, i) => {
              const isMajor = i % majorEvery === 0;
              const currentValue = min + i * step;
              return (
                <div
                  key={i}
                  className="flex flex-col justify-end items-center shrink-0 snap-center"
                  style={{ width: TICK_DISTANCE }}
                >
                  <div className={`rounded-full ${tickClassName(currentValue, isMajor)}`} />
                </div>
              );
            })}
          </div>

          <div className="shrink-0" style={{ minWidth: "50%" }} />
        </div>
      </div>
    </div>
  );
}

