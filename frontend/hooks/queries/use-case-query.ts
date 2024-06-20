import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import type { CaseResponse } from "@/types/case-response";

function useCaseQuery(caseId: string) {
    const { toast } = useToast();
    const router = useRouter();
    const queryKey = ["caseId", caseId];

    const queryFn = async (): Promise<CaseResponse> => {
        try {
            const response = await fetch(
                `http://localhost:8000/cases/${caseId}`
            );

            if (!response.ok) {
                throw new Error("Error fetching case");
            }

            const data = (await response.json()) as CaseResponse;
            return data;
        } catch (error) {
            toast({
                title: "Error",
                description: "Error fetching case",
                variant: "destructive"
            });
            throw error; // Re-throw the error to ensure the query knows it failed
        }
    };

    const query = useQuery({
        queryKey,
        queryFn,
        refetchInterval: 5000,
        retry: false
    });

    return query;
}

export default useCaseQuery;
