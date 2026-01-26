'use client';

import React, { useMemo } from 'react';

interface BmiGaugeProps {
    value: number;
    min?: number;
    max?: number;
}

export default function BmiGauge({
    value = 21.5,
    min = 15,
    max = 40,
}: BmiGaugeProps) {
    // 1. Calculate percentage for the white indicator line
    // We clamp it between 0 and 100 to prevent breaking layout
    const percentage = Math.min(
        Math.max(((value - min) / (max - min)) * 100, 0),
        100
    );

    // 2. Determine color based on BMI standard zones
    const getZoneColor = (bmi: number) => {
        if (bmi < 18.5) return 'bg-orange-400'; // Underweight
        if (bmi < 25) return 'bg-lime-500';     // Normal (Green)
        if (bmi < 30) return 'bg-yellow-400';   // Overweight (Yellow)
        if (bmi < 35) return 'bg-orange-500';   // Obese I
        return 'bg-red-500';                    // Obese II+
    };

    const currentColor = getZoneColor(value);

    // 3. Generate tick marks
    // We create 50 ticks to simulate the visual density of the image
    const totalTicks = 50;
    const ticks = useMemo(() => {
        return Array.from({ length: totalTicks }).map((_, i) => {
            // Calculate which BMI number this specific tick represents
            const tickValue = min + (i / (totalTicks - 1)) * (max - min);
            return {
                id: i,
                color: getZoneColor(tickValue),
            };
        });
    }, [min, max]);

    return (
        <div className="w-full ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold tracking-wide">
                    Body Mass Index (BMI)
                </h3>
                <div
                    className={`${currentColor} text-slate-900 font-bold px-4 py-1 rounded-full transition-colors duration-300`}
                >
                    {value.toFixed(1)}
                </div>
            </div>

            {/* Gauge Container */}
            <div className="relative mb-2">
                {/* Ticks Row */}
                <div className="flex justify-between items-end px-1">
                    {ticks.map((tick) => (
                        <div
                            key={tick.id}
                            className={`w-1 rounded-full ${tick.color} opacity-80`}
                            style={{
                                // Cosmetic: Make every 5th tick slightly taller
                                height: '16px',

                            }}
                        />
                    ))}
                </div>

                {/* Indicator Line */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white rounded-full transition-all duration-500 ease-out z-10"
                    style={{
                        left: `${percentage}%`,
                        transform: 'translateX(-50%) translateY(-25%)', // Center the line on the percentage point
                        height: '32px', // Make it taller than the ticks
                    }}
                />
            </div>

            {/* Labels */}
            <div className="flex justify-between text-[10px]  text-gray-400 mt-4 ">
                <span>NORMAL</span>
                <span className="text-center ">OVERWEIGHT</span>
                <span>OBESE</span>
            </div>
        </div>
    );
}