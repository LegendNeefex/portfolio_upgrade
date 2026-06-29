// app/Components/pageLoader.jsx
"use client"

import { useState, useEffect } from "react";

export default function PageLoader({ text = "Loading", duration = 1500, controlled = false }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (controlled) return; // don't auto dismiss
        const timer = setTimeout(() => {
            setLoading(false);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, controlled]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center gap-6 z-[999]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-[#1ABC9C]/20 border-t-[#1ABC9C] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#1ABC9C] to-[#367BE4] animate-pulse" />
                    </div>
                </div>
                <h2 className="text-[#1ABC9C] font-bold text-[24px] font-montserrat animate-pulse">
                    Neefex .
                </h2>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-white font-montserrat text-[16px] font-medium">{text}</p>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#1ABC9C] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[#1ABC9C] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-[#1ABC9C] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
            </div>
        </div>
    );
}