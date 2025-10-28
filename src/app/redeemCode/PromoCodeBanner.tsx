"use client";

import { useState } from "react";
import PromoBg from "./promoBg";

const PROMO_TIMER_DURATION = 8 * 60 + 17; // 8 minutes 17 seconds in total seconds

export default function PromoCodeBanner({
  discount,
  freePeriod,
}: {
  discount: { amount: number; fullPrice: number; term?: string };
  freePeriod?: { period: string };
}) {
  return (
    <div className="relative z-20 mx-6 mt-4 text-[#061338]">
      <div className="relative rounded-2xl py-4 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <PromoBg />
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-1 z-10">
          <div className="w-full flex items-center justify-between px-6">
            <span className="text-sm font-semibold">Promo code:</span>
            <div className="flex gap-2">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.89164 1.28297C8.06531 1.08901 8.27793 0.933856 8.51562 0.827632C8.75332 0.721408 9.01074 0.666504 9.27109 0.666504C9.53144 0.666504 9.78886 0.721408 10.0266 0.827632C10.2643 0.933856 10.4769 1.08901 10.6505 1.28297L11.2986 2.00695C11.4838 2.21387 11.7132 2.37647 11.9698 2.48272C12.2264 2.58897 12.5036 2.63615 12.7808 2.62076L13.7529 2.56707C14.0129 2.55273 14.273 2.59341 14.5163 2.68642C14.7595 2.77944 14.9804 2.92272 15.1644 3.1069C15.3485 3.29107 15.4917 3.51201 15.5846 3.75527C15.6775 3.99854 15.7181 4.25867 15.7036 4.51867L15.6499 5.48984C15.6347 5.76697 15.6819 6.04397 15.7882 6.30037C15.8944 6.55678 16.0569 6.78601 16.2637 6.97113L16.9877 7.6192C17.1818 7.79287 17.3371 8.00555 17.4434 8.24333C17.5497 8.48111 17.6047 8.73865 17.6047 8.99912C17.6047 9.25958 17.5497 9.51712 17.4434 9.7549C17.3371 9.99268 17.1818 10.2054 16.9877 10.379L16.2637 11.0271C16.0568 11.2123 15.8942 11.4417 15.7879 11.6983C15.6817 11.9548 15.6345 12.232 15.6499 12.5093L15.7036 13.4814C15.7179 13.7414 15.6773 14.0015 15.5842 14.2447C15.4912 14.488 15.3479 14.7088 15.1638 14.8929C14.9796 15.077 14.7587 15.2202 14.5154 15.3131C14.2721 15.406 14.012 15.4465 13.752 15.4321L12.7808 15.3784C12.5037 15.3631 12.2267 15.4104 11.9703 15.5166C11.7139 15.6229 11.4847 15.7854 11.2995 15.9922L10.6515 16.7162C10.4778 16.9103 10.2651 17.0656 10.0273 17.1719C9.78956 17.2782 9.53202 17.3332 9.27155 17.3332C9.01109 17.3332 8.75355 17.2782 8.51577 17.1719C8.27799 17.0656 8.06531 16.9103 7.89164 16.7162L7.24357 15.9922C7.05835 15.7853 6.82897 15.6227 6.57239 15.5164C6.31582 15.4102 6.03863 15.363 5.76135 15.3784L4.78926 15.4321C4.52925 15.4464 4.26914 15.4058 4.02592 15.3127C3.7827 15.2197 3.56183 15.0764 3.37774 14.8923C3.19365 14.7081 3.05048 14.4871 2.95758 14.2439C2.86467 14.0006 2.82412 13.7405 2.83858 13.4805L2.89228 12.5093C2.90752 12.2322 2.86028 11.9552 2.75403 11.6988C2.64778 11.4424 2.48526 11.2131 2.27847 11.028L1.55449 10.38C1.36037 10.2063 1.20509 9.99361 1.09877 9.75582C0.992453 9.51804 0.9375 9.26051 0.9375 9.00004C0.9375 8.73957 0.992453 8.48204 1.09877 8.24426C1.20509 8.00648 1.36037 7.7938 1.55449 7.62012L2.27847 6.97206C2.48538 6.78684 2.64798 6.55745 2.75424 6.30088C2.86049 6.04431 2.90767 5.76712 2.89228 5.48984L2.83858 4.51774C2.82438 4.25781 2.86515 3.99781 2.95823 3.75469C3.05131 3.51158 3.19461 3.29083 3.37877 3.10684C3.56293 2.92286 3.78382 2.77977 4.02702 2.68692C4.27022 2.59407 4.53026 2.55355 4.79018 2.56799L5.76135 2.62169C6.03848 2.63694 6.31549 2.58969 6.57189 2.48344C6.82829 2.3772 7.05753 2.21467 7.24265 2.00788L7.89164 1.28297Z"
                  stroke="#061338"
                  stroke-width="1.875"
                />
                <path
                  d="M6.95654 6.68506H6.9658V6.69432H6.95654V6.68506ZM11.5856 11.3141H11.5948V11.3234H11.5856V11.3141Z"
                  stroke="#061338"
                  stroke-width="2.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0487 6.22217L6.4939 11.777"
                  stroke="#061338"
                  stroke-width="1.875"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="text-sm font-semibold">Mighty_muscle</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <svg viewBox="0 0 12 24" className="w-3 h-6">
              <circle cx="0" cy="12" r="12" fill="white" />
            </svg>
            <div className="h-[1px] opacity-50 w-full border-t-2 border-dashed border-[#8CA5F2]" />
            <svg viewBox="0 0 12 24" className="w-3 h-6">
              <circle cx="12" cy="12" r="12" fill="white" />
            </svg>
          </div>

          <div className={`flex flex-col w-full px-6 gap-1`}>
            <div
              className={`flex gap-4 ${
                freePeriod ? "py-3" : "py-1"
              } items-center`}
            >
              <div className="flex flex-col w-3/4 font-semibold">
                <p className="uppercase">
                  {freePeriod ? freePeriod.period : `${discount.amount}% off`}
                </p>
                <p>
                  {freePeriod ? `of unlimited access` : `for ${discount.term}`}
                </p>
              </div>
              {freePeriod ? (
                <div className="flex w-1/4 justify-center items-center text-5xl font-semibold">
                  $0
                </div>
              ) : (
                <div className="flex flex-col w-1/4 justify-center items-center gap-1">
                  <div className="text-5xl font-semibold">
                    $
                    {Math.floor(
                      (discount.fullPrice * (100 - discount.amount)) / 100
                    )}
                  </div>
                  <div className="text-xs font-semibold line-through">
                    ${discount.fullPrice}
                  </div>
                </div>
              )}
            </div>

            {freePeriod && (
              <div className="flex gap-2 text-[#5177EB] items-center text-xs text-nowrap">
                Additional offer
                <div className="w-full border-[1px] h-[1px] border-[#8CA5F2] opacity-25" />
              </div>
            )}
            {freePeriod && (
              <div className="flex gap-4 items-center">
                <div className="flex flex-col w-3/4 text-xs font-semibold">
                  <p>{`Then ${discount.amount}% OFF`}</p>
                  <p>
                    {discount.term
                      ? `for ${discount.term}`
                      : "any subscription forever"}
                  </p>
                </div>
                <div className="flex flex-col w-1/4 justify-center items-center">
                  <div className="text-xl font-semibold">
                    $
                    {Math.floor(
                      (discount.fullPrice * (100 - discount.amount)) / 100
                    )}
                  </div>
                  <div className="text-xs font-semibold line-through">
                    ${discount.fullPrice}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
