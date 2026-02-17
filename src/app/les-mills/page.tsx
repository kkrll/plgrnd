"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.css";

const imgs: number[] = Array.from({ length: 16 }, (_, i) => i + 1);
type TileClass =
  | ""
  | "grow-rb"
  | "grow-rt"
  | "grow-lb"
  | "grow-lt"
  | "overlayed";
type GridState = Record<number, TileClass>;

const gridMap: GridState[] = [
  {
    1: "grow-rb",
    2: "overlayed",
    3: "",
    4: "",
    5: "overlayed",
    6: "overlayed",
    7: "overlayed",
    8: "overlayed",
    9: "",
    10: "",
    11: "overlayed",
    12: "grow-lt",
    13: "",
    14: "",
    15: "",
    16: "",
  },
  {
    1: "",
    2: "grow-rb",
    3: "overlayed",
    4: "",
    5: "",
    6: "overlayed",
    7: "overlayed",
    8: "",
    9: "overlayed",
    10: "overlayed",
    11: "",
    12: "",
    13: "grow-rt",
    14: "overlayed",
    15: "",
    16: "",
  },
  {
    1: "",
    2: "",
    3: "overlayed",
    4: "grow-lb",
    5: "",
    6: "",
    7: "overlayed",
    8: "overlayed",
    9: "",
    10: "overlayed",
    11: "grow-lb",
    12: "",
    13: "",
    14: "overlayed",
    15: "overlayed",
    16: "",
  },
  {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "grow-rb",
    6: "overlayed",
    7: "",
    8: "",
    9: "overlayed",
    10: "overlayed",
    11: "overlayed",
    12: "overlayed",
    13: "",
    14: "",
    15: "overlayed",
    16: "grow-lt",
  },
];

const LesMills = () => {
  const [iteration, setIteration] = useState(0);
  const activeGridMap = gridMap[iteration];

  useEffect(() => {
    const interval = setInterval(() => {
      setIteration((prev) => (prev < gridMap.length - 1 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-[512px] mx-auto h-dvh p-6 flex flex-col justify-between gap-6 bg-grey-200 overflow-hidden">
      <div className="bg-white w-11 h-11 min-w-11 min-h-11 shrink-0 ml-auto flex items-center justify-center rounded-2xl">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.295367 0.295367C0.68919 -0.0984557 1.3277 -0.0984557 1.72153 0.295367L11.7046 10.2785C12.0985 10.6723 12.0985 11.3108 11.7046 11.7046C11.3108 12.0985 10.6723 12.0985 10.2785 11.7046L0.295367 1.72153C-0.0984557 1.3277 -0.0984557 0.68919 0.295367 0.295367Z"
            fill="black"
          />
          <path
            d="M11.7046 0.295367C12.0985 0.68919 12.0985 1.3277 11.7046 1.72153L1.72153 11.7046C1.3277 12.0985 0.68919 12.0985 0.295367 11.7046C-0.0984555 11.3108 -0.0984559 10.6723 0.295367 10.2785L10.2785 0.295367C10.6723 -0.0984557 11.3108 -0.0984557 11.7046 0.295367Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="lm-middle w-full flex-1 min-h-0 flex flex-col items-center justify-center">
        <div className="lm-middle-content flex flex-col justify-start">
          <div className="lm-grid grid grid-cols-4 grid-rows-4 w-full aspect-square gap-1">
            {imgs.map((img) => {
              const tileClass = activeGridMap[img] ?? "";
              return (
                <div
                  key={img}
                  className={`lm-cell col-span-1 row-span-1 ${tileClass}`}
                >
                  <Image
                    src={`/les-mills/${img}.webp`}
                    alt={`Les Mills ${img}`}
                    fill
                    sizes="25vw"
                    className="object-cover w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="lm-logo-gradient">
          <img src="/les-mills/logo.svg" alt="Les Mills" className="h-12" />
        </div>
      </div>

      <div className="flex flex-col gap-4 text-center mt-2 w-full shrink-0">
        <h1 className="text-[32px] leading-10 font-bold text-black">
          Open phenomenal
          <br />
          Less Mills library
        </h1>
        <p className="text-gray-500 mb-6">
          Add 2000+ studio-quality workouts and over 25 fitness programs to your
          fitness journey.
        </p>
        <button className="bg-black text-white h-[56px] flex items-center justify-center px-4 py-3 rounded-2xl w-full">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default LesMills;
