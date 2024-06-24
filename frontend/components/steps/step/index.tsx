import React, { useState } from "react";
import { type Step } from "@/types/case-response";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

function Step({ step, oneBasedIndex }: { step: Step; oneBasedIndex: number }) {
    const [areOptionsExpanded, setAreOptionsExpanded] = useState(false);
    const [isReasoningExpanded, setIsReasoningExpanded] = useState(false);
    const [isCitationsExpanded, setIsCitationsExpanded] = useState(false);
    const selectedOptions = step.options.filter((option) => option.selected);

    return (
        <Card>
            <CardHeader>
                <CardDescription>Question {oneBasedIndex}</CardDescription>
                <CardTitle>{step.question}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <Badge
                        className={cn(
                            "absolute top-0 left-[74px] hover:bg-green-500 transform -translate-x-1/2 -translate-y-1/2 rounded-sm bg-green-500",
                            !step.is_met ? "hover:bg-gray-500 bg-gray-500" : ""
                        )}>
                        Selected Option{selectedOptions.length > 1 ? "s" : ""}
                    </Badge>
                    <div
                        className={cn(
                            "flex flex-col gap-2 border-[2px] rounded-md border-green-500 p-4 bg-black/5",
                            !step.is_met ? "border-gray-500" : ""
                        )}>
                        {selectedOptions.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Checkbox
                                    className={cn(
                                        "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-5000",
                                        !step.is_met
                                            ? "data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500"
                                            : ""
                                    )}
                                    checked={true}
                                />
                                <label className="text-gray-500" htmlFor="selected-option">
                                    {option.text}
                                </label>
                            </div>
                        ))}
                    </div>
                    {areOptionsExpanded && (
                        <div className="flex flex-col gap-2 pt-4">
                            {step.options.map((option) => (
                                <div key={option.text} className="flex items-center gap-2">
                                    <Checkbox
                                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                        checked={option.selected}
                                    />
                                    <label className="text-gray-500" htmlFor={option.text}>
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        variant="link"
                        className="p-0 h-fit text-[10px] text-gray-500 underline bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none"
                        onClick={() => setAreOptionsExpanded((prev) => !prev)}>
                        {areOptionsExpanded ? "View less" : "View all options"}
                    </Button>
                </div>
                <div className="leading-relaxed max-w-none">
                    {!step.is_met && (
                        <p className="text-red-500 font-bold pt-5">
                            The requirements for this procedure have not been met.
                        </p>
                    )}
                    <Markdown
                        className={`text-sm markdown ${
                            !isReasoningExpanded ? "line-clamp-[10]" : ""
                        }`}>
                        {step.reasoning}
                    </Markdown>
                    <Button
                        variant="link"
                        className="p-0 h-fit text-[10px] text-gray-500 underline bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none"
                        onClick={() => setIsReasoningExpanded((prev) => !prev)}>
                        {isReasoningExpanded ? "View less" : "View all reasoning"}
                    </Button>
                </div>
                <div className="bg-black/5 rounded-md mt-5">
                    <div className="flex items-center gap-2 p-3 text-sm ">
                        <span className="text-[35px]">💡</span>
                        <div>
                            <p className="font-medium">
                                This decision was made based on citations from the medical record.
                            </p>
                            <Button
                                variant="link"
                                className="p-0 h-fit text-[10px] text-gray-500 underline bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none"
                                onClick={() => setIsCitationsExpanded((prev) => !prev)}>
                                {isCitationsExpanded ? "View less" : "View all evidence"}
                            </Button>
                        </div>
                    </div>
                    {isCitationsExpanded && (
                        <div className="flex flex-col">
                            {step.evidence.map((evidence, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-4 px-4 py-8 ${
                                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                                    }`}>
                                    <span className="bg-gray-500 text-white rounded-md px-2 py-1 text-[8px] whitespace-nowrap mt-2 md:mt-0 md:text-[10px]">
                                        Page {evidence.page_number}
                                    </span>
                                    <p className="text-[12px] md:text-[14px]">{evidence.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default Step;
