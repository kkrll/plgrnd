"use client";

import { useFunnelContext } from "../../context/FunnelContext";
import Button from "../Button";
import Logo from "../Logo";

export default function NameStep() {
    const { nextStep, funnelData } = useFunnelContext();

    return (
        <section className="w-full h-screen p-6 flex flex-col overflow-hidden">
            <Logo center />

            <div className="flex flex-col items-center flex-shrink-0">
                <h2 className="text-center mb-2">
                    You can get more precise evaluation with{" "}
                    <span className="text-blue-300">Body Scan</span>
                </h2>
                <p className="text-center mb-8">That help to tailor more specific plan for you and track your progress</p>
            </div>

            <div className="flex-1 flex items-center justify-center mb-4 overflow-hidden">
                <div className="video-container h-full">
                    <video
                        src="/man-funnel/body-scan/body-scan_c.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-auto max-w-full object-contain"
                    />
                </div>
            </div>

            <div className="flex-shrink-0">
                <Button
                    type="submit"
                    onClick={() => {
                        nextStep();
                    }}
                >
                    Continue
                </Button>
            </div>
        </section>
    );
}
