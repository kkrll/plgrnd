"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

export default function NameStep() {
  const { nextStep, funnelData } = useFunnelContext();

  const getAgeGroup = (age?: string) => {
    switch (age) {
      case "18-29":
        return "under 30";
      case "30-39":
        return "in their 30s";
      case "40-49":
        return "in their 40s";
      case "50+":
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
          {funnelData.name}, ready for your
          <br />
          <span className="text-blue-300">personalized Zing plan?</span>
        </h2>
        <p className="text-center text-white/85 mb-4">
          Tell us about your BMI, activity level, and daily habits — so we can
          personalize your workouts.{" "}
        </p>
        <div className="bg-white/10 w-1/2 h-[2px] my-8 mx-auto"></div>
        <p className="text-center text-white/85 mb-4 uppercase text-sm font-semibold">
          Best AI Coach App according to
        </p>
        <div className="flex gap-2 w-full">
          <div className="flex-1 flex justify-center items-center bg-white/10 px-8 py-12 rounded-2xl backdrop-blur-md">
            <img
              src="/man-funnel/feedback-early/tr.webp"
              alt="Techradar"
              className="w-full"
            />
          </div>
          <div className="flex-1 flex justify-center items-center bg-white/10 px-8 py-12 rounded-2xl backdrop-blur-md">
            <img
              src="/man-funnel/feedback-early/mh.svg"
              alt="Men's Health"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        onClick={() => {
          nextStep();
        }}
      >
        I Consent
      </Button>
    </section>
  );
}
