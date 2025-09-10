"use client";

import heroBg from "./heroBg";

const PsgHeader = () => {
  return (
    <div className="h-screen w-screen">
      {heroBg()}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
        <h1 className="text-white text-[160px] font-bold">PSG x ZING</h1>
      </div>
    </div>
  );
};

export default PsgHeader;
