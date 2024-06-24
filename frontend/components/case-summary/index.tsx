import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

function CaseSummary({ summary }: { summary: string | undefined }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="py-5">
            <h4 className="text-lg font-bold">Summary</h4>
            {!summary ? (
                <div className="flex flex-col gap-2 py-2">
                    {Array.from({ length: 3 }, (_, i) => (
                        <Skeleton key={i} className="h-[20px] w-full" />
                    ))}
                </div>
            ) : (
                <>
                    <p
                        className={cn(
                            "line-clamp-3",
                            isExpanded ? "line-clamp-none" : "line-clamp-3"
                        )}>
                        {summary}
                    </p>
                    <div className="flex justify-start mt-2">
                        <Button
                            variant="link"
                            className="p-0 h-fit text-[10px] text-gray-500 underline bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none"
                            onClick={() => setIsExpanded((prev) => !prev)}>
                            {isExpanded ? "View less" : "View more"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CaseSummary;
