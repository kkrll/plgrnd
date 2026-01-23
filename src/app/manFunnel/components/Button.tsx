'use client';

import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDebouncedAction } from '../hooks/useDebouncedAction';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  sticky?: boolean;
}

export default function Button({
  children,
  className = '',
  onClick,
  sticky = true,
  type,
  ...buttonProps
}: ButtonProps) {
  const [isMounted, setIsMounted] = useState(false);
  const debouncedAction = useDebouncedAction({ delay: 300 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      e.preventDefault();
      debouncedAction(onClick);
    }
  };

  const renderButton = () => (
    <button
      {...buttonProps}
      type={type}
      onClick={onClick ? handleClick : undefined}
      className={`w-full pressable py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-2xl font-semibold transition-all duration-100 ${className}`}
    >
      {children}
    </button>
  );

  // Don't use sticky for submit buttons inside forms - they need to stay in the form
  const shouldUseSticky = sticky && type !== 'submit';

  if (shouldUseSticky) {
    if (!isMounted) {
      // Return null during SSR
      return null;
    }
    
    return createPortal(
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto p-6 bg-gradient-to-t from-black via-black/95 to-transparent pt-8 pointer-events-none z-[100]">
        <div className="pointer-events-auto">
          {renderButton()}
        </div>
      </div>,
      document.body
    );
  }

  return renderButton();
}
