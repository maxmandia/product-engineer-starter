"use client";
import CaseHeader from "@/components/case-header";
import CaseSummary from "@/components/case-summary";
import StepsContainer from "@/components/steps/steps-container";
import useCaseQuery from "@/hooks/queries/use-case-query";
import { useParams } from "next/navigation";

export default function CaseResult() {
    const { case_id } = useParams();
    const { data, isError, isLoading } = useCaseQuery(case_id as string);

    if (isError || isLoading || !data) {
        return <div>No data</div>;
    }

    return (
        <div className="px-6 overflow-y-auto h-full">
            <CaseHeader data={data} />
            <CaseSummary summary={data.summary} />
            <StepsContainer steps={data.steps} />
        </div>
    );
}
