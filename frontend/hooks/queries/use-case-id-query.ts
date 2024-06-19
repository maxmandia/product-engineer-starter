import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface CaseCreationResponse {
    id: string;
}

function useCaseIdQuery() {
    const { toast } = useToast();
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);
    const queryKey = ["caseId"];

    const queryFn = async (): Promise<CaseCreationResponse> => {
        try {
            const response = await fetch(`http://localhost:8000/cases`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error creating case");
            }

            const data = (await response.json()) as CaseCreationResponse;
            router.push(`/dashboard/case/${data.id}`);
            return data;
        } catch (error) {
            toast({
                title: "Error",
                description: "Error creating case",
                variant: "destructive"
            });
            throw error; // Re-throw the error to ensure the query knows it failed
        }
    };

    const query = useQuery({ queryKey, queryFn, enabled, retry: false });

    const handleContinue = () => {
        // once the query is enabled, it will run the queryFn
        setEnabled(true);
    };

    return { ...query, handleContinue };
}

export default useCaseIdQuery;
