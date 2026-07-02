"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase";
import stateHandler from "../../Context/stateHandler";

export default function ProjectHighlights() {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedProject } = useContext(stateHandler);

    useEffect(() => {
        if (!selectedProject) return;

        async function fetchHighlights() {
            const { data, error } = await supabase
                .from("project_highlights")
                .select("*")
                .eq("project_id", selectedProject.id)
                .order("display_order", { ascending: true });

            if (error) {
                console.log(error);
            } else {
                setHighlights(data);
            }
            setLoading(false);
        }

        fetchHighlights();
    }, [selectedProject]);

    if (loading || !selectedProject) {
        return (
            <div className="w-[95%] m-auto pb-14 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
                    <div className="h-72 lg:col-span-3 lg:h-155 rounded-[28px] bg-[#202020] animate-pulse" />
                    <div className="flex flex-col gap-5 lg:col-span-4">
                        <div className="h-60 lg:h-75 rounded-[28px] bg-[#202020] animate-pulse" />
                        <div className="h-60 lg:h-75 rounded-[28px] bg-[#202020] animate-pulse" />
                    </div>
                    <div className="h-72 lg:col-span-3 lg:h-155 rounded-[28px] bg-[#202020] animate-pulse" />
                </div>
            </div>
        );
    }

    const leftLarge = highlights.find((item) => item.card_type === "large_left");
    const topSmall = highlights.find((item) => item.card_type === "small_top");
    const bottomSmall = highlights.find((item) => item.card_type === "small_bottom");
    const rightLarge = highlights.find((item) => item.card_type === "large_right");

    return (
        <section className="w-full pb-14 pt-8">
            <div className="m-auto w-[95%]">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">

                    {/* LEFT LARGE */}
                    {leftLarge && (
                        <HighlightCard
                            data={leftLarge}
                            className="h-72 lg:col-span-3 lg:h-155"
                            selectedProject={selectedProject}
                        />
                    )}

                    {/* CENTER */}
                    <div className="flex flex-col gap-5 lg:col-span-4">
                        {topSmall && (
                            <HighlightCard
                                data={topSmall}
                                className="h-60 lg:h-75"
                                selectedProject={selectedProject}
                            />
                        )}
                        {bottomSmall && (
                            <HighlightCard
                                data={bottomSmall}
                                className="h-60 lg:h-75"
                                selectedProject={selectedProject}
                            />
                        )}
                    </div>

                    {/* RIGHT LARGE */}
                    {rightLarge && (
                        <HighlightCard
                            data={rightLarge}
                            className="h-72 lg:col-span-3 lg:h-155"
                            selectedProject={selectedProject}
                        />
                    )}

                </div>
            </div>
        </section>
    );
}

function HighlightCard({ data, className, selectedProject }) {

    const backgrounds = {
        large_left: "bg-[#A94726]",
        small_top: "bg-[#1ABC9C]",
        small_bottom: "bg-[#C4CFD8]",
        large_right: "bg-[#367BE4]",
    };

    const isSmall =
        data.card_type === "small_top" ||
        data.card_type === "small_bottom";

    const titleColor = isSmall ? "text-[#000]" : "text-white";
    const textColor = isSmall ? "text-[#2F2D2D]" : "text-[#E7EEF5]";

    const imageStyles = {
        default: {
            large_left: { position: "object-bottom-right", size: "w-[90%] h-[90%]" },
            small_top: { position: "object-right", size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" },
            small_bottom: { position: "object-left", size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" },
            large_right: { position: "object-bottom-right", size: "w-[90%] h-[90%]" },
        },
        shupp: {
            large_left: { 
                position: "object-bottom-right -translate-x-4 lg:-translate-x-4 lg:translate-y-5", 
                size: "w-[120%] h-[120%] lg:w-[95%] lg:h-[90%]" 
            },
            small_top: { 
                position: "object-right", 
                size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" 
            },
            small_bottom: { 
                position: "object-left lg:-translate-x-20 lg:-translate-y-4", 
                size: "w-[100%] h-[80%] lg:w-[80%] lg:h-[80%]" 
            },
            large_right: { 
                position:"object-bottom-right translate-y-10 md:-translate-x-2 md:translate-y-10", 
                size: "w-[100%] h-[80%] lg:w-[80%] lg:h-[70%]" 
            },
        },
        ayur: {
            small_top: { 
                position: "object-right", 
                size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" 
            },
            small_bottom: { 
                position: "object-left -translate-x-40 lg:-translate-x-30", 
                size: "w-[60%] h-[100%] lg:w-[80%] lg:h-[100%]" 
            },
        },
        saxton_store: {
            small_bottom: { 
                position: "object-left -translate-x-40 lg:-translate-x-30", 
                size: "w-[60%] h-[100%] lg:w-[80%] lg:h-[100%]" 
            },
        },
        nest: {
            large_left: { 
                position: "lg:-translate-x-4 lg:translate-y-15", 
                size: "w-[85%] h-[85%] lg:w-[100%] lg:h-[100%]" 
            },
            small_bottom: { 
                position: "object-left -translate-x-40 lg:-translate-x-30", 
                size: "w-[60%] h-[90%] lg:w-[80%] lg:h-[100%]" 
            },
        },
        vista_vault: {
            large_left: { 
                position: "lg:translate-y-15 -translate-x-15 translate-y-7", 
                size: "w-[100%] h-[100%] lg:w-[100%] lg:h-[100%]" 
            },
        },
        sms: {
            large_left: { 
                position: "object-bottom-right -translate-x-0 translate-y-40 lg:translate-y-5", 
                size: "w-[400%] h-[200%] lg:w-[100%] lg:h-[100%]" 
            },
            small_top: { 
                position: "object-right", 
                size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" 
            },
            small_bottom: { 
                position: "object-left -translate-x-40 -translate-y-10 lg:-translate-x-40 rotate-55 lg:rotate-45", 
                size: "w-[60%] h-[80%] lg:w-[80%] lg:h-[80%]" 
            },
            large_right: { 
                position: "object-bottom-right lg:-translate-x-2 lg:translate-y-10", 
                size: "w-[80%] h-[70%] lg:w-[80%] lg:h-[70%]" 
            },
        },
        mini_store: {
            large_left: { 
                position: "object-bottom-right lg:translate-y-5", 
                size: "w-[85%] h-[85%] lg:w-[100%] lg:h-[100%]" 
            },
            small_top: { 
                position: "object-right lg:-translate-x-8", 
                size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" 
            },
            small_bottom: { 
                position: "object-left lg:-translate-x-5 -translate-x-35 lg:translate-y-5", 
                size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" },
        },
        portfolio: {
            small_bottom: { 
                position: "object-left -translate-x-40 -rotate-90 -translate-y-5 lg:-translate-y-20 lg:-translate-x-30 lg:-rotate-45", 
                size: "w-[60%] h-[80%] lg:w-[80%] lg:h-[80%]" 
            },
            small_top: { 
                position: "object-right lg:-translate-y-0 translate-y-8", 
                size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" },
        },
        collections: {
            large_left: { 
                position: "object-bottom-right -translate-x-0 translate-y-40 lg:translate-y-5", 
                size: "w-[150%] h-[150%] lg:w-[100%] lg:h-[100%]" 
            },
            small_top: { 
                position: "object-right lg:-translate-y-15 lg:translate-x-4 lg:rotate-45", 
                size: "w-[60%] h-[90%] lg:w-[90%] lg:h-[90%]" 
            },
            small_bottom: { 
                position: "object-left -translate-x-40 lg:-translate-x-30", 
                size: "w-[60%] h-[90%] lg:w-[80%] lg:h-[100%]" 
            },
        },
    };

    const styles =
        imageStyles[selectedProject?.slug]?.[data.card_type] ??
        imageStyles.default[data.card_type];

    return (
        <div
            className={`
                ${backgrounds[data.card_type]}
                ${className}
                relative
                overflow-hidden
                rounded-[28px]
                p-4 lg:p-8
            `}
        >
            {/* TEXT */}
            <div
                className={`relative z-20 ${
                    data.card_type === "small_bottom"
                        ? "ml-auto text-left max-w-[50%] h-full flex flex-col justify-center"
                        : data.card_type === "small_top"
                        ? "max-w-[50%] h-full flex flex-col justify-center"
                        : "max-w-[68%]"
                }`}
            >
                <h2 className={`font-bold text-[22px] md:text-[36px] leading-tight ${titleColor}`}>
                    {data.title}
                </h2>
                <p className={`mt-2 md:mt-4 text-[13px] md:text-[17px] leading-6 lg:leading-7 ${textColor}`}>
                    {data.description}
                </p>
            </div>

            {/* IMAGE */}
            <div className="absolute inset-0 flex items-end justify-end overflow-hidden">
                <div className={`relative ${styles.size}`}>
                    <Image
                        src={data.thumbnail_url}
                        alt={data.title}
                        fill
                        className={`
                            object-contain
                            ${styles.position}
                            pointer-events-none
                        `}
                    />
                </div>
            </div>
        </div>
    );
}