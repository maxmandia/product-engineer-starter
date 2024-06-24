import React from "react";
import AnteriorIcon from "@/public/anterior.svg";
import Link from "next/link";

function Header() {
    return (
        <div className="p-6 md:p-10">
            <Link href="/dashboard">
                <AnteriorIcon />
            </Link>
        </div>
    );
}

export default Header;
