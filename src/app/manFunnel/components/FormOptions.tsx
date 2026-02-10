"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { useDebouncedAction } from "../hooks/useDebouncedAction";

interface FormOption {
  id: string;
  label: string;
  image?: string;
  icon?: React.ReactNode;
  isRecommended?: boolean;
  secondaryLabel?: string;
  hasRemark?: string;
}

interface FormOptionsProps {
  options: FormOption[];
  type: "radio" | "checkbox";
  onSubmit: (selected: string | string[]) => void;
  defaultSelected?: string | string[];
  selected?: string[];
  narrow?: boolean;
  onSelectionChange?: (selected: string | string[]) => void;
  secondary?: boolean;
}

export default function FormOptions({
  options,
  type,
  onSubmit,
  defaultSelected,
  selected: controlledSelected,
  narrow = false,
  onSelectionChange,
  secondary = false,
}: FormOptionsProps) {
  const [selected, setSelected] = useState<string[]>(() => {
    if (!defaultSelected) return [];
    return Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected];
  });

  // Use controlled selected if provided, otherwise use internal state
  const currentSelected = controlledSelected ?? selected;

  const debouncedAction = useDebouncedAction({ delay: 300 });
  const handleToggle = (id: string) => {
    debouncedAction(() => {
      if (type === "radio") {
        // Radio: immediate action
        onSubmit(id);
      } else {
        // Checkbox: toggle selection
        setSelected((prev) => {
          const newSelected = prev.includes(id)
            ? prev.filter((s) => s !== id)
            : [...prev, id];

          // Notify parent of selection change
          if (onSelectionChange) {
            onSelectionChange(newSelected);
          }

          return newSelected;
        });
      }
    });
  };

  const handleSubmit = () => {
    if (type === "checkbox") {
      onSubmit(currentSelected);
    }
  };

  const isSelected = (id: string) => currentSelected.includes(id);

  const getBgColor = (option: FormOption) => {
    if (option.isRecommended) {
      return isSelected(option.id)
        ? "bg-blue-500"
        : "bg-gradient-to-r from-blue-700 to-grey-800";
    }
    return isSelected(option.id) ? "bg-blue-500" : "bg-grey-800";
  };

  return (
    <div className="w-full flex flex-col flex-1">
      <div className={`flex flex-col gap-2 mb-2 flex-1 ${narrow ? "max-w-[60%]" : ""}`}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleToggle(option.id)}
            className={`pressable font-semibold relative flex gap-3 items-center ${option.image ? "justify-start gap-4" : "justify-between"
              }  transition-all  ${getBgColor(option)}
              } ${option.image ? "pl-2 py-2 pr-4 gap-3 rounded-[32px]" : "px-5 py-4 rounded-2xl"}`}
          >
            {option.image && (
              <div className="relative w-20 h-20 shrink-0 rounded-3xl overflow-hidden">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {option.icon && option.icon}
            <div className="flex flex-col gap-[2px] w-full">
              <div className="flex items-center gap-2 w-full">
                <span className={`text-white w-full font-medium flex-1 text-left ${secondary ? "text-lg" : ""}`}>
                  {option.label}
                </span>
                {option.secondaryLabel && (
                  <span className="font-normal">
                    {option.secondaryLabel}
                  </span>
                )}
              </div>
              {option.isRecommended && (
                <span className="text-xs text-blue-200 font-normal w-full text-left">
                  Recommended based on your profile
                </span>
              )}
              {option.hasRemark && (
                <span className="text-xs text-grey-400 font-normal w-full text-left">
                  {option.hasRemark}
                </span>
              )}
            </div>
            {type === "checkbox" && (
              <div
                className={`w-6 h-6 shrink-0 rounded-lg bg-grey-900 border flex items-center justify-center transition-all ${isSelected(option.id)
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
        <Button onClick={handleSubmit} disabled={currentSelected.length === 0}>
          Continue
        </Button>
      )}
    </div>
  );
}
