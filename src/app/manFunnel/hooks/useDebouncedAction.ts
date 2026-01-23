import { useCallback, useRef } from 'react';

interface UseDebouncedActionOptions {
  delay?: number;
}

export function useDebouncedAction<T extends any[]>({
  delay = 300,
}: UseDebouncedActionOptions = {}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedAction = useCallback(
    (action: (...args: T) => void, ...args: T) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Wait for the delay before triggering the action
      timeoutRef.current = setTimeout(() => {
        action(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [delay]
  );

  return debouncedAction;
}
