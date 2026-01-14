"use client";

import Image from "next/image";
import { useState } from "react";
import "./styles.css";

const bodyTypes = [
  {
    id: "slender",
    title: "Slender",
    description: "Lean frame with minimal muscle",
    image: "/micro-interactions/slender.png",
  },
  {
    id: "athletic",
    title: "Athletic",
    description: "Naturally balanced and toned",
    image: "/micro-interactions/athletic.png",
  },
  {
    id: "soft",
    title: "Soft mid-section",
    description: "Average frame with some belly fat",
    image: "/micro-interactions/soft.png",
  },
  {
    id: "heavy-build",
    title: "Heavy build",
    description: "Overweight or higher fat percentage",
    image: "/micro-interactions/heavy-build.png",
  },
];

export default function MicroInteractions() {
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);

  return (
    <>
      <div className="bg-black relative w-full min-h-screen text-white">
        {/* Main Content */}
        <div className="pt-[80px] px-6 flex flex-col gap-8 max-w-[390px] mx-auto pb-[108px]">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-center text-[16px] font-semibold uppercase tracking-wide">
              PERSONAL DETAILS
            </h1>

            {/* Progress Bar */}
            <div className="relative w-full flex items-center gap-2">
              {/* Back Button */}
              <button className="bg-[#1a1a1a] rounded-lg p-2.5 flex items-center justify-center shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Progress Bar Container */}
              <div className="flex-1 relative h-[40px] flex items-center">
                {/* Background Bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[8px] bg-[#1a1a1a] rounded-full" />

                {/* Completed Progress */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[8px] bg-[#4ade80] rounded-full transition-all duration-300"
                  style={{ width: "75%" }}
                />

                {/* Checkpoints positioned along the bar */}
                <div className="absolute inset-0 flex items-center justify-between">
                  {[0, 1, 2, 3].map((index) => {
                    const position = (index / 3) * 100; // Position checkpoints evenly
                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                        style={{ left: `${position}%` }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            index < 3 ? "bg-[#4ade80]" : "bg-[#1a1a1a]"
                          }`}
                        >
                          {index < 3 && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 6L4.5 8.5L10 3"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-[28px] font-bold leading-tight">
              Dima, what best matches your current body type?
            </h2>
            <p className="text-[#9ca3af] text-[16px] leading-relaxed">
              No right or wrong — we use this to better understand your starting
              point.
            </p>
          </div>

          {/* Body Type Cards */}
          <div className="flex flex-col gap-2">
            {bodyTypes.map((bodyType) => (
              <button
                key={bodyType.id}
                onClick={() =>
                  setSelectedBodyType(
                    selectedBodyType !== bodyType.id ? bodyType.id : null
                  )
                }
                className={`bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4 w-full transition-all ${
                  selectedBodyType === bodyType.id
                    ? "bg-blue-900"
                    : "hover:bg-[#252525]"
                }`}
              >
                {/* Image */}
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={bodyType.image}
                    alt={bodyType.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start gap-1 flex-1 text-left">
                  <h3 className="text-white text-[18px] font-semibold">
                    {bodyType.title}
                  </h3>
                  <p className="text-[#9ca3af] text-[14px]">
                    {bodyType.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Footer Privacy Statement */}
      <div
        className={`bottom-thing ${
          selectedBodyType ? "animate-out" : "animate-in"
        }`}
      >
        <span className="pt-2">
          <svg
            width="16"
            height="24"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_4068_18134)">
              <path
                d="M2.19727 19.1504H11.1328C12.5684 19.1504 13.3301 18.3691 13.3301 16.8262V10.0977C13.3301 8.56445 12.5684 7.7832 11.1328 7.7832H2.19727C0.761719 7.7832 0 8.56445 0 10.0977V16.8262C0 18.3691 0.761719 19.1504 2.19727 19.1504ZM2.24609 17.6758C1.82617 17.6758 1.58203 17.4121 1.58203 16.9336V9.99023C1.58203 9.51172 1.82617 9.25781 2.24609 9.25781H11.084C11.5137 9.25781 11.748 9.51172 11.748 9.99023V16.9336C11.748 17.4121 11.5137 17.6758 11.084 17.6758H2.24609ZM1.70898 8.53516H3.26172V5.24414C3.26172 2.77344 4.83398 1.47461 6.66016 1.47461C8.48633 1.47461 10.0781 2.77344 10.0781 5.24414V8.53516H11.6211V5.44922C11.6211 1.77734 9.21875 0 6.66016 0C4.11133 0 1.70898 1.77734 1.70898 5.44922V8.53516Z"
                fill="white"
                fillOpacity="0.85"
              />
            </g>
            <defs>
              <clipPath id="clip0_4068_18134">
                <rect width="13.6914" height="19.6582" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>

        <p className="text-white text-[14px]">
          Your answer stays private — it only helps us build the right plan.
        </p>
      </div>
      <button
        className={`bg-[#1a4ce6] rounded-xl p-4 w-[100%-64px] text-white text-center fixed bottom-6 left-8 right-8 ${
          selectedBodyType ? "animate-in" : "animate-out"
        }`}
      >
        Continue
      </button>
    </>
  );
}
