"use client";

import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/dashboard-context";
import useCaseIdQuery from "@/hooks/queries/use-case-id-query";
import classNames from "classnames";
import { useRouter } from "next/navigation";

export const revalidate = 0;

export default function DashboardRoot() {
    const { medicalRecord, guidelinesFile } = useDashboard();
    const { handleContinue } = useCaseIdQuery();

    const buttonClass = classNames({
        "bg-blue-500": medicalRecord && guidelinesFile,
        "hover:bg-blue-600": medicalRecord && guidelinesFile,
        invisible: !(medicalRecord && guidelinesFile)
    });

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <div className="w-full flex flex-row gap-2 items-center">
                <MedicalRecordUpload />
                <GuidelinesUpload />
            </div>

            <div className="w-full py-4 flex flex-row justify-center">
                <Button className={buttonClass} onClick={handleContinue}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
