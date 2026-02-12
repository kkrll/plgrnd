'use client';

import { useState, useRef, useEffect } from 'react';
import { useFunnelContext } from '../../context/FunnelContext';
import Input from '../Input';
import Button from '../Button';

export default function NameStep() {
  const { updateData, nextStep } = useFunnelContext();
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Timeout trick to open keyboard on mobile
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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

      <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1">
        <Input
          ref={inputRef}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9678 21.9472C17.4207 21.9472 21.9355 17.4324 21.9355 11.9795C21.9355 6.53631 17.4109 2.01172 11.958 2.01172C6.51482 2.01172 2 6.53631 2 11.9795C2 17.4324 6.52459 21.9472 11.9678 21.9472Z" fill="#4F535E"/>
              <path d="M7.36564 17.0993C6.95521 17.0993 6.76953 16.8355 6.76953 16.4642C6.76953 15.3697 8.43082 12.5064 11.9684 12.5064C15.506 12.5064 17.1673 15.3697 17.1673 16.4642C17.1673 16.8355 16.9817 17.0993 16.5711 17.0993H7.36564ZM11.9684 11.6757C10.5416 11.6659 9.37875 10.4639 9.37875 8.84174C9.37875 7.3368 10.5416 6.08594 11.9684 6.08594C13.3952 6.08594 14.5581 7.3368 14.5581 8.84174C14.5581 10.4639 13.3952 11.6855 11.9684 11.6757Z" fill="black"/>
            </svg>
          }
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Preferred first name"
          hint="We could call you 'Legend,' but let's use your real name"
          enterKeyHint="done"
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) {
              e.preventDefault();
              updateData({ name: name.trim() });
              nextStep();
            }
          }}
        />
        <Button
          type="submit"
          disabled={!name.trim()}
        >
          Continue
        </Button>
      </form>
    </section>
  );
}
