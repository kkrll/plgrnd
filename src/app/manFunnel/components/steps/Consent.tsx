"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

export default function Consent() {
  const { nextStep, funnelData } = useFunnelContext();

  return (
    <section className="w-full h-full p-6 min-h-screen flex flex-col">
      <div
        className="fixed bottom-0 left-0 right-0 w-full h-full -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(/man-funnel/consent/bg.webp)`,
        }}
      />
      <Logo center />
      <div className="flex flex-1 flex-col items-center">
        <h2 className="text-center mb-6">
          {funnelData.name},ready for your{" "}
          <span className="text-blue-300">personalized Zing plan</span>?
        </h2>
        <p className=" mb-6">
          Tell us about your BMI, activity level, and daily habits — so we can
          personalize your workouts.
        </p>
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
