"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Image from "next/image";
import Button from "../Button";

const cards = [
  { id: "plan", label: "Personal plan based on your goals and level" },
  { id: "progress", label: "Progress tracking so you can see results" },
  { id: "ai-coach", label: "AI Coach that adapts workouts to your requests & progress" },
  { id: "reminders", label: "Daily reminders to help you stay consistent" },
]





export default function Features() {
  const { nextStep } = useFunnelContext();


  return (

    <section className="w-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">
        <span className="text-blue-300">Just 5 minutes a day.</span>
        <br />
        That’s all you need to develop a routine that works for you.
      </h2>
      <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth gap-2 pb-2 px-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col h-80 w-80 flex-shrink-0 items-center justify-between gap-4 snap-start rounded-3xl bg-blue-800 border border-blue-700 px-6 pb-6"
          >
            <Image
              src={`/man-funnel/features/${card.id}.png`}
              alt={card.label}
              width={300}
              height={0}
            />
            <p className="text-center text-lg font-semibold">{card.label}</p>
          </div>
        ))}
      </div>
      <Button onClick={nextStep}>Continue With My Plan</Button>
    </section>
  );
}
