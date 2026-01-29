"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

export default function NameStep() {
  const { nextStep, funnelData } = useFunnelContext();

  const getAgeGroup = (age?: string) => {
    switch (age) {
      case ("18-29"):
        return "under 30";
      case ("30-39"):
        return "in their 30s";
      case ("40-49"):
        return "in their 40s";
      case ("50+"):
        return "over 50";
      default:
        return "";
    }
  };

  return (
    <section className="w-full h-full p-6 min-h-screen flex flex-col">
      <div
        className="fixed bottom-0 left-0 right-0 w-full h-full -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(/man-funnel/feedback-early/bg.webp)`,
        }}
      />
      <Logo center />
      <div className="flex flex-1 flex-col justify-center items-center">
        <h2 className="text-center mb-6">
          {funnelData.name},{" "}
          <span className="text-blue-300">over 500k men{" "}{getAgeGroup(funnelData.age)}</span> have already tried{" "}
          <br />
          Zing AI Coach.
        </h2>
        <h2 className="">Now it’s your turn.</h2>

        <div className="bg-white/10 w-1/2 h-[2px] my-8 mx-auto"></div>
        <p className="text-center text-white/85 mb-4 uppercase text-sm font-semibold">Best AI Coach App according to</p>
        <div className="flex gap-2 w-full">
          <div className="flex-1 flex justify-center items-center bg-white/10 py-4 rounded-2xl backdrop-blur-md">
            <img src="/man-funnel/feedback-early/tr.webp" alt="Techradar" className="h-4" />
          </div>
          <div className="flex-1 flex justify-center items-center bg-white/10 py-4 rounded-2xl backdrop-blur-md">
            <img src="/man-funnel/feedback-early/mh.svg" alt="Men's Health" className="h-4" />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        onClick={() => {
          nextStep();
        }}
      >
        I Want to Try
      </Button>
    </section>
  );
}
