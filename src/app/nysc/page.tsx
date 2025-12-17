"use client";

import { useState } from "react";
import PromoCodeBanner from "./PromoCodeBanner";

export default function RedeemCodePage() {
  const [email, setEmail] = useState("");

  // Discount state
  const [discountAmount, setDiscountAmount] = useState(70);
  const [fullPrice, setFullPrice] = useState(104);
  const [term, setTerm] = useState("6 months");

  // Free period state
  const [hasFreePeriod, setHasFreePeriod] = useState(true);
  const [freePeriodValue, setFreePeriodValue] = useState("1 year");

  const handleContinue = () => {
    console.log("Continue with email:", email);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center flex-col text-black">
      <div className="min-h-[100vh] w-full grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-16 px-16 py-8 mx-auto md:bg-[url('/nysc/bg.png')] bg-no-repeat bg-right bg-[length:auto_100%] items-center">
        <div className="hidden md:flex flex-col gap-[72px]">
          <div className="flex flex-col gap-8">
            <p className="uppercase text-[#797F91] font-semibold mb-6">
              New York Sports Club & Zing Coach partner program
            </p>
            <h1 className="text-[80px] leading-none font-medium">
              Boost your game with <br />
              Zing personalised plan
            </h1>
            <p className="text-xl">
              Get a special offer to compliment your NYSC plan and achieve
              better results
            </p>
          </div>
          <div className="mt-18">
            <h3 className="font-bold mb-2">Enter your email to continue</h3>

            <div className="flex gap-2">
              {/* Email Input */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m2 7 10 7 10-7" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-4 h-14 rounded-2xl border-2 border-gray-200 focus:border-gray-300 focus:outline-none text-lg placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className="bg-black text-white rounded-2xl h-14 w-auto px-6 font-semibold hover:bg-gray-900 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-6">
          <PromoCodeBanner />
        </div>
      </div>
    </div>
  );
}
