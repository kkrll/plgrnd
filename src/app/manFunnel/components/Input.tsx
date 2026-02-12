"use client";

import { ReactNode, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> {
  icon?: ReactNode;
  hint?: ReactNode;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, hint, placeholder, ...inputProps },
  ref
) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-[30px] -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        {...inputProps}
        placeholder={placeholder}
        className={`w-full ${icon ? "pl-12" : "pl-4"} pr-4 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
      />
      {hint && <p className="text-gray-400 text-sm mt-2">{hint}</p>}
    </div>
  );
});

export default Input;
