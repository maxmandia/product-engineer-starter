import { CaseResponse, CaseStatus } from "@/types/case-response";
import React from "react";
import moment from "moment";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import CptDrawer from "../cpt-drawer";
import { CheckCheckIcon, PackageSearchIcon, SendIcon, XIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

function renderEmoji(status: CaseStatus) {
    switch (status) {
        case CaseStatus.SUBMITTED:
            return <SendIcon className="w-4 h-4" />;
        case CaseStatus.PROCESSING:
            return <PackageSearchIcon className="w-4 h-4" />;
        case CaseStatus.COMPLETE:
            return <CheckCheckIcon color="green" className="w-4 h-4" />;
    }
}

function CaseHeader({ data }: { data: CaseResponse }) {
    return (
        <div className="flex flex-col items-start gap-4">
            <div className="w-full">
                <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col items-start gap-1">
                        <h1 className="text-2xl font-bold">{data.procedure_name}</h1>
                    </div>
                    <Drawer>
                        <DrawerTrigger className="text-xs font-light mt-[5px] bg-black text-white py-1 px-2 rounded-md">
                            CPT Codes
                        </DrawerTrigger>
                        <CptDrawer cpt_codes={data.cpt_codes} />
                    </Drawer>
                </div>
                <span className="text-sm font-light text-gray-500">
                    Created {moment.utc(data.created_at).local().fromNow()}
                </span>
            </div>
            <div className="flex items-center gap-6 w-full">
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-light">Status</h3>
                    <div className="flex items-center gap-1">
                        {renderEmoji(data.status)}
                        <span className="font-medium">
                            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-light">Determination</h3>
                    <div className="flex items-center gap-1">
                        {data.status !== CaseStatus.COMPLETE ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : data.is_met ? (
                            <CheckCheckIcon color="green" className="w-4 h-4" />
                        ) : (
                            <XIcon color="red" className="w-4 h-4" />
                        )}
                        <span className="font-medium">
                            {data.status !== CaseStatus.COMPLETE
                                ? "Pending..."
                                : data.is_met
                                ? "Probable Approval"
                                : "Probable Denial"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseHeader;
