"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import stateHandler from "../Context/stateHandler";
import Image from "next/image";
import StackTags from "../Shared/stackTags";
import { FaEye, FaSpinner } from "react-icons/fa";


function Projects() {
    const router = useRouter();
    const { setSelectedProject, setRouteLoading } = useContext(stateHandler);
    const [openingProject, setOpeningProject] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ projectFilter: "ALL" });
    const [error, setError] = useState(null);
    const [loadedThumbs, setLoadedThumbs] = useState({});

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // check sessionStorage first
            const cached = sessionStorage.getItem("projects");
            if (cached) {
                setData(JSON.parse(cached));
                setLoading(false);
                return;
            }

            const { data, error } = await Promise.race([
                supabase
                    .from("projects")
                    .select("*")
                    .order("display_order", { ascending: true }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timed out")), 8000)
                )
            ]);

            if (error) throw error;

            // save to session cache
            sessionStorage.setItem("projects", JSON.stringify(data));
            setData(data);

        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setOpeningProject(null);
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const openProject = (item) => {
    if (openingProject) return;

        setOpeningProject(item.slug);

        setTimeout(() => {
            setSelectedProject(item);
            setRouteLoading(true);
            router.push(`/projects/${item.slug}`);
        }, 1100);
    };

    const selectFilter = (option) => {
        setFilter({ projectFilter: option });
    };

    const normalize = (text) => text.toLowerCase().replace(/s$/, "").trim();

    const filteredProjects =
        filter.projectFilter === "ALL"
            ? data
            : data.filter((project) =>
                project.miniTags?.some(
                    (tag) => normalize(tag) === normalize(filter.projectFilter)
                )
            );

    const getTagColor = (slug, index) => {
        switch (slug) {
            case "shupp": return index === 0 ? "bg-dark-bluey" : "bg-primary";
            case "ayur": return "bg-[#A94627]";
            case "saxton_store": return "bg-dark-bluey";
            case "nest": return "bg-dark-bluey";
            case "vista_vault": return "bg-primary";
            case "SMS": return "bg-[#A94627]";
            case "mini_store": return "bg-primary";
            case "portfolio": return "bg-dark-bluey";
            case "collections": return "bg-[#2F2D2D]";
            default: return "bg-dark-bluey";
        }
    };

    return (
        <div id="projects" className="bg-section-primary">
            <div className="w-[95%] m-auto flex py-8 flex-col gap-4">
                <div className="flex flex-col gap-4 md:text-left text-center">
                    <div className="flex flex-col gap-2 md:text-left text-center">
                        <div className="flex md:justify-start items-center justify-center gap-4">
                            <div className="flex w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative"></div>
                            <p className=" text-[16px] font-medium text-muted font-montserrat">MY PROJECTS</p>
                        </div>
                        <h2 className="text-[24px] font-bold text-muted font-montserrat">Projects i have worked on?</h2>
                    </div>
                    <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                        {["ALL", "UI/UX", "WEBSITES", "GRAPHICS"].map((option) => (
                            <button
                                key={option}
                                onClick={() => selectFilter(option)}
                                className={`border-2 rounded-full px-5 py-2 mt-3 font-semibold transition-all duration-300 cursor-pointer
                                    ${filter.projectFilter === option
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-[#DDDEDE] rounded-[30px] h-64 animate-pulse opacity-40" />
                            ))}
                        </div>

                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <p className="text-[#1ABC9C] font-montserrat font-bold text-[24px]">Oops!</p>
                            <p className="text-muted font-openSans text-[16px] text-center">
                                Projects are temporarily unavailable. Please check back shortly.
                            </p>
                            <button
                                onClick={fetchProjects} // ← now works!
                                className="py-2 px-8 bg-linear-to-r from-btn-first to-btn-second rounded-full text-white font-montserrat font-semibold hover:scale-95 duration-300 cursor-pointer"
                            >
                                Retry
                            </button>
                        </div>

                    ) : filteredProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <p className="text-muted font-openSans text-[16px]">No projects found for this category.</p>
                        </div>

                    ) : (
                        // ← single grid, no nesting
                        <div
                            key={filter.projectFilter}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade"
                        >
                            {filteredProjects.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#DDDEDE] w-full rounded-[30px] px-4 pt-4 pb-8 flex flex-col min-h-162.5"
                                >
                                    <div className="relative w-full h-62.5 rounded-[30px] overflow-hidden">
                                        {!loadedThumbs[item.id] && (
                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-linear-to-r
                                                    from-[#d9d9d9]
                                                    via-[#f0f0f0]
                                                    to-[#d9d9d9]
                                                    animate-pulse
                                                "
                                            />
                                        )}

                                        <Image
                                            src={item.thumbnail_url}
                                            alt={item.project_title}
                                            fill
                                            quality={100}
                                            className={`object-cover rounded-[30px] transition-opacity duration-500 ${
                                                loadedThumbs[item.id]
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                            onLoad={() => {
                                                setTimeout(() => {
                                                    setLoadedThumbs(prev => ({
                                                        ...prev,
                                                        [item.id]: true,
                                                    }));
                                                }, 500);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 mt-6 text-center md:text-left">
                                        <h3 className="font-outfit font-bold text-[28px] text-black">{item.project_title}</h3>
                                        <p className="font-openSans text-[16px] text-[#2F2D2D] leading-7 mt-3 line-clamp-4">{item.project_desc}</p>
                                        <div className="mt-auto flex flex-col pt-4 md:pt-0 gap-6 md:gap-0 md:flex-row justify-between items-center">
                                            <div className="flex gap-3 flex-wrap">
                                                {item.miniTags?.map((tag, index) => (
                                                    <StackTags
                                                        key={index}
                                                        text={tag}
                                                        color={getTagColor(item.slug, index)}
                                                        tagColor="text-[#DDDEDE]"
                                                    />
                                                ))}
                                            </div>
                                            <div
                                                onClick={() => openProject(item)}
                                                className="bg-neutral-white rounded-full w-35 h-15 shadow-frame relative overflow-hidden cursor-pointer"
                                            >
                                                <p className={`
                                                    absolute
                                                    left-5
                                                    top-1/2
                                                    -translate-y-1/2
                                                    transition-all
                                                    duration-500
                                                    ${
                                                    openingProject===item.slug
                                                    ?"opacity-0"
                                                    :"opacity-100"
                                                    }
                                                `}
                                                >
                                                    View
                                                </p>
                                                <div
                                                    className={`
                                                        absolute
                                                        top-1/2
                                                        right-1
                                                        -translate-y-1/2
                                                        rounded-full
                                                        bg-[#2F2D2D]
                                                        w-13
                                                        h-13
                                                        flex
                                                        items-center
                                                        justify-center
                                                        transition-all
                                                        duration-700
                                                        ease-in-out
                                                        ${
                                                            openingProject === item.slug
                                                                ? "-translate-x-[78px] -translate-y-1/2"
                                                                : "translate-x-0 -translate-y-1/2"
                                                        }
                                                    `}
                                                >
                                                    {openingProject === item.slug ? (
                                                        <FaSpinner className="text-white text-[20px] animate-spin" />
                                                    ) : (
                                                        <FaEye className="text-white text-[20px]" />
                                                    )}
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