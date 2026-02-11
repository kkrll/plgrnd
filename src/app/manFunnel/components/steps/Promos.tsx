"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

export default function Promos() {
  const { nextStep } = useFunnelContext();

  return (
    <section className="w-full h-full p-6 min-h-screen flex flex-col">
      <div
        className="fixed bottom-0 left-0 right-0 w-full h-full -z-10 bg-cover bg-top"
        style={{
          backgroundImage: `url(/man-funnel/promos/bg.webp)`,
        }}
      />
      <Logo center />
      <div className="flex flex-1 flex-col items-center justify-center text-center gap-4">
        <h2>
          May we send product updates to your email —{" "}
          <span className="text-blue-300">expert tips</span>,{" "}
          <span className="text-blue-300">promotions</span>,{" "}
          <span className="text-blue-300">special offers</span>?
        </h2>
        <p className="">
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
        Yes, proceed to my plan
      </Button>
      <Button
        type="submit"
        className="bg-transparent mt-2"
        onClick={() => {
          nextStep();
        }}
      >
        No, send my program only
      </Button>
    </section>
  );
}
