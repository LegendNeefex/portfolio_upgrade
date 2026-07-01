"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase";
import stateHandler from "../../Context/stateHandler";

export default function ProjectHighlights() {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedProject } = useContext (stateHandler)

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
            <div className="w-full h-150 rounded-[35px] bg-[#202020] animate-pulse" />
        );
    }

    const leftLarge = highlights.find(
        (item) => item.card_type === "large_left"
    );

    const topSmall = highlights.find(
        (item) => item.card_type === "small_top"
    );

    const bottomSmall = highlights.find(
        (item) => item.card_type === "small_bottom"
    );

    const rightLarge = highlights.find(
        (item) => item.card_type === "large_right"
    );

    return (
        <section className="w-full pb-14 pt-8">
            <div className="m-auto w-[95%]">
                <div className="grid grid-cols-10 gap-5">
                    {/* LEFT LARGE */}
                    {leftLarge && (
                        <HighlightCard
                            data={leftLarge}
                            className="col-span-3 row-span-1 h-155"
                            selectedProject={selectedProject}
                        />
                    )}

                    {/* CENTER */}
                    <div className="col-span-4 flex flex-col gap-5">

                        {topSmall && (
                            <HighlightCard
                                data={topSmall}
                                className="h-75"
                                selectedProject={selectedProject}
                            />
                        )}

                        {bottomSmall && (
                            <HighlightCard
                                data={bottomSmall}
                                className="h-75"
                                selectedProject={selectedProject}
                            />
                        )}

                    </div>

                    {/* RIGHT LARGE */}
                    {rightLarge && (
                        <HighlightCard
                            data={rightLarge}
                            className="col-span-3 row-span-1 h-155"
                            selectedProject={selectedProject}
                        />
                    )}

                </div>

            </div>

        </section>
    );
}

function HighlightCard({ data, className, selectedProject }) {
    // console.log("new data log", selectedProject);
    

    const backgrounds = {
        large_left: "bg-[#A94726]",
        small_top: "bg-[#1ABC9C]",
        small_bottom: "bg-[#C4CFD8]",
        large_right: "bg-[#367BE4]",
    };

    const isSmall =
    data.card_type === "small_top" ||
    data.card_type === "small_bottom";

    const titleColor = isSmall
    ? "text-[#000]"
    : "text-white";

    const textColor = isSmall
    ? "text-[#2F2D2D]"
    : "text-[#E7EEF5]";

    const imageStyles = {
        default: {
            large_left: {
                position: "object-bottom-right",
                size: "w-[90%] h-[90%]",
            },

            small_top: {
                position: "object-right",
                size: "w-[90%] h-[90%]",
            },

            small_bottom: {
                position: "object-left",
                size: "w-[90%] h-[90%]",
            },

            large_right: {
                position: "object-bottom-right",
                size: "w-[90%] h-[90%]",
            },
        },
        shupp:{ 
            large_left: { 
                position: "object-bottom-right -translate-x-4 translate-y-5", 
                size: "w-[95%] h-[90%]", 
            }, 
                
            small_top: { 
                position: "object-right", 
                size: "w-[90%] h-[90%]", 
            }, 
            
            small_bottom: { 
                position: "object-left -translate-x-20 -translate-y-4", 
                size: "w-[80%] h-[80%]", 
            }, 
            
            large_right: { 
                position: "object-bottom-right -translate-x-2 translate-y-10", 
                size: "w-[80%] h-[70%]",
            }
        },
        ayur:{        
            small_top: { 
                position: "object-right", 
                size: "w-[90%] h-[90%]", 
            }, 
            
            small_bottom: { 
                position: "object-left -translate-x-30", 
                size: "w-[80%] h-[100%]", 
            }, 
        },
        saxton_store:{        
            small_bottom: { 
                position: "object-left -translate-x-30", 
                size: "w-[80%] h-[100%]", 
            }, 
        },
        nest:{  
            large_left: { 
                position: "-translate-x-4 translate-y-15", 
                size: "w-[100%] h-[100%]", 
            },       
            small_bottom: { 
                position: "object-left -translate-x-30", 
                size: "w-[80%] h-[100%]", 
            }, 
        },
        vista_vault:{  
            large_left: { 
                position: "-translate-x-0 translate-y-15", 
                size: "w-[100%] h-[100%]", 
            },       
        },
        sms:{ 
            large_left: { 
                position: "object-bottom-right translate-y-5", 
                size: "w-[100%] h-[100%]", 
            }, 
                
            small_top: { 
                position: "object-right", 
                size: "w-[90%] h-[90%]", 
            }, 
            
            small_bottom: { 
                position: "object-left -translate-x-40 -translate-y-0 rotate-45", 
                size: "w-[80%] h-[80%]", 
            }, 
            
            large_right: { 
                position: "object-bottom-right -translate-x-2 translate-y-10", 
                size: "w-[80%] h-[70%]",
            }
        },
        mini_store:{ 
            large_left: { 
                position: "object-bottom-right translate-y-5", 
                size: "w-[100%] h-[100%]", 
            }, 
                
            small_top: { 
                position: "object-right -translate-x-8", 
                size: "w-[90%] h-[90%]", 
            }, 
            
        },
        portfolio:{ 
            small_bottom: { 
                position: "object-left -translate-y-20 -translate-x-30 -rotate-45", 
                size: "w-[80%] h-[80%]", 
            }, 

        },
        collections:{ 
            large_left: { 
                position: "object-bottom-right translate-y-5", 
                size: "w-[100%] h-[100%]", 
            }, 
                
            small_top: { 
                position: "object-right -translate-y-15 translate-x-4 rotate-45", 
                size: "w-[90%] h-[90%]", 
            }, 
            
            small_bottom: { 
                position: "object-left -translate-x-30 -translate-y-0", 
                size: "w-[80%] h-[100%]", 
            }, 
        },
        // other default size and positioning here.
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
                p-8
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

                <h2 className={`font-bold text-[36px] leading-tight ${titleColor}`}>
                    {data.title}
                </h2>

                <p className={`mt-4 text-[17px] leading-7 ${textColor}`}>
                    {data.description}
                </p>

            </div>

            {/* IMAGE */}
            <div
                className={`
                    absolute
                    inset-0
                    flex
                    items-end
                    justify-end
                    overflow-hidden
                `}
            >
                <div
                    className={`
                        relative
                        ${styles.size}
                    `}
                >
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