"use client";

import { useState } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import FormOptions from "../FormOptions";
import Button from "../Button";
import { Divider } from "../Divider";

const optionsHome = [
    { id: "dumbbells", label: "Dumbbells", image: "/man-funnel/home-equipment/dumbbells.png" },
    { id: "yoga-mat", label: "Yoga Mat", image: "/man-funnel/home-equipment/yoga-mat.png" },
    { id: "barbell", label: "Barbell", image: "/man-funnel/home-equipment/barbell.png" },
    { id: "jumprope", label: "Jumprope", image: "/man-funnel/home-equipment/jumprope.png" },
    { id: "pull-up-bar", label: "Pull-up Bar", image: "/man-funnel/home-equipment/pull-up-bar.png" },
    { id: "power-band", label: "Power Band", image: "/man-funnel/home-equipment/power-band.png" },
    { id: "kettlebells", label: "Kettlebells", image: "/man-funnel/home-equipment/kettlebells.png" },
];

const optionsGym = [
    { id: "lat-pull-down", label: "Lat Pull Down", image: "/man-funnel/gym-equipment/lat-pull-down.png" },
    { id: "chest-press", label: "Chest Press", image: "/man-funnel/gym-equipment/chest-press.png" },
    { id: "crossover-cable-machine", label: "Crossover Cable Machine", image: "/man-funnel/gym-equipment/crossover-cable.png" },
    { id: "leg-press", label: "Leg Press", image: "/man-funnel/gym-equipment/leg-press.png" },
    { id: "leg-extension", label: "Leg Extension", image: "/man-funnel/gym-equipment/leg-extension.png" },
    { id: "leg-curl", label: "Leg Curl", image: "/man-funnel/gym-equipment/leg-curl.png" },
    { id: "hyperextension", label: "Hyperextension", image: "/man-funnel/gym-equipment/hyperextension.png" },
    { id: "crunch-bench", label: "Crunch Bench", image: "/man-funnel/gym-equipment/crunch-bench.png" },
    { id: "pulley-machine", label: "Pulley Machine", image: "/man-funnel/gym-equipment/pulley-machine.png" },
    ...optionsHome,
];

export default function EqupmentStep() {
    const { updateData, nextStep, funnelData } = useFunnelContext();
    const [selected, setSelected] = useState<string | string[]>([]);

    const options = funnelData.location?.id === "home" ? optionsHome : optionsGym;

    const handleSelect = (id: string | string[]) => {
        const selectedIds = Array.isArray(id) ? id : [id];
        setSelected(selectedIds);
        updateData({ equipment: selectedIds.map(id => options.find(option => option.id === id)).filter(Boolean) as Array<{ id: string; label: string }> });
        nextStep();
    };

    return (
        <section className="w-full px-6 pt-6 pb-24 flex flex-col">
            <h2 className="text-2xl font-bold mb-8">What equipment do you have {funnelData.location?.id === "home" ? ' at home' : ' access to'}?</h2>

            <Button onClick={() => nextStep()} sticky={false} className="bg-grey-800 font-semibold text-left p-6 mt-4">
                None
            </Button>
            <Divider className="my-4" />
            <FormOptions options={options} type="checkbox" onSubmit={handleSelect} />
        </section>
    )

}
