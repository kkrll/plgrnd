"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

export default function NameStep() {
  const { nextStep, funnelData } = useFunnelContext();

  return (
    <section className="w-full h-full p-6 min-h-screen flex flex-col">
      <div
        className="fixed bottom-0 left-0 right-0 w-full h-full -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(/man-funnel/feedback-early/bg.png)`,
        }}
      />
      <Logo center />
      <div className="flex flex-1 flex-col justify-center items-center">
        <h2 className="text-center mb-6">
          {funnelData.name},{" "}
          <span className="text-blue-300">over 500 000 men</span> in{" "}
          <span className="text-blue-300">their 40s</span> have already tried{" "}
          <br />
          Zing AI Coach.
        </h2>
        <h2 className=" mb-6">Now it’s your turn.</h2>
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
