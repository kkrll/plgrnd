"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "./Button";

interface FormOption {
  id: string;
  label: string;
  image?: string;
}

interface FormOptionsProps {
  options: FormOption[];
  type: "radio" | "checkbox";
  onSubmit: (selected: string | string[]) => void;
  defaultSelected?: string | string[];
}

export default function FormOptions({
  options,
  type,
  onSubmit,
  defaultSelected,
}: FormOptionsProps) {
  const [selected, setSelected] = useState<string[]>(() => {
    if (!defaultSelected) return [];
    return Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected];
  });

  const handleToggle = (id: string) => {
    if (type === "radio") {
      // Radio: immediate action
      onSubmit(id);
    } else {
      // Checkbox: toggle selection
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
      );
    }
  };

  const handleSubmit = () => {
    if (type === "checkbox") {
      onSubmit(selected);
    }
  };

  const isSelected = (id: string) => selected.includes(id);

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="flex flex-col gap-2 mb-6 flex-1">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleToggle(option.id)}
            className={`pressable relative flex items-center ${
              option.image ? "justify-start gap-4" : "justify-between"
            }  transition-all  ${
              isSelected(option.id) ? "bg-blue-500" : "bg-grey-800 "
            } ${option.image ? "pl-2 py-2 rounded-3xl" : "px-5 py-4 rounded-2xl"}`}
          >
            {option.image && (
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-white font-medium flex-1 text-left">
              {option.label}
            </span>
            {!option.image && (
              <div
                className={`w-6 h-6 rounded-lg bg-grey-900 border flex items-center justify-center transition-all ${
                  isSelected(option.id)
                    ? "border-transparent"
                    : "border-grey-700"
                }`}
              >
                {isSelected(option.id) && (
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M1 5.5L5 9.5L13 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {type === "checkbox" && (
        <Button onClick={handleSubmit} disabled={selected.length === 0}>
          Continue
        </Button>
      )}
    </div>
  );
}
