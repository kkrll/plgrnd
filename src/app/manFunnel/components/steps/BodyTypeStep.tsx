"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";
import PrivacyNotice from "../PrivacyNotice";

const bodyTypes = [
  {
    id: "slender",
    label: "Slender",
    image: "/man-funnel/body-type/slender.png",
  },
  {
    id: "athletic",
    label: "Athletic",
    image: "/man-funnel/body-type/athletic.png",
  },
  {
    id: "soft",
    label: "Soft mid-section",
    image: "/man-funnel/body-type/soft.png",
  },
  {
    id: "heavy-build",
    label: "Heavy build",
    image: "/man-funnel/body-type/heavy-build.png",
  },
];

export default function BodyTypeStep() {
  const { updateData, nextStep, funnelData } = useFunnelContext();

  const handleSubmit = (selected: string | string[]) => {
    const bodyType = typeof selected === "string" ? selected : selected[0];
    updateData({ bodyType });
    nextStep();
  };

  return (
    <>
      <section className="w-full p-6 flex-1 flex flex-col pb-32">
        <h2 className="text-2xl font-bold mb-8">
          {funnelData.name}, what best matches your current body type?
        </h2>

        <FormOptions options={bodyTypes} type="radio" onSubmit={handleSubmit} />
      </section>

      <PrivacyNotice show={true} />
    </>
  );
}
