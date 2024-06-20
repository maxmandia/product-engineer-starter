import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface CaseCreationResponse {
    id: string;
}

function useCaseIdMutation() {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async (): Promise<CaseCreationResponse> => {
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
            throw error; // Re-throw the error to ensure the mutation knows it failed
        }
    };
    const mutation = useMutation<CaseCreationResponse, Error, void>({
        mutationFn,
        onError: () => {
            toast({
                title: "Error",
                description: "Error creating case",
                variant: "destructive"
            });
        }
    });

    return mutation;
}

export default useCaseIdMutation;
