"use client";

interface UnitToggleOption<T extends string> {
  value: T;
  label: string;
}

export default function UnitToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: [UnitToggleOption<T>, UnitToggleOption<T>];
}) {
  return (
    <div className="w-full bg-[#1a1a1a] rounded-full p-1 flex gap-1">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              active ? "bg-[#1a4ce6] text-white" : "text-gray-300 hover:bg-[#252525]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

