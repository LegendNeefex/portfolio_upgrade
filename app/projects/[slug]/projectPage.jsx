"use client"

import { useContext, useEffect, useState, useRef } from "react"
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
    const { selectedProject, setSelectedProject } = useContext(stateHandler)
    const { slug } = useParams()
    const [loading, setLoading] = useState(!selectedProject)
    const [loaded, setLoaded] = useState(false);
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const hasScrolled = useRef(false);



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

    useEffect(() => {
        if (!selectedProject) {
            async function backUpFetch() {
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("slug", slug)
                    .single();

                if (error) {
                    console.log(error);
                } else {
                    setSelectedProject(data);
                    fetchAssets(data.slug);
                }
                setLoading(false);
            }
            backUpFetch();
        } else {
            setLoading(false);
            fetchAssets(selectedProject.slug);
        }
    }, [slug])

    async function fetchAssets(projectSlug) {
        const { data, error } = await supabase.storage
            .from("projects_assets")
            .list(`${projectSlug}/assets`);

        if (error) {
            console.log(error);
        } else {
            const urls = data.map((file) => {
                const { data: urlData } = supabase.storage
                    .from("projects_assets")
                    .getPublicUrl(`${projectSlug}/assets/${file.name}`);
                return { url: urlData.publicUrl, name: file.name };
            });
            setAssets(urls);
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

    if (loading) return <PageLoader text="Loading Project" controlled={true} />
    
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
                            w-[50%] m-auto py-8 flex flex-col gap-30
                            transition-all duration-1200 ease-out
                            ${loaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"}
                        `}
                    >
                        <div
                            className={`
                                flex justify-between bg-muted rounded-full py-5 px-8 items-center
                                transition-all duration-700 ease-out
                                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
                            `}
                        >
                            <a href={`/projects/${slug}`}>
                                <h2 className='text-frame-primary font-montserrat font-extrabold text-[24px]'>Neefex .</h2>
                            </a>
                            <ul className='flex gap-4 items-center'>
                                <li>
                                    <ScrollLink onClick={() => handleSetActive("gallery")} className={`p-3 no-underline text-[#0F6A58] text-[16px] font-lato font-medium cursor-pointer border-2 border-[#0F6A58] rounded-xl ${activeSection === "gallery" ? "bg-[#0F6A58] text-neutral-white" : ""}`} to="gallery" smooth={true} duration={300} offset={-70}>
                                        Gallery
                                    </ScrollLink>
                                </li>
                                <li> 
                                    <ScrollLink onClick={() => handleSetActive("features")} className={`p-3 no-underline text-[#0F6A58] text-[16px] font-lato font-medium cursor-pointer border-2 border-[#0F6A58] rounded-xl ${activeSection === "features" ? "bg-[#0F6A58] text-neutral-white" : ""}`} to="features" smooth={true} duration={300} offset={-70}>
                                        Features
                                    </ScrollLink>
                                </li>
                                <li> 
                                    <Link href={"/#projects"} className={`p-3 no-underline text-[#0F6A58] text-[16px] font-lato font-medium cursor-pointer border-2 border-[#0F6A58] rounded-xl`}>
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
                                <div className="flex justify-center">
                                    <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                                    <p className="px-2.5 text-[16px] font-medium font-montserrat text-[#DDDEDE]">{selectedProject.project_tag}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-[60px] font-extrabold text-muted font-montserrat mb-2">{selectedProject.project_title}</h2>
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
                <div className="w-[95%] m-auto pt-8 pb-14">
                    <div className="flex flex-col gap-14">
                        <div>
                            <div className="flex">
                                <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                                <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">GALLERY</p>
                            </div>
                            <h2 className="text-[24px] font-bold text-muted font-montserrat">Visual Representation</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {assets.map((asset, index) => {
                                const isVideo = asset.name.endsWith(".mp4") || asset.name.endsWith(".mov");

                                return isVideo ? (
                                    <video
                                        key={index}
                                        src={asset.url}
                                        controls
                                        className="col-span-3 w-full rounded-2xl"
                                    />
                                ) : (
                                    <div key={index}>
                                        <Image
                                            src={asset.url}
                                            alt={asset.name}
                                            width={600}
                                            height={400}
                                            style={{ height: "auto" }}
                                            unoptimized
                                            className="rounded-2xl w-full object-cover cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:opacity-90"
                                            onClick={() => setSelectedAsset(asset)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* section 4 */}
            <ProjectFixes />

            {/* section 5 */}
            <ProjectFeatures />

            {/* section 6 */}
            <div className="bg-[#353535]">
                <div className="w-[95%] m-auto pt-8 pb-0 relative">
                    <div>
                        <div className="flex">
                            <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                            <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">TALK WITH ME</p>
                        </div>
                        <h2 className="text-[24px] font-bold text-muted font-montserrat">Interested In Something Similar?</h2>
                    </div>
                    <div className="relative flex justify-between items-center overflow-hidden min-h-125">
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
                        <div className="flex flex-col justify-between gap-6 text-center w-[30%] ml-auto mr-50">
                            <h2 className="text-[48px] font-poppins font-semibold text-[#1ABC9C]">Do You Like What you See?</h2>
                            <p className="text-[#ECF0F1] font-openSans font-medium text-[18px]">Let's discuss how I can help bring your idea to life.</p>
                            <Link href="/#get-quote" className='py-3 px-12 rounded-full bg-linear-to-r from-btn-first to-btn-second text-[18px] font-semibold font-montserrat shadow-frame cursor-pointer hover:scale-98 duration-500 inline-block mt-7'>
                                Get Quote
                            </Link>
                        </div>
                    </div>
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

// app/projects/[slug]/page.jsx
export async function generateMetadata({ params }) {
    const { slug } = await params;

    const { data } = await supabase
        .from("projects")
        .select("project_title, project_overview, thumbnail_url")
        .eq("slug", slug)
        .single();

    return {
        title: data?.project_title, // becomes "Shupp | Ifeoluwa Oladepo" via template
        description: data?.project_overview,
        openGraph: {
            title: data?.project_title,
            description: data?.project_overview,
            images: [{ url: data?.thumbnail_url }],
        },
    };
}