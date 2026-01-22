'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full px-4 py-2">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={index} className="flex items-center flex-1">
              {/* Circle indicator */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-green-500' : 'bg-gray-600'
                } ${isCurrent ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-black' : ''}`}
              />
              
              {/* Connecting line */}
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
