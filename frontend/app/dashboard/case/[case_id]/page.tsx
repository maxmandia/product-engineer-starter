"use client";
import useCaseQuery from "@/hooks/queries/use-case-query";
import { useParams } from "next/navigation";

export default function CaseResult() {
    const { case_id } = useParams();
    const { data } = useCaseQuery(case_id as string);

    return <div>{JSON.stringify(data)}</div>;
}
