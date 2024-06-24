import { useDashboard } from "@/context/dashboard-context";
import { useEffect, useState } from "react";

// hook to simulate medical record upload
export function useMedicalRecordUpload() {
    const { medicalRecord, setMedicalRecord, setGuidelinesFile } =
        useDashboard();
    const [isLoading, setIsLoading] = useState(false);

    const simulateUpload = async () => {
        // if medical record is already uploaded, reset both medical record and guidelines file
        if (medicalRecord) {
            setMedicalRecord(null);
            setGuidelinesFile(null);
        }
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setMedicalRecord({ url: "/assets/medical-record.pdf" });
    };

    /*
        Since setState is async, we need to wait for the state to update before we can set isLoading to false
        Normally we would use a lib like react-query for real data fetching that has built-in loading states, caching, etc.
    */
    useEffect(() => {
        if (medicalRecord) {
            setIsLoading(false);
        }
    }, [medicalRecord]);

    return { isLoading, simulateUpload, medicalRecord };
}
