'use client';

import { useFunnelContext } from '../../context/FunnelContext';
import Button from '../Button';

export default function NameStep() {
  const { nextStep } = useFunnelContext();

  return (
    <section className="w-full p-6 min-h-screen flex flex-col">
      <h2 className=" mb-6">
      Dima, over 500 000 men in their 40s have already tried Zing AI Coach.
      </h2>
      <h2 className=" mb-6">
      Now it’s your turn.
      </h2>

        <Button
          type="submit"
          onClick={() => {nextStep()}}
        >
          Continue
        </Button>
    </section>
  );
}
