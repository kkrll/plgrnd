"use client";

import { useState } from "react";
// Page.tsx
import RulerPicker from "./RulerPicker";

export default function HeightPage() {
  const [preset, setPreset] = useState<number | null>(null);
  return (
    <div className="bg-black min-h-screen flex items-center justify-center flex-col">
      <RulerPicker
        min={32}
        max={250}
        defaultValue={65}
        presetValue={preset}
        unit="kg"
        onChange={(val) => console.log(val)}
      />

      <button
        onClick={() => {
          preset ? setPreset(null) : setPreset(80);
        }}
      >
        {!preset ? "Highlight the differense" : "Hide differense"}
      </button>
    </div>
  );
}
