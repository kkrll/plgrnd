"use client";

import PromoBg from "./promoBg";
import { Logo } from "./logo";
import Image from "next/image";
import "./styles.css";

export default function PromoCodeBanner() {
  return (
    <div className="relative z-20 mx-6 mt-4 text-white">
      <div
        className="promo-mask h-[420px] md:h-[360px] max-w-[396px] rounded-3xl overflow-hidden"
        style={{
          mask: `
        radial-gradient(circle 14px at 0% var(--mask-y), transparent 99%, black),
        radial-gradient(circle 14px at 100% var(--mask-y), transparent 99%, black)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <PromoBg />
        </div>

        {/* Content */}
        <div className="relative  gap-0 z-10 w-full grid grid-rows-3 md:grid-rows-[1.5fr_1fr] h-full">
          <div className="flex w-full items-center justify-around gap-2 px-4 pt-4 h-full ">
            <Image
              src="/nysc/nysc.png"
              alt="NYSC Promo"
              width={80}
              height={48}
              className="h-12 md:h-16 w-auto"
            />
            <div className="w-[1px] h-12 bg-white/25" />
            <Logo className="h-12 md:h-16 w-auto" />
          </div>

          <h3 className="flex md:hidden text-2xl font-semibild px-4 text-center h-full items-center justify-center pb-8">
            Boost your game with Zing personalised plan
          </h3>

          {/* <div className="flex items-center gap-2 w-full my-8">
            <svg viewBox="0 0 12 24" className="w-3 h-6">
              <circle cx="0" cy="12" r="12" fill="white" />
            </svg>
            <div className="h-[1px] opacity-50 w-full border-t-2 border-dashed border-white/24" />
            <svg viewBox="0 0 12 24" className="w-3 h-6">
              <circle cx="12" cy="12" r="12" fill="white" />
            </svg>
          </div> */}

          <div
            className={`flex flex-col h-full justify-center w-full px-6 gap-1 border-t-2 border-white/25 border-dashed`}
          >
            <div className={`flex gap-4 py-3 items-center`}>
              <div className="flex flex-col w-3/4 text-lg">
                <p className="uppercase">{`1 month`}</p>
                <p>of unlimited access</p>
              </div>
              <div className="flex w-1/4 justify-center items-center text-5xl font-semibold">
                $0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
