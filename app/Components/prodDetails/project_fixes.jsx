"use client";

import { useEffect, useState, useContext } from "react";
import { supabase } from "../../lib/supabase";
import { FaPenNib, FaReact } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import stateHandler from "../../Context/stateHandler";

function ProjectFixes() {
    const [data, setData] = useState([]);
    const { selectedProject } = useContext(stateHandler);

    useEffect(() => {
        if (!selectedProject) return;

        async function fetchProjects() {
            const { data, error } = await supabase
                .from("project_fixes")
                .select("*")
                .eq("project_id", selectedProject.id)
                .order("challenge_display_order", { ascending: true });

            if (error) {
                console.log(error);
            } else {
                setData(data);
            }
        }

        fetchProjects();
    }, [selectedProject]);

    const challenges = [...data].sort((a, b) => a.challenge_display_order - b.challenge_display_order);
    const solutions = [...data].sort((a, b) => a.solution_display_order - b.solution_display_order);

    const icons = [
        <FaPenNib key={0} />,
        <IoMdSettings key={1} />,
        <FaReact key={2} />,
    ];

    return (
        <div className="bg-[#353535]">
            <div className="w-[95%] m-auto pt-8 pb-24 relative">

                {/* Header */}
                <div>
                    <div className="flex">
                        <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                        <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">PROJECT FIXES</p>
                    </div>
                    <h2 className="text-[24px] font-bold text-muted font-montserrat">Curious What Went Wrong?</h2>
                </div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <div className="relative w-full h-125 font-poppins font-bold blur-sm opacity-20">
                        <h2 className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-30 text-[60px] lg:text-[100px] text-[#FF7043]">
                            Challenges
                        </h2>
                        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-30 text-[80px] lg:text-[150px] text-[#E3F2FD]">
                            Vs
                        </h2>
                        <h2 className="absolute right-0 top-1/2 -translate-y-1/2 -rotate-30 text-[60px] lg:text-[100px] text-[#6BA6FF] text-right">
                            Solutions
                        </h2>
                    </div>
                </div>

                {/* DESKTOP layout — hidden on mobile */}
                <div className="hidden lg:block w-[75%] mx-auto pt-28">
                    <div className="grid grid-cols-[1fr_140px_1fr] gap-14">

                        {/* LEFT — Challenges */}
                        <div className="flex flex-col justify-between text-neutral-white">
                            {challenges.map((item) => (
                                <div key={item.id} className="text-right">
                                    <h3 className="text-[40px] font-poppins font-semibold">
                                        <span>0</span>{item.challenge_display_order}
                                    </h3>
                                    <h2 className="text-[24px] font-semibold font-poppins mt-2">
                                        {item.challenge_title}
                                    </h2>
                                    <p className="text-[18px] font-medium mt-6 leading-7 text-[#ECF0F1]">
                                        {item.challenge_desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CENTER — Icons */}
                        <div className="relative flex flex-col items-center justify-between h-225">
                            <div className="absolute top-0 bottom-0 border-l-3 border-dashed border-white/30"></div>
                            {icons.map((icon, index) => (
                                <div
                                    key={index}
                                    className="w-20 h-20 rounded-full bg-[#0F6A58] border-3 border-white text-white text-[36px] flex items-center justify-center z-10"
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>

                        {/* RIGHT — Solutions */}
                        <div className="flex flex-col justify-between text-neutral-white">
                            {solutions.map((item) => (
                                <div key={item.id} className="text-left">
                                    <h3 className="text-[40px] font-poppins font-semibold">
                                        <span>0</span>{item.solution_display_order}
                                    </h3>
                                    <h2 className="text-[24px] font-semibold font-poppins mt-2">
                                        {item.solution_title}
                                    </h2>
                                    <p className="text-[18px] font-medium mt-6 leading-7 text-[#ECF0F1]">
                                        {item.solution_desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* MOBILE + TABLET layout — hidden on desktop */}
                <div className="lg:hidden mt-14 flex flex-col gap-6">
                    {challenges.map((item, index) => (
                        <div key={item.id} className="flex flex-col gap-4">

                            {/* Challenge card */}
                            <div className="bg-[#FF7043]/10 border border-[#FF7043]/30 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[#FF7043] font-poppins font-bold text-[28px]">
                                        0{item.challenge_display_order}
                                    </span>
                                    <div className="h-0.5 flex-1 bg-[#FF7043]/30"></div>
                                    <p className="text-[#FF7043] font-montserrat text-[12px] font-semibold uppercase tracking-widest">
                                        Challenge
                                    </p>
                                </div>
                                <h2 className="text-white font-poppins font-semibold text-[18px] md:text-[22px]">
                                    {item.challenge_title}
                                </h2>
                                <p className="text-[#ECF0F1] font-openSans text-[15px] md:text-[16px] leading-7 mt-3">
                                    {item.challenge_desc}
                                </p>
                            </div>

                            {/* Icon connector */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-0.5 bg-white/10"></div>
                                <div className="w-12 h-12 rounded-full bg-[#0F6A58] border-2 border-white text-white text-[20px] flex items-center justify-center shrink-0">
                                    {icons[index % icons.length]}
                                </div>
                                <div className="flex-1 h-0.5 bg-white/10"></div>
                            </div>

                            {/* Solution card */}
                            {solutions[index] && (
                                <div className="bg-[#6BA6FF]/10 border border-[#6BA6FF]/30 rounded-2xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[#6BA6FF] font-poppins font-bold text-[28px]">
                                            0{solutions[index].solution_display_order}
                                        </span>
                                        <div className="h-0.5 flex-1 bg-[#6BA6FF]/30"></div>
                                        <p className="text-[#6BA6FF] font-montserrat text-[12px] font-semibold uppercase tracking-widest">
                                            Solution
                                        </p>
                                    </div>
                                    <h2 className="text-white font-poppins font-semibold text-[18px] md:text-[22px]">
                                        {solutions[index].solution_title}
                                    </h2>
                                    <p className="text-[#ECF0F1] font-openSans text-[15px] md:text-[16px] leading-7 mt-3">
                                        {solutions[index].solution_desc}
                                    </p>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default ProjectFixes;