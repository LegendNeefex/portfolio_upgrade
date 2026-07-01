"use client"

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className="w-full h-screen bg-[#1a1a1a] flex flex-col items-center justify-center gap-6 px-6">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-[#1ABC9C]/20 border-t-[#1ABC9C]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#1ABC9C] to-[#367BE4]" />
                    </div>
                </div>
                <h2 className="text-[#1ABC9C] font-bold text-[24px] font-montserrat">
                    Neefex .
                </h2>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="text-white font-montserrat font-bold text-[32px]">
                    Something went wrong
                </h1>
                <p className="text-white/60 font-openSans text-[16px] max-w-md">
                    This could be a network issue or a temporary problem. Please check your connection and try again.
                </p>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
                <button
                    onClick={reset}
                    className="py-3 px-8 bg-linear-to-r from-btn-first to-btn-second rounded-full text-white font-montserrat font-semibold hover:scale-95 duration-300 cursor-pointer"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="py-3 px-8 border-2 border-[#1ABC9C] rounded-full text-[#1ABC9C] font-montserrat font-semibold hover:scale-95 duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}