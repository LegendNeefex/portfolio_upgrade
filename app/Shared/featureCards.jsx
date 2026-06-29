"use client";

import { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import stateHandler from "../Context/stateHandler";

import { FaCheck } from "react-icons/fa";

function FeatureCards() {
    const { selectedProject } = useContext(stateHandler);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        if (!selectedProject) return;

        async function fetchFeatures() {
            const { data, error } = await supabase
                .from("project_features")
                .select("*")
                .eq("project_id", selectedProject.id)
                .order("display_order", { ascending: true });

            if (error) {
                console.log(error);
                return;
            }

            setFeatures(data);
        }

        fetchFeatures();
    }, [selectedProject]);


    const borderColors = [
        "border-[#0D47A1] border-l-5 border-b-5",
        "border-[#A94627] border-t-5 border-b-5",
        "border-[#0F6A58] border-r-5 border-b-5",
        "border-cyan-500 border-t-5 border-r-5",
        "border-[#0D47A1] border-t-5 border-l-5",
    ];

    const iconColors = [
        "bg-[#0D47A1]",
        "bg-[#A94627]",
        "bg-emerald-700",
        "bg-cyan-500",
        "bg-[#0D47A1]",
    ];

    const topFeatures = features.slice(0, 3);
    const bottomFeatures = features.slice(3);

    return (
        <div className="mt-14 space-y-4">
            {/* TOP ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topFeatures.map((feature, index) => (
                    <div
                        key={feature.id}
                        className={`
                            bg-[#ECECEC]
                            rounded-md
                            shadow-frame
                            ${borderColors[index]}
                            px-7
                            py-7
                            text-center
                            transition-all
                            duration-300
                            hover:-translate-y-2
                            hover:shadow-2xl
                            cursor-pointer
                        `}
                    >
                        <div
                            className={`
                                ${iconColors[index]}
                                w-14
                                h-14
                                rounded-full
                                flex
                                items-center
                                justify-center
                                text-white
                                text-xl
                                mx-auto
                                mb-5
                            `}
                        >
                            <FaCheck />
                        </div>

                        <h2 className="text-black font-poppins font-bold text-[24px] leading-tight">
                            {feature.feature_title}
                        </h2>

                        <p className="text-[#4B4B4B] text-[16px] font-lato mt-3 leading-6 font-medium">
                            {feature.feature_desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* BOTTOM ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bottomFeatures.map((feature, index) => {
                    const colorIndex = index + 3;

                    return (
                        <div
                            key={feature.id}
                            className={`
                                bg-[#ECECEC]
                                rounded-md
                                shadow-frame
                                ${borderColors[colorIndex]}
                                px-7
                                py-7
                                text-center
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:shadow-2xl
                                cursor-pointer
                            `}
                        >
                            <div
                                className={`
                                    ${iconColors[colorIndex]}
                                    w-14
                                    h-14
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    text-xl
                                    mx-auto
                                    mb-5
                                `}
                            >
                                <FaCheck />
                            </div>

                            <h2 className="text-black font-poppins font-bold text-[24px] leading-tight">
                                {feature.feature_title}
                            </h2>

                            <p className="text-[#4B4B4B] text-[16px] font-lato mt-3 leading-6 font-medium">
                                {feature.feature_desc}
                            </p>
                        </div>
                    );
                })}
            </div>
            <p className="text-[20px] font-openSans font-medium text-center mt-10 text-[#E3F2FD] leading-6">{selectedProject.project_outcome} <strong className="text-[#1ABC9C]">{selectedProject.project_outcome_highlight}</strong></p>
        </div>
    );
}

export default FeatureCards;