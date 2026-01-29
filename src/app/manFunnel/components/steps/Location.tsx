"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";

const options = [
    { id: "home", label: "Home", image: "/man-funnel/location/home.png" },
    { id: "gym", label: "Gym", image: "/man-funnel/location/gym.png" },
    { id: "mixed", label: "Mixed", image: "/man-funnel/location/mixed.png" },
];

export default function LocationStep() {
    const { updateData, nextStep } = useFunnelContext();
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string | string[]) => {
        const selectedId = Array.isArray(id) ? id[0] : id;
        setSelected(selectedId);
        updateData({ location: { id: selectedId, label: options.find(option => option.id === selectedId)?.label ?? "" } });

        // Wait 3 seconds before moving to next step
        setTimeout(() => {
            nextStep();
        }, 3000);
    };

    return (
        <>
            <section className="w-full p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-8">
                    Where do you want to train?
                </h2>

                <FormOptions
                    options={options}
                    type="radio"
                    onSubmit={handleSelect}
                />
            </section>

            {/* Hint message - bottom panel */}
            <div
                className={`bottom-thing ${selected ? "animate-in" : ""}`}
                style={{ display: selected ? "flex" : "none" }}
            >
                <span className="pt-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.3">
                            <path d="M4 20.5478C4 16.6597 6.26215 13.4904 9.06627 13.4904H11.2224C13.9087 10.215 15.5582 7.83499 16.9367 5.18403C17.6789 3.77019 18.433 3.19287 19.5523 3.19287C21.0722 3.19287 22.1797 4.32395 22.1797 5.91452C22.1797 8.2238 20.2474 11.0986 20.2474 12.3239C20.2474 12.5478 20.4124 12.6656 20.6716 12.6656H24.972C26.6686 12.6656 28 14.0088 28 15.7054C28 16.3887 27.8115 17.0368 27.4934 17.4963C27.7172 17.9086 27.8468 18.4742 27.8468 19.0044C27.8468 19.8291 27.5523 20.6185 27.0221 21.1605C27.187 21.5257 27.2813 21.9852 27.2813 22.4447C27.2813 23.3873 26.8454 24.2474 26.0677 24.8365C26.1384 25.0957 26.1856 25.3549 26.1856 25.6494C26.1856 27.0397 25.1959 28.1354 23.6171 28.5242C22.8041 28.7245 21.5788 28.807 20.1649 28.807H18.5862C16.5596 28.807 14.7452 28.3475 13.2489 27.5581H9.49043C6.48601 27.5581 4 24.3534 4 20.5478ZM10.6333 20.4889C10.6333 24.3181 13.8616 27.0751 18.7158 27.0751H20.1767C21.461 27.0751 22.5331 27.0044 23.2047 26.8394C24.0295 26.6273 24.43 26.1914 24.43 25.6494C24.43 25.3549 24.3947 25.2488 24.1119 24.5419C24.0059 24.2945 24.0648 24.0824 24.324 23.9292C25.1487 23.5051 25.5376 23.0456 25.5376 22.4447C25.5376 22.0323 25.3962 21.7849 25.1016 21.2547C24.9367 20.9013 25.0545 20.6067 25.3373 20.3829C25.8557 19.994 26.1031 19.5345 26.1031 19.0044C26.1031 18.5566 25.9499 18.2267 25.5847 17.6848C25.408 17.4609 25.4315 17.2253 25.6436 17.0368C26.0795 16.589 26.2563 16.2474 26.2563 15.7054C26.2563 14.9631 25.7025 14.4094 24.972 14.4094H20.919C19.5641 14.4094 18.5037 13.62 18.5037 12.3239C18.5037 10.5331 20.4359 7.75252 20.4359 5.91452C20.4359 5.27829 20.106 4.93661 19.623 4.93661C19.2106 4.93661 18.9278 5.12512 18.5037 5.98521C16.7953 9.37844 14.4271 12.1119 12.7187 14.3976C11.187 16.4594 10.6333 18.0265 10.6333 20.4889ZM5.74374 20.5478C5.74374 23.3991 7.49926 25.8026 9.49043 25.8026H10.9985C9.64359 24.4005 8.88954 22.5625 8.88954 20.4535C8.88954 18.4624 9.25479 16.8129 10.0913 15.2341H9.06627C7.32253 15.2341 5.74374 17.6141 5.74374 20.5478Z" fill="#F3F4F7" />
                        </g>
                    </svg>

                </span>

                <p className="text-white text-[14px]">
                    Perfect —  your workouts will fit your setup perfectly
                </p>
            </div>
        </>
    );
}
