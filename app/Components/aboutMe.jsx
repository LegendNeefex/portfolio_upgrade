import { FaStar, FaRegStar  } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import Link from "next/link"

import MeCards from "../Shared/meCards";


export default function AboutMe() {
   return (
    <div className="bg-section-primary transition-colors duration-1000 ease-in-out py-14" id="about-me">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 w-[95%] m-auto">
            
            {/* Left side */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex">
                        <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                        <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">ABOUT ME</p>
                    </div>
                    <h2 className="text-[24px] font-bold text-muted font-montserrat">Who Am I ?</h2>
                </div>
                <p className="text-[16px] font-medium text-muted font-openSans">My name is Ifeoluwa Oladepo, a dedicated and results-driven <span className="text-accent font-semibold">Full-Stack Web Developer (PERN Stack), UI/UX & Graphic Designer</span> based in Lagos, Nigeria. I specialize in building scalable, high-performance web applications while crafting clean, intuitive, and visually compelling user experiences.</p>
                <p className="text-[16px] font-medium text-muted font-openSans">With strong hands-on experience across the full development lifecycle, I design and develop modern web solutions; from database architecture and RESTful API integration to responsive, pixel-perfect interfaces. I am skilled in translating ideas and business goals into functional, user-centered digital products that perform seamlessly across devices and browsers.</p>
                <p className="text-[16px] font-medium text-muted font-openSans">Beyond development, my background in UI/UX and graphic design allows me to approach projects with both technical precision and creative insight, ensuring every product is not only efficient under the hood but also engaging and easy to use. I value clean, maintainable code, attention to detail, and continuous learning, and I'm always focused on delivering premium-quality solutions that make real impact.</p>
                <div className="flex flex-col h-full justify-between gap-7">
                    <div className="bg-passport-bg py-7 px-13 my-2.5">
                        <div className="flex justify-between">
                            <div className="flex flex-col justify-between gap-7">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">Adobe Photoshop</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStarHalfStroke className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">HTML5</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStarHalfStroke className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">CSS3</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStarHalfStroke className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">JavaScript</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStarHalfStroke className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between gap-7">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">Tailwind CSS</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">Figma</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">React.js</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">Next.js</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between gap-7">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">Express.js</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">PostgreSQL</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">Node.js</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaRegStar className="text-primary pr-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[16px] font-semibold text-neutral-white font-outfit">Version Controls</p>
                                    <div className="flex gap-2 text-[26px]">
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                        <FaStar className="text-primary pr-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link className="py-3 px-6 bg-linear-to-r from-btn-first to-btn-second rounded-full shadow-frame w-full text-center text-[18px] text-neutral-white font-montserrat font-bold hover:scale-98 duration-500 inline-block" href='/Document/My-CV.pdf' download="My CV.pdf" target="_blank">
                        DOWNLOAD CV
                    </Link>
                </div>
            </div>

            <div className="grid grid-rows-3 gap-6">
                <MeCards bgColor="bg-[#127D68]" num="01" lineCol="bg-[#1ABC9C]" text="Great products aren't built with code alone. They are built where design, strategy, and technology meet." />
                <MeCards bgColor="bg-dark-orange" numType={false} num="02" lineCol="bg-[#FF7043]" text="Every project starts with an idea. My job is to transform that idea into a functional, engaging, and impactful digital experience." />
                <MeCards bgColor="bg-dark-bluey" num="03" lineCol="bg-[#6BA6FF]" text="I don't just build websites—I create solutions that help businesses grow, connect with their audience, and achieve their goals." />
            </div>

        </div>
    </div>
  )
}