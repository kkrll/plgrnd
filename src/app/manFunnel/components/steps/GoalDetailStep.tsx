'use client';

import { useFunnelContext } from '../../context/FunnelContext';

export default function GoalDetailStep() {
  const { funnelData, previousStep } = useFunnelContext();

  return (
    <section className="w-full p-6 min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={previousStep}
          className="text-white text-xl"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold uppercase">GOALS</h1>
      </div>

      <h2 className="text-3xl font-bold mb-8">
        The right balance of <span className="text-blue-500">training</span>,{' '}
        <span className="text-blue-500">recovery</span>, and{' '}
        <span className="text-blue-500">intensity</span> for a{' '}
        <span className="text-blue-500">toned body</span>
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">BODY TONE AND ENERGY</h3>
        <div className="relative h-32 bg-gray-900 rounded-lg p-4">
          <div className="flex items-end justify-between h-full">
            <span className="text-xs text-gray-400">SOFT LOOK</span>
            <div className="flex-1 mx-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-blue-600 to-purple-600 rounded opacity-50" />
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    👤
                  </div>
                </div>
                <div className="mt-2 text-xs text-blue-400 text-center whitespace-nowrap">
                  Intelligently optimized activity level
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-400">BULKY LOOK</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          *Illustrative graphic based on Zing user data. Individual results may vary.
        </p>
      </div>

      <div className="mt-auto">
        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
          Build My Toning Plan
        </button>
      </div>
    </section>
  );
}
