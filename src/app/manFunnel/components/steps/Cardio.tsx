"use client";

import { useEffect, useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

export default function CardioStep() {
    const { nextStep, updateData } = useFunnelContext();
    const [shouldAdvance, setShouldAdvance] = useState(false);

    useEffect(() => {
        if (shouldAdvance) {
            nextStep();
            setShouldAdvance(false);
        }
    }, [shouldAdvance, nextStep]);

    return (
        <section className="w-full p-6 flex flex-col overflow-hidden">
            <h2 className="mb-2">Should Zing add cardio exercises to your plan?</h2>

            <div className="flex-1 flex items-start justify-start my-4">
                <div className="w-auto max-w-full rounded-[40px] overflow-hidden">
                    <video
                        src="/man-funnel/cardio/cardio-c.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div className="flex-shrink-0">
                <Button
                    className="bg-grey-800 mb-2"
                    type="submit"
                    onClick={() => {
                        updateData({ cardio: false });
                        setShouldAdvance(true);
                    }}
                >
                    Not Now
                </Button>
                <Button
                    type="submit"
                    onClick={() => {
                        updateData({ cardio: true });
                        setShouldAdvance(true);
                    }}
                >
                    Yes
                </Button>
            </div>
        </section>
    );
}
