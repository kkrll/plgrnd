'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useDebouncedAction } from '../hooks/useDebouncedAction';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  className = '',
  onClick,
  ...buttonProps
}: ButtonProps) {
  const debouncedAction = useDebouncedAction({ delay: 300 });

  const handleClick = () => {
    if (onClick) {
      debouncedAction(onClick);
    }
  };

  return (
    <button
      {...buttonProps}
      onMouseUp={handleClick}
      className={`w-full pressable py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-2xl font-semibold transition-all duration-100 ${className}`}
    >
      {children}
    </button>
  );
}
