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
    // Add your logic here
  };

  return (
    <div className="min-h-screen bg-white flex justify-center flex-col text-black">
      {/* Content Container */}
      <div className="flex-1 px-6 py-8 max-w-[411px] mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Code applied!</h1>
          <h2 className="text-3xl font-bold">Here's your offer:</h2>
        </div>

        {/* Promo Banner with Shader */}
        <div className="-mx-6">
          <PromoCodeBanner
            discount={{ amount: discountAmount, fullPrice, term }}
            freePeriod={hasFreePeriod ? { period: freePeriodValue } : undefined}
          />
        </div>

        {/* Control Panel for Banner Props */}
        <div className="my-8 p-6 bg-gray-50 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Banner Settings</h3>

          {/* Discount Settings */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Discount %
                </label>
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Price ($)
                </label>
                <input
                  type="number"
                  value={fullPrice}
                  onChange={(e) => setFullPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Term</label>
                <input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Free Period Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="freePeriod"
                checked={hasFreePeriod}
                onChange={(e) => setHasFreePeriod(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <label htmlFor="freePeriod" className="text-sm font-semibold">
                Include Free Period
              </label>
            </div>

            {/* Free Period Input */}
            {hasFreePeriod && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Free Period
                </label>
                <input
                  type="text"
                  value={freePeriodValue}
                  onChange={(e) => setFreePeriodValue(e.target.value)}
                  placeholder="e.g., 1 YEAR"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-gray-400 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Email Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">
            Enter your email to continue
          </h3>

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
                className="w-full pl-14 pr-4 py-5 rounded-2xl border-2 border-gray-200 focus:border-gray-300 focus:outline-none text-lg placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-black text-white py-5 rounded-2xl text-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
