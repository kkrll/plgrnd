'use client';

import { useState } from 'react';
import { useFunnelContext } from '../../context/FunnelContext';

export default function NameStep() {
  const { updateData, nextStep } = useFunnelContext();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateData({ name: name.trim() });
      nextStep();
    }
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
      <h2 className=" mb-6">
        What should we call you?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            👤
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Preferred first name"
            className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            autoFocus
          />
        </div>

        <p className="text-gray-400 text-sm">
          We could call you 'Legend,' but let's use your real name
        </p>

       
      </form>
      <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
        >
          Continue
        </button>
    </section>
  );
}
