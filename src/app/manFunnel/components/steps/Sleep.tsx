"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import RulerPicker from "../RulerPicker";

const options = [
  { id: "none", label: "Less than 5 hours" },
  { id: "low", label: "5–6 hours" },
  { id: "mid", label: "7–8 hours" },
  { id: "high", label: "More than 8 hours" },
];

export default function Sleep() {
  const { funnelData, nextStep, updateData } = useFunnelContext();
  const tickGroup = 10;
  const defaultIndex = useMemo(() => {
    const fallbackId = "mid";
    const id = funnelData.water?.id ?? fallbackId;
    const index = options.findIndex((option) => option.id === id);
    return index === -1 ? 0 : index;
  }, [funnelData.water?.id]);

  const [selectionIndex, setSelectionIndex] = useState(defaultIndex);

  useEffect(() => {
    setSelectionIndex(defaultIndex);
  }, [defaultIndex]);

  const selectedOption = options[selectionIndex] ?? options[0];

  useEffect(() => {
    updateData({ water: selectedOption });
  }, [selectedOption, updateData]);

  return (
    <>
      <section className="w-full min-h-screen pb-24 flex flex-col">
        <div className="p-6 flex-1 flex flex-col gap-6">
          <h2 className="mb-12">How much sleep do you usually get?</h2>

          <RulerPicker
            min={0}
            max={(options.length - 1) * tickGroup}
            step={1}
            defaultValue={defaultIndex * tickGroup}
            majorEvery={tickGroup}
            snapEvery={tickGroup}
            valueClassName="flex flex-col items-center gap-4 text-2xl font-semibold tracking-normal"
            renderValue={() => (
              <>
                <svg width="34" height="40" viewBox="0 0 34 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.3655 7.52211H20.1433V7.43362L24.477 1.99999C24.8677 1.50442 25.0165 1.22123 25.0165 0.902654C25.0165 0.336283 24.5701 0 23.9376 0H17.9858C17.4093 0 17 0.371681 17 0.920353C17 1.48672 17.4093 1.84071 17.9858 1.84071H21.9661V1.9292L17.5766 7.34513C17.1859 7.823 17.0558 8.08848 17.0558 8.46017C17.0558 8.97345 17.465 9.34512 18.0974 9.34512H24.3655C24.9421 9.34512 25.3512 9.00883 25.3512 8.42477C25.3512 7.87609 24.9421 7.52211 24.3655 7.52211ZM33.0701 14.3009H30.0941V14.2301L33.1817 10.3717C33.535 9.92918 33.6838 9.6637 33.6838 9.32743C33.6838 8.81415 33.256 8.49556 32.6795 8.49556H28.1226C27.6017 8.49556 27.2112 8.84955 27.2112 9.34512C27.2112 9.91149 27.6017 10.2478 28.1226 10.2478H30.801V10.3186L27.7505 14.1416C27.3972 14.5664 27.267 14.8496 27.267 15.2035C27.267 15.6815 27.6576 16.0353 28.2342 16.0353H33.0701C33.6281 16.0353 34 15.7168 34 15.1681C34 14.6372 33.6281 14.3009 33.0701 14.3009ZM24.8677 20.3362H22.3381V20.2654L24.9606 16.9558C25.2955 16.5132 25.4443 16.2655 25.4443 15.9646C25.4443 15.469 25.035 15.1681 24.477 15.1681H20.4782C19.9759 15.1681 19.6039 15.4867 19.6039 15.9823C19.6039 16.5132 19.9759 16.8142 20.4782 16.8142H22.7101V16.9027L20.1247 20.1946C19.79 20.6017 19.6598 20.8673 19.6598 21.2036C19.6598 21.6637 20.0318 22 20.5711 22H24.8677C25.3885 22 25.7419 21.6637 25.7419 21.1681C25.7419 20.6725 25.3885 20.3362 24.8677 20.3362Z" fill="white" />
                  <path d="M15.0578 40C21.3467 40 26.4841 36.3656 28.8224 31.2046C29.1058 30.5686 29.0351 30.0235 28.7162 29.6963C28.4504 29.442 27.9899 29.4056 27.4407 29.5873C26.0058 30.187 24.3583 30.4778 22.4628 30.4778C14.5796 30.4778 9.45985 25.3895 9.45985 17.4483C9.45985 15.4312 9.97359 13.0688 10.5582 11.8331C10.877 11.1971 10.8594 10.6518 10.5936 10.3248C10.3102 9.96134 9.76101 9.88865 9.07013 10.1794C3.63159 12.5963 0 18.2115 0 24.5173C0 33.0764 6.51916 40 15.0578 40Z" fill="white" />
                </svg>

                <span>{selectedOption.label}</span>
              </>
            )}
            onChange={(value) => {
              const nextIndex = Math.round(value / tickGroup);
              setSelectionIndex(nextIndex);
              const option = options[nextIndex] ?? options[0];
              updateData({ water: option });
            }}
          />
        </div>
      </section>

      <Button onClick={nextStep}>Continue With My Plan</Button>
    </>
  );
}
