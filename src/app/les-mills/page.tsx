"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.css";

const imgs: number[] = Array.from({ length: 16 }, (_, i) => i + 1);
type TileClass = "" | "grow-rb" | "grow-rt" | "grow-lb" | "grow-lt" | "overlayed";
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
      setIteration((prev) => prev < gridMap.length - 1 ? prev + 1 : 0);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-[512px] mx-auto h-screen p-6 flex items-center justify-end flex-col gap-10 bg-grey-200">
      <div className="w-full flex flex-col items-center gap-4">
      <div className="lm-grid grid grid-cols-4 grid-rows-4 w-full gap-1">
        {imgs.map((img) => {
          const tileClass = activeGridMap[img] ?? "";
          return (
            <div key={img} className={`lm-cell col-span-1 row-span-1 ${tileClass}`}>
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
      <img src="/les-mills/logo.svg" alt="Les Mills"/>
      </div>

      <div className="flex flex-col gap-2 text-center mt-2">
        <h1 className="text-3xl font-bold text-black">Join the Ultimate <br/>Fitness Experience</h1>
        <p className="text-gray-500">
          Unlock Les Mills premium library and enjoy studio-quality workouts at home.
        </p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full">
        Get Started
      </button>
    </section>
  );
};

export default LesMills;
