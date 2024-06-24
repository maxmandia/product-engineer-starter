import { Step } from "@/types/case-response";
import React from "react";
import StepComponent from "../step";
import { Skeleton } from "@/components/ui/skeleton";

function StepsContainer({ steps }: { steps: Step[] }) {
    if (steps.length === 0) {
        return <Skeleton className="h-[500px] w-full" />;
    }

    return (
        <div className="flex flex-col gap-2 mb-10">
            <h4 className="text-lg font-bold">Steps</h4>
            <div className="flex flex-col gap-2 md:gap-10">
                {steps.map((step, index) => (
                    <StepComponent key={step.key} step={step} oneBasedIndex={index + 1} />
                ))}
            </div>
        </div>
    );
}

export default StepsContainer;
