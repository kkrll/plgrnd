"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";

export default function TestimonyStep() {
  const { nextStep, funnelData } = useFunnelContext();

  return (
    <>
      <section className="w-full min-h-screen pb-24 flex flex-col">
        <div className="p-6 flex-1">
          {/* Testimonial Content */}
          <div className="mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Zing has truly transformed my fitness journey
            </h1>

            {/* Quotation marks and testimonial text */}
            <div className="relative">
              {/* Opening quote */}
              <div className="text-blue-500 text-6xl md:text-7xl font-bold leading-none">
                "
              </div>

              {/* Testimonial text */}
              <p className="text-white text-lg md:text-xl leading-relaxed pl-2">
                This AI-generated workout app has become my ultimate companion. It's not just an app; it's a coach, a friend, and a beacon of inspiration. Thank you Zing, for empowering me to become the strongest version of myself.
              </p>

              {/* Closing quote */}
              <div className="text-blue-500 text-6xl md:text-7xl font-bold leading-none text-right">
                "
              </div>

              {/* Attribution */}
              <p className="text-white text-lg font-semibold">— Rivky</p>
            </div>
          </div>

          {/* Before photo */}
          <div className="relative rounded-2xl overflow-hidden aspect-auto">
            <img
              src="/man-funnel/testimony/testimony.webp"
              alt="Before transformation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Button onClick={nextStep}>Continue</Button>
    </>
  );
}
