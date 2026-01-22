'use client';

interface ProgressBarProps {
  currentSection: number;
  sectionProgress: number; // 0-1, progress within current section
}

export default function ProgressBar({ currentSection, sectionProgress }: ProgressBarProps) {
  const totalSections = 4;

  return (
    <div className="w-full px-4 py-2">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSections }).map((_, sectionIndex) => {
          const isCompleted = sectionIndex < currentSection;
          const isCurrent = sectionIndex === currentSection;
          const isUpcoming = sectionIndex > currentSection;
          
          return (
            <div key={sectionIndex} className="flex items-center flex-1">
              {/* Circle indicator */}
              {isCompleted ? (
                // Completed section - green circle with checkmark
                <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : isCurrent ? (
                // Current section - green circle (no checkmark yet)
                <div className="w-3 h-3 rounded-full bg-green-500" />
              ) : (
                // Upcoming section - grey circle
                <div className="w-3 h-3 rounded-full bg-gray-600" />
              )}
              
              {/* Connecting line */}
              {sectionIndex < totalSections - 1 && (
                <div className="flex-1 h-0.5 mx-1 relative overflow-hidden">
                  {isCompleted ? (
                    // Fully completed - green line
                    <div className="absolute inset-0 bg-green-500" />
                  ) : isCurrent ? (
                    // Partially completed - green portion based on progress
                    <>
                      <div 
                        className="absolute inset-0 bg-green-500 transition-all duration-300"
                        style={{ width: `${sectionProgress * 100}%` }}
                      />
                      <div className="absolute inset-0 bg-gray-600" />
                    </>
                  ) : (
                    // Upcoming - grey line
                    <div className="absolute inset-0 bg-gray-600" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
