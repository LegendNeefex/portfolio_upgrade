
"use client";

import { useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import stateHandler from "../Context/stateHandler";

import Image from "next/image";
import StackTags from "../Shared/stackTags";
import { FaEye } from "react-icons/fa";

function Projects() {
    const router = useRouter();

    const { selectedProject, setSelectedProject, setRouteLoading } = useContext(stateHandler);

    const [openingProject, setOpeningProject] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState({
        projectFilter: "ALL",
    });

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) {
                console.log(error);
            } else {
                setData(data);
            }

            setLoading(false);
        }

        fetchProjects();
    }, []);

    const openProject = (item) => {
        if (openingProject) return;

        setOpeningProject(item.slug);

        // keep project in context
        setSelectedProject(item);


        // trigger loader for route navigation
        setRouteLoading(true);

        router.push(`/projects/${item.slug}`);
    };

    const selectFilter = (option) => {
        setFilter({
            projectFilter: option,
        });
    };

   const normalize = (text) =>
    text.toLowerCase().replace(/s$/, "").trim();

    const filteredProjects =
        filter.projectFilter === "ALL"
        ? data
        : data.filter((project) =>
        project.miniTags?.some(
            (tag) =>
            normalize(tag) === normalize(filter.projectFilter)
        )
    );

    const getTagColor = (slug, index) => {
        switch (slug) {
            case "shupp":
                return index === 0 ? "bg-dark-bluey" : "bg-primary";

            case "ayur":
                return "bg-[#A94627]";

            case "saxton_store":
                return "bg-dark-bluey";

            case "nest":
                return "bg-dark-bluey";

            case "vista_vault":
                return "bg-primary";

            case "SMS":
                return "bg-[#A94627]";

            case "mini_store":
                return "bg-primary";

            case "portfolio":
                return "bg-dark-bluey";

            case "collections":
                return "bg-[#2F2D2D]";

            default:
                return "bg-dark-bluey";
        }
    };

    return (
        <div id="projects" className="bg-section-primary">
            <div className="w-[95%] m-auto flex py-8 flex-col gap-4">

                <div>
                    <div className="flex">
                        <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second relative top-2.5"></div>

                        <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">
                            MY PROJECTS
                        </p>
                    </div>

                    <h2 className="text-[24px] font-bold text-muted font-montserrat mb-2">
                        Projects i have worked on ?
                    </h2>

                    <div className="flex gap-3 flex-wrap">

                        {["ALL","UI/UX","WEBSITES","GRAPHICS"].map((option)=>(

                            <button
                                key={option}
                                onClick={()=>selectFilter(option)}
                                className={`border-2 rounded-full px-5 py-2 mt-3 font-semibold transition-all duration-300 cursor-pointer

                                ${
                                    filter.projectFilter===option
                                        ? "bg-primary text-white border-transparent"
                                        : "border-primary text-[#DDDEDE] hover:bg-primary hover:border-transparent"
                                }`}
                            >
                                {option}
                            </button>

                        ))}

                    </div>
                </div>

                <div className="mt-8 mb-14">

                    {loading ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                            {[1,2,3].map((i)=>(

                                <div
                                    key={i}
                                    className="bg-[#DDDEDE] rounded-[30px] h-64 animate-pulse opacity-40"
                                />

                            ))}

                        </div>

                    ) : (

                        <div
                            key={filter.projectFilter}
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                xl:grid-cols-3
                                gap-10
                                animate-fade
                            "
                        >

                            {filteredProjects.map((item)=>(

                                <div
                                    key={item.id}
                                    className="
                                        bg-[#DDDEDE]
                                        w-full
                                        max-w-none
                                        justify-self-stretch
                                        rounded-[30px]
                                        px-4
                                        pt-4
                                        pb-8
                                        flex
                                        flex-col
                                        min-h-162.5
                                    "
                                >

                                    <Image
                                        src={item.thumbnail_url}
                                        alt={item.project_title}
                                        width={300}
                                        height={300}
                                        quality={100}
                                        className="rounded-[30px] w-full h-62.5 object-cover"
                                    />

                                    <div className="flex flex-col flex-1 mt-6">

                                        <h3 className="font-outfit font-bold text-[28px] text-black">
                                            {item.project_title}
                                        </h3>

                                        <p className="font-openSans text-[16px] text-[#2F2D2D] leading-7 mt-3 line-clamp-4">
                                            {item.project_desc}
                                        </p>

                                        <div className="mt-auto flex justify-between items-center">

                                            <div className="flex gap-3 flex-wrap">

                                                {item.miniTags?.map((tag,index)=>(

                                                    <StackTags
                                                        key={index}
                                                        text={tag}
                                                        color={getTagColor(item.slug,index)}
                                                        tagColor="text-[#DDDEDE]"
                                                    />

                                                ))}

                                            </div>

                                            <div
                                                onClick={()=>openProject(item)}
                                                className="bg-neutral-white rounded-full w-35 h-15 shadow-frame relative overflow-hidden cursor-pointer"
                                            >

                                                <p
                                                    className={`absolute left-5 top-1/2 -translate-y-1/2 font-openSans font-semibold text-[18px] text-[#2F2D2D] transition-all duration-700

                                                    ${
                                                        openingProject===item.slug
                                                        ? "opacity-0 scale-75 translate-x-4"
                                                        : "opacity-100 scale-100 translate-x-0"
                                                    }`}
                                                >
                                                    View
                                                </p>

                                                <div
                                                    className={`absolute top-1/2 right-1 -translate-y-1/2
                                                    h-13
                                                    w-13
                                                    rounded-full
                                                    bg-[#2F2D2D]
                                                    flex
                                                    items-center
                                                    justify-center
                                                    transition-transform
                                                    duration-1200
                                                    ease-[cubic-bezier(0.22,1,0.36,1)]

                                                    ${
                                                        openingProject===item.slug
                                                        ? "-translate-x-20"
                                                        : "translate-x-0"
                                                    }`}
                                                >

                                                    <FaEye className="text-white text-[20px]" />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </div>
    );

}

export default Projects;
