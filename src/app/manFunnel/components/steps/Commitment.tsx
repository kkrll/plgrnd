"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";
import Logo from "../Logo";

const options = [
  {
    id: "today",
    label: (
      <>
        Yes! <br /> I will do my first workout tomorrow!
      </>
    ),
  },
  {
    id: "tomorrow",
    label: (
      <>
        Yes! <br /> I will do my first workout today!
      </>
    ),
  },
  { id: "no", label: "I’m not ready to make the commitment" },
];

export default function Commitment() {
  const { updateData, nextStep } = useFunnelContext();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string | string[]) => {
    setSelected(id as string);
    updateData({
      commitment: id as "today" | "tomorrow" | "no",
    });

    if (id === "no") {
      setTimeout(() => {
        nextStep();
      }, 5000);
    } else {
      nextStep();
    }
  };

  return (
    <section className="w-full p-6 flex flex-col items-center">
      <Logo />
      <h2 className="text-center mb-8">
        <span className="text-blue-300">Are you ready</span> <br />
        to make the commitment?
      </h2>

      <FormOptions options={options} type="radio" onSubmit={handleSelect} />

      <div
        className={`bottom-thing ${selected === "no" ? "animate-in" : ""}`}
        style={{
          display: selected === "no" ? "flex" : "none",
        }}
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
          That's ok — you can start when you are ready.
        </p>
      </div>
    </section>
  );
}
