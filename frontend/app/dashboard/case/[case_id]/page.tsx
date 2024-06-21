"use client";
import CaseHeader from "@/components/case-header";
import useCaseQuery from "@/hooks/queries/use-case-query";
import { useParams } from "next/navigation";

export default function CaseResult() {
    const { case_id } = useParams();
    const { data, isError, isLoading } = useCaseQuery(case_id as string);

    if (isError || isLoading || !data) {
        return <div>No data</div>;
    }

    return (
        <div className="px-6">
            <CaseHeader data={data} />
        </div>
    );
}
