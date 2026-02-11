"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const options = [
  { id: "no-time", label: "I hardly have any time for myself" },
  { id: "some-time", label: "I’m busy but try to find some time" },
  { id: "flexible", label: "My schedule is open and flexible" },
];

export default function FreeTime() {
  const { updateData, nextStep } = useFunnelContext();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string | string[]) => {
    const selectedId = Array.isArray(id) ? id[0] : id;
    setSelected(selectedId);
    updateData({
      freetime: options.find((option) => option.id === selectedId),
    });

    if (id === "no-time") {
      setTimeout(() => {
        nextStep();
      }, 5000);
    } else {
      nextStep();
    }
  };

  return (
    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">
        How much time do you have for yourself every day?
      </h2>

      <FormOptions options={options} type="radio" onSubmit={handleSelect} />

      <div
        className={`bottom-thing ${selected === "no-time" ? "animate-in" : ""}`}
        style={{ display: selected === "no-time" ? "flex" : "none" }}
      >
        <span className="pt-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="6"
              width="22"
              height="22"
              rx="11"
              stroke="white"
              stroke-width="2"
            />
            <path
              d="M16 17V5C18.6124 5 21.0298 5.83476 23 7.25209L16 17Z"
              fill="white"
              fill-opacity="0.5"
            />
            <rect x="11" y="2" width="10" height="2" rx="1" fill="white" />
          </svg>
        </span>

        <p className="text-white text-[14px]">
          Just 5 minutes a day. <br />
          That’s all you need to develop a routine that works for you.
        </p>
      </div>
    </section>
  );
}
