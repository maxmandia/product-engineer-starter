import React from "react";
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

function CptDrawer({ cpt_codes }: { cpt_codes: string[] }) {
    const { toast } = useToast();
    return (
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>CPT Codes</DrawerTitle>
                    <DrawerDescription>
                        Below are the CPT codes for the respective case.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-6 flex flex-wrap gap-2 items-center justify-center">
                    {cpt_codes.map((code) => (
                        <Badge
                            onClick={() => {
                                window.navigator.clipboard.writeText(code);
                                toast({
                                    title: "Copied to clipboard",
                                    description: `CPT Code ${code} copied to clipboard`,
                                    duration: 1000
                                });
                            }}
                            className="text-sm font-light text-white w-fit"
                            key={code}>
                            {code}
                        </Badge>
                    ))}
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button className="bg-black text-white" variant="outline">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    );
}

export default CptDrawer;
