"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";
import Button from "../Button";
import { Divider } from "../Divider";

const options = [
    { id: "treadmill", label: "Treadmill", image: "/man-funnel/cardio-equipment/treadmill.webp" },
    { id: "stationary-bike", label: "Stationary Bike", image: "/man-funnel/cardio-equipment/stationary-bike.webp" },
    { id: "assault-bike", label: "Assault Bike", image: "/man-funnel/cardio-equipment/assault-bike.webp" },
    { id: "elliptical", label: "Elliptical", image: "/man-funnel/cardio-equipment/elliptical.webp" },
    { id: "stepper", label: "Stepper", image: "/man-funnel/cardio-equipment/stepper.webp" },
    { id: "rower", label: "Rower", image: "/man-funnel/cardio-equipment/rower.webp" },
];

export default function CardioEquipmentStep() {
    const { updateData, nextStep, funnelData } = useFunnelContext();
    const [selected, setSelected] = useState<string | string[]>([]);

    const handleSelect = (id: string | string[]) => {
        const selectedIds = Array.isArray(id) ? id : [id];
        setSelected(selectedIds);
        updateData({ equipment: selectedIds.map(id => options.find(option => option.id === id)).filter(Boolean) as Array<{ id: string; label: string }> });
        nextStep();
    };

    return (
        <section className="w-full px-6 pt-6 pb-24 flex flex-col">
            <h2 className="text-2xl font-bold mb-8">What cardio equipment do you have access to?</h2>

            <Button onClick={() => nextStep()} sticky={false} className="bg-grey-800 font-semibold text-left p-6 mt-4">
                None
            </Button>
            <Divider className="my-4" />
            <FormOptions options={options} type="checkbox" onSubmit={handleSelect} />
        </section>
    )

}
