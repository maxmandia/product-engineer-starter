import { useToast } from "@/components/ui/use-toast";
import { useDashboard } from "@/context/dashboard-context";
import { useEffect, useState } from "react";

// hook to simulate guideline record upload
export function useGuidelinesUpload() {
    const { toast } = useToast();
    const { guidelinesFile, setGuidelinesFile, medicalRecord } = useDashboard();
    const [isLoading, setIsLoading] = useState(false);

    const simulateUpload = async () => {
        // if medical record is not uploaded, show toast and return
        if (!medicalRecord) {
            toast({
                title: "Failed to upload guidelines file",
                description: "Please upload a medical record first"
            });
            return;
        }

        // if guidelines file record is already uploaded,
        // reset guidelines file so a user cannot continue until the guidelines file is uploaded
        if (guidelinesFile) {
            setGuidelinesFile(null);
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setGuidelinesFile({ url: "/assets/guidelines.pdf" });
    };

    /*
        Since setState is async, we need to wait for the state to update before we can set isLoading to false
        Normally we would use a lib like react-query for real data fetching that has built-in loading states, caching, etc.
    */
    useEffect(() => {
        if (guidelinesFile) {
            setIsLoading(false);
        }
    }, [guidelinesFile]);

    return { isLoading, simulateUpload, guidelinesFile };
}
