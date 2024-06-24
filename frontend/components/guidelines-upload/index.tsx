"use client";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useGuidelinesUpload } from "@/hooks/use-guidelines-upload";

export default function GuidelinesUpload() {
    const { isLoading, simulateUpload, guidelinesFile } = useGuidelinesUpload();

    const buttonClass = classNames({
        "bg-green-500": guidelinesFile,
        "hover:bg-green-600": guidelinesFile
    });

    const uploadButtonText = isLoading ? (
        <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            <span>Uploading...</span>
        </>
    ) : guidelinesFile ? (
        <span className="flex flex-row gap-1 items-center">
            <FaCheck />
            <span>Guidelines File Uploaded</span>
        </span>
    ) : (
        <span>Simulate Guidelines File Upload</span>
    );

    return (
        <div className="p-10 min-w-[350px] border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <Button disabled={isLoading} className={buttonClass} onClick={simulateUpload}>
                {uploadButtonText}
            </Button>
        </div>
    );
}
