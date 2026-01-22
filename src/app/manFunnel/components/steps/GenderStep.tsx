'use client';

import { useFunnelContext } from '../../context/FunnelContext';

const genders = [
  { id: 'male' as const, label: 'Male', image: '/man-funnel/gender/male.png' },
  { id: 'female' as const, label: 'Female', image: '/man-funnel/gender/female.png' },
];

export default function GenderStep() {
  const { updateData, nextStep } = useFunnelContext();

  const handleSelect = (gender: 'male' | 'female') => {
    updateData({ gender });
    nextStep();
  };

  return (
    <section className="w-full p-6 min-h-screen flex flex-col">
      <div className="mb-4">
        <img 
          src="/man-funnel/logo.svg" 
          alt="Logo" 
          className="h-12 w-auto"
        />
      </div>
      <h2 className="mb-2">
        Who are we building the custom plan for?
      </h2>
      <p className="mb-8">
        Some aspects of your plan adapt based on gender-specific physiology
      </p>

      <div className="flex flex-col gap-4 flex-1">
        {genders.map((gender) => (
          <button
            key={gender.id}
            onClick={() => handleSelect(gender.id)}
            style={{
              backgroundImage: `url(${gender.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className="pressable relative group rounded-3xl h-40 overflow-hidden border border-grey-700 hover:border-blue-500 transition-all flex items-center justify-between p-1"
          >
            <div className="flex flex-col items-center justify-center gap-4 h-full bg-white/10 rounded-[20px] w-36 backdrop-blur">
              <span className="text-white font-semibold text-xl">{gender.label}</span>
              <div className={`h-8 w-8 flex items-center justify-center rounded-3xl ${
                gender.id === "male" ? "bg-blue-500" : "bg-tangerine-500"
              }`} >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.33333 13.3346L14.6667 8.0013M9.33333 2.66797L14.6667 8.0013M14.6667 8.0013L1.33333 8.0013" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
