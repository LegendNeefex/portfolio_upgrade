
import { useEffect, useState, useContext } from "react";
import { supabase } from "../../lib/supabase";

import { FaPenNib, FaReact } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import stateHandler from "../../Context/stateHandler";


function ProjectFixes(params) {
    const [data, setData] = useState([])
    const {selectedProject} = useContext(stateHandler)

    useEffect(() => {
        if (!selectedProject) return;

        async function fetchProjects() {
            const { data, error } = await supabase
                .from("project_fixes")
                .select("*")
                .eq("project_id", selectedProject.id)
                .order("challenge_display_order", { ascending: true });
                console.log(data);
    
            if (error) {
                console.log(error);
            } else {
                setData(data);
            }
    
            // setLoading(false);
        }
    
        fetchProjects();
    }, [selectedProject]);

    const challenges = [...data].sort(
        (a, b) => a.challenge_display_order - b.challenge_display_order
    );

    const solutions = [...data].sort(
        (a, b) => a.solution_display_order - b.solution_display_order
    );

    const icons = [
        <FaPenNib key={0} />,
        <IoMdSettings key={1} />,
        <FaReact key={2} />,
    ];


    return(
        <div className="bg-[#353535]">
            <div className="w-[95%] m-auto pt-8 pb-24 relative">
                <div>
                    <div className="flex">
                        <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                        <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">PROJECT FIXES</p>
                    </div>
                    <h2 className="text-[24px] font-bold text-muted font-montserrat">Curious What Went Wrong?</h2>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-225 h-125 font-poppins font-bold blur-sm opacity-20">
                        {/* Challenges */}
                        <h2 className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-30 text-[100px] text-[#FF7043]">
                            Challenges
                        </h2>

                        {/* VS */}
                        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-30 text-[150px] text-[#E3F2FD]">
                            Vs
                        </h2>

                        {/* Solutions */}
                        <h2 className="absolute right-0 top-1/2 -translate-y-1/2 -rotate-30 text-[100px] text-[#6BA6FF] text-right">
                            Solutions
                        </h2>
                    </div>
                </div>
                <div className="w-full md:w-[75%] mx-auto pt-20 md:pt-28">
                    <div className="grid grid-cols-[1fr_140px_1fr] gap-14">

                        {/* LEFT COLUMN */}
                        <div className="flex flex-col justify-between text-neutral-white">
                            {challenges.map((item) => (
                                <div
                                    key={item.id}
                                    className="text-right"
                                >
                                    <h3 className="text-[20px] md:text-[40px] font-poppins font-semibold">
                                        <span>0</span>{item.challenge_display_order}
                                    </h3>

                                    <h2 className="text-[20px] md:text-[24px] font-semibold font-poppins mt-2 ">
                                        {item.challenge_title}
                                    </h2>

                                    <p className="text-[18px] font-medium mt-6 leading-7 text-[#ECF0F1]">
                                        {item.challenge_desc}
                                    </p>
                                </div>
                            ))}

                        </div>

                        {/* CENTER */}
                        <div className="relative flex flex-col items-center justify-between h-225 ">
                            {/* ONE LONG DASHED LINE */}
                            <div className="absolute top-0 bottom-0 border-l-3 text-neutral-white border-dashed border-light"></div>

                            {icons.map((icon, index) => (
                                <div
                                    key={index}
                                    className="w-20 h-20 rounded-full bg-[#0F6A58]
                                    border-3 border-white text-white text-[36px]
                                    flex items-center justify-center z-10"
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex flex-col justify-between text-neutral-white">
                            {solutions.map((item) => (
                                <div
                                    key={item.id}
                                    className="text-left"
                                >
                                    <h3 className="text-[20px] md:text-[40px] font-poppins font-semibold">
                                        <span>0</span>{item.solution_display_order}
                                    </h3>

                                    <h2 className="text-[20px] md:text-[24px] font-semibold font-poppins mt-2 ">
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
            </div>
        </div>
    )
}

export default ProjectFixes;