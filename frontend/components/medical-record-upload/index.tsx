"use client";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useMedicalRecordUpload } from "@/hooks/use-medical-record-upload";

export default function MedicalRecordUpload() {
    const { isLoading, simulateUpload, medicalRecord } = useMedicalRecordUpload();

    const buttonClass = classNames({
        "bg-green-500": medicalRecord,
        "hover:bg-green-600": medicalRecord
    });

    const uploadButtonText = isLoading ? (
        <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            <span>Uploading...</span>
        </>
    ) : medicalRecord ? (
        <span className="flex flex-row gap-1 items-center">
            <FaCheck />
            <span>Medical Record Uploaded</span>
        </span>
    ) : (
        <span>Simulate Medical Record Upload</span>
    );

    return (
        <div className="p-10 min-w-[350px] border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <Button disabled={isLoading} className={buttonClass} onClick={simulateUpload}>
                {uploadButtonText}
            </Button>
        </div>
    );
}
