"use client"

import { useContext, useEffect, useState, useRef, useCallback } from "react"
import { useParams } from "next/navigation"
import stateHandler from "@/app/Context/stateHandler";
import { supabase } from "@/app/lib/supabase";
import Image from "next/image";
import Footer from "@/app/Components/footer";
import { Link as ScrollLink } from 'react-scroll';
import Link from "next/link";
import StackTags from "@/app/Shared/stackTags";
import ProjectOverview from "@/app/Components/prodDetails/projectOverview";
import ProjectFixes from "@/app/Components/prodDetails/project_fixes"
import ProjectFeatures from "@/app/Components/prodDetails/project_features";
import { IoIosArrowUp } from "react-icons/io";
import PageLoader from "@/app/Components/pageLoader";

function ProjectPage() {
    const [activeSection, setActiveSection] = useState("");
    const ctx = useContext(stateHandler)
    const { selectedProject, setSelectedProject, routeLoading, setRouteLoading } = ctx || {}
    const [loading, setLoading] = useState(!selectedProject);
    const [loaded, setLoaded] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const hasScrolled = useRef(false);
    
    
    const { slug } = useParams()



    useEffect(() => {
        const sections = [
            { id: "features", target: "features" },
            { id: "gallery", target: "gallery" },
        ];
        
        const observers = sections.map(({ id, target }) => {
            const element = document.getElementById(target);
            if (!element) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && hasScrolled.current) {
                        setActiveSection(id);
                    } else if (!entry.isIntersecting && hasScrolled.current) {
                        setActiveSection((prev) => prev === id ? "" : prev);
                    }
                },
                {
                    rootMargin: "-110px 0px -55% 0px",
                    threshold: 0    
                }
            );

            observer.observe(element);
            return { observer, element };
        });

        const timer = setTimeout(() => {
            hasScrolled.current = true;
        }, 500);

        return () => {
            clearTimeout(timer);
            observers.forEach((obs) => {
                if (obs) obs.observer.unobserve(obs.element);
            });
        };
    }, [])


    const loadProject = useCallback(async () => {
        setLoading(true);

        try {
            const cacheKey = `project_${slug}`;
            const cached = sessionStorage.getItem(cacheKey);

            if (cached) {
                const cachedData = JSON.parse(cached);
                setSelectedProject(cachedData);
                await fetchAssets(cachedData.slug);
                return;
            }

            const result = await Promise.race([
                supabase
                    .from("projects")
                    .select("*")
                    .eq("slug", slug)
                    .single(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timed out")), 5000)
                )
            ]);

            const { data, error } = result;

            if (error || !data) throw new Error("Project not found");

            sessionStorage.setItem(cacheKey, JSON.stringify(data));

            setSelectedProject(data);
            await fetchAssets(data.slug);
        } catch (err) {
            setError(err.message);
            setLoading(false);

            if (setRouteLoading) {
                setRouteLoading(false);
            }
        }
    }, [slug, setSelectedProject, setRouteLoading]);

    useEffect(() => {
        loadProject();
    }, [slug], loadProject)

    useEffect(() => {
        if (selectedAsset) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [selectedAsset]);

    async function fetchAssets(projectSlug) {
        try {
            const result = await Promise.race([
                supabase.storage
                    .from("projects_assets")
                    .list(`${projectSlug}/assets`),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Assets timed out")), 8000)
                )
            ]);

            const { data, error } = result;

            if (error) throw error;

            const urls = data
                .filter(file => !file.name.startsWith('.'))
                .map(file => {
                    const { data: urlData } = supabase.storage
                        .from("projects_assets")
                        .getPublicUrl(`${projectSlug}/assets/${file.name}`);
                    return { url: urlData.publicUrl, name: file.name };
                });

            setAssets(urls);

        } catch (err) {
            console.log("Assets fetch failed:", err.message);
            // don't show error for assets — just show empty gallery
            setAssets([]);
        } finally {
            setLoading(false);
            if (setRouteLoading) setRouteLoading(false);
        }
    }
        
    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setLoaded(true);
            }, 120);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const handleSetActive = (section) => {
        setActiveSection(section);
        setTimeout(() => {
            setActiveSection("")
        }, 3000);
    };

    const tagColors = [
        "bg-dark-bluey text-[#DDDEDE]",
        "bg-[#A94627] text-[#DDDEDE]", 
        "bg-primary text-[#DDDEDE]",
        "bg-neutral-white text-[#127D68]",
    ];
    
    
   const [error, setError] = useState(null);
    if (loading || routeLoading) return <PageLoader text="Loading Project" controlled={true} />

    if (error) return (
        <div className="w-full h-screen bg-[#1a1a1a] flex flex-col items-center justify-center gap-6">
            <h1 className="text-[#1ABC9C] font-montserrat font-bold text-[48px]">Oops!</h1>
            <p className="text-white font-openSans text-[18px] text-center px-6">
                This project is temporarily unavailable or doesn't exist anymore.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => {
                        setError(null);
                        setLoading(true);
                        loadProject();
                    }}
                    className="py-3 px-8 bg-linear-to-r from-btn-first to-btn-second rounded-full text-white font-montserrat font-semibold hover:scale-95 duration-300 cursor-pointer"
                >
                    Retry
                </button>
                <a
                    href="/"
                    className="py-3 px-8 border-2 border-[#1ABC9C] rounded-full text-[#1ABC9C] font-montserrat font-semibold hover:scale-95 duration-300"
                >
                    Go Home
                </a>
            </div>
        </div>
    )

    return (
        <>
            {/* Image Overlay */}
            {selectedAsset && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6"
                    onClick={() => setSelectedAsset(null)}
                >
                    <div className="absolute top-6 right-6">
                        <button
                            onClick={() => setSelectedAsset(null)}
                            className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                    <div
                        className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedAsset.url}
                            alt={selectedAsset.name}
                            width={1200}
                            height={800}
                            style={{ height: "auto", maxHeight: "85vh" }}
                            className="rounded-2xl object-contain w-full"
                            unoptimized
                        />
                    </div>
                    <p className="text-white/50 font-lato text-[14px] mt-4">
                        {selectedAsset.name}
                    </p>
                </div>
            )}

            <div className="bg-linear-to-br from-[#122E2A] to-[#0a1f1c] relative overflow-hidden min-h-screen">
                <Image
                    src="/Image/watermarks/bubbles.png"
                    alt="bubble watermark background"
                    fill
                    quality={100}
                    className="object-cover opacity-15 mix-blend-overlay pointer-events-none"
                />
                <div className="w-[95%] m-auto relative z-10">
                    <div
                        className={`
                            w-full lg:w-[50%] m-auto py-8 flex flex-col gap-20
                            transition-all duration-1200 ease-out
                            ${loaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"}
                        `}
                    >
                        <div
                            className={`
                                flex justify-between items-center bg-muted rounded-full py-3 px-5 lg:py-5 lg:px-8
                                transition-all duration-700 ease-out
                                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
                            `}
                        >
                            {/* Logo */}
                            <a href={`/projects/${slug}`}>
                                <h2 className='text-frame-primary font-montserrat font-extrabold text-[18px] lg:text-[24px]'>
                                    Neefex .
                                </h2>
                            </a>

                            {/* Nav links */}
                            <ul className='flex gap-2 lg:gap-4 items-center'>
                                <li>
                                    <ScrollLink
                                        onClick={() => handleSetActive("gallery")}
                                        className={`
                                            p-2 lg:p-3 no-underline text-[#0F6A58] text-[13px] lg:text-[16px]
                                            font-lato font-medium cursor-pointer border-2 border-[#0F6A58] rounded-xl
                                            ${activeSection === "gallery" ? "bg-[#0F6A58] text-neutral-white" : ""}
                                        `}
                                        to="gallery"
                                        smooth={true}
                                        duration={300}
                                        offset={-70}
                                    >
                                        Gallery
                                    </ScrollLink>
                                </li>
                                <li>
                                    <ScrollLink
                                        onClick={() => handleSetActive("features")}
                                        className={`
                                            p-2 md:p-3 no-underline text-[#0F6A58] text-[13px] md:text-[16px]
                                            font-lato font-medium cursor-pointer border-2 border-[#0F6A58] rounded-xl
                                            ${activeSection === "features" ? "bg-[#0F6A58] text-neutral-white" : ""}
                                        `}
                                        to="features"
                                        smooth={true}
                                        duration={300}
                                        offset={-70}
                                    >
                                        Features
                                    </ScrollLink>
                                </li>
                                <li>
                                    <Link
                                        href={"/#projects"}
                                        className="p-2 md:p-3 no-underline text-[#0F6A58] text-[13px] md:text-[16px] font-lato font-medium cursor-pointer border-2 border-[#0F6A58] rounded-xl"
                                    >
                                        Projects
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-20">
                            <div
                                className={`
                                    flex flex-col gap-4 text-center
                                    transition-all duration-1000 delay-200 ease-out
                                    ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                                `}
                            >
                                <div className="flex flex-col gap-2 text-center">
                                    <div className="flex md:flex-row flex-col items-center justify-center gap-4">
                                        <div className="flex w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative"></div>
                                        <p className="text-[16px] font-medium text-muted font-montserrat">{selectedProject.project_tag}</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-[48px] lg:text-[60px] font-extrabold text-muted font-montserrat mb-2">{selectedProject.project_title}</h2>
                                    <p className="text-[18px] font-openSans font-medium text-[#DDDEDE]">{selectedProject.project_desc}</p>
                                </div>
                            </div>
                            <div
                                className={`
                                    flex gap-6 justify-center flex-wrap
                                    transition-all duration-700 delay-500 ease-out
                                    ${loaded ? "opacity-100" : "opacity-0"}
                                `}
                            >
                                {selectedProject.stack_tag?.map((tag, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            transition-all duration-700 ease-out
                                            ${loaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
                                        `}
                                        style={{ transitionDelay: `${600 + index * 120}ms` }}
                                    >
                                        <StackTags
                                            text={tag}
                                            color={tagColors[index % tagColors.length]}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <ProjectOverview />
            
            {/* section 3 */}
            <div id="gallery" className="bg-[#414141]">
                <div className="w-[95%] m-auto pt-18 pb-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        {assets.map((asset, index) => {
                            const isVideo =
                                asset.name.endsWith(".mp4") ||
                                asset.name.endsWith(".mov");
                            return isVideo ? (
                            <video
                                key={`${asset.name}-${index}`}
                                src={asset.url}
                                controls
                                preload="metadata"
                                className="col-span-1 sm:col-span-2 lg:col-span-3 w-full rounded-2xl"
                            />
                        ) : (
                            <div
                                key={`${asset.name}-${index}`}
                                className="relative h-56 sm:h-72 lg:h-90 rounded-2xl overflow-hidden cursor-pointer"
                                onClick={() => setSelectedAsset(asset)}
                            >
                                {!loadedImages[index] && (
                                    <div className="absolute inset-0 bg-linear-to-br from-[#313131] via-[#494949] to-[#313131] animate-pulse" />
                                )}
                                <Image
                                    src={asset.url}
                                    fill
                                    alt={asset.name}
                                    onLoad={() =>
                                        setLoadedImages(prev => ({
                                            ...prev,
                                            [index]: true,
                                        }))
                                    }
                                    className={`object-cover transition-opacity duration-500 ${
                                        loadedImages[index] ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            </div>
                        );
                        })}
                    </div>
                </div>
            </div>

            {/* section 4 */}
            <ProjectFixes />

            {/* section 5 */}
            <ProjectFeatures />

            {/* section 6 */}
            <div className="bg-[#353535]">
                <div className="w-[95%] m-auto pt-8 pb-6 relative">
                    
                    {/* Header */}
                    <div className="flex flex-col gap-2 md:text-left text-center">
                        <div className="flex md:justify-start items-center justify-center gap-4">
                            <div className="flex w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative"></div>
                            <p className=" text-[16px] font-medium text-muted font-montserrat">TALK WITH ME</p>
                        </div>
                        <h2 className="text-[24px] font-bold text-muted font-montserrat">Interested In Something Similar?</h2>
                    </div>

                    {/* MOBILE + TABLET */}
                    <div className="lg:hidden flex flex-col items-center text-center gap-6 pt-10 pb-16">
                        <Image
                            src="/Image/random.png"
                            width={260}
                            height={260}
                            alt="random picture"
                            quality={100}
                            unoptimized={true}
                            priority
                            className="object-contain lg:bg-transparent bg-[#DDDEDE] opacity-50 rounded-[20px]"
                        />
                        <h2 className="text-[32px] md:text-[40px] font-poppins font-semibold text-[#1ABC9C] leading-tight">
                            Do You Like What You See?
                        </h2>
                        <p className="text-[#ECF0F1] font-openSans font-medium text-[16px] md:text-[18px] max-w-md">
                            Let's discuss how I can help bring your idea to life.
                        </p>
                        <Link
                            href="/#get-quote"
                            className="py-3 px-10 rounded-full bg-linear-to-r from-btn-first to-btn-second text-[16px] md:text-[18px] font-semibold font-montserrat shadow-frame cursor-pointer hover:scale-98 duration-500 inline-block"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden lg:block ">
                        <div className=" flex justify-between items-center overflow-hidden min-h-125">
                            <Image
                                src="/Image/random.png"
                                width={400}
                                height={400}
                                alt="random picture"
                                className="absolute bottom-0 left-0"
                                quality={100}
                                unoptimized={true}
                                priority
                            />
                            <div className="flex flex-col justify-between gap-6 text-center w-[35%] ml-auto mr-50">
                                <h2 className="text-[48px] font-poppins font-semibold text-[#1ABC9C]">
                                    Do You Like What You See?
                                </h2>
                                <p className="text-[#ECF0F1] font-openSans font-medium text-[18px]">
                                    Let's discuss how I can help bring your idea to life.
                                </p>
                                <Link
                                    href="/#get-quote"
                                    className="py-3 px-12 rounded-full bg-linear-to-r from-btn-first to-btn-second text-[18px] font-semibold font-montserrat shadow-frame cursor-pointer hover:scale-98 duration-500 inline-block mt-7"
                                >
                                    Get Quote
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Scroll to top button */}
                    <div
                        className="bg-muted shadow-frame w-12 h-12 rounded-full text-primary absolute right-0 bottom-6 cursor-pointer hover:scale-110 duration-500 flex items-center justify-center"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <IoIosArrowUp className="text-[28px]" />
                    </div>

                </div>
            </div>

            {/* section 7 */}
            <Footer />
        </>
    );
}

export default ProjectPage;
