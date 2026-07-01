"use client";

import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';

function Banner() {
    // const {theme,themeHandler} = useContext(ApiProvider)

  return (
        <div className="bg-linear-to-r from-secondary min-h-screen to-primary overflow-hidden " id='home'>
            <div className="flex flex-col-reverse justify-between items-center lg:flex-row lg:justify-between  w-[95%] m-auto py-20 lg:pt-30 relative mt-18 lg:mt-48" >
                <div className=" text-muted w-full mt-14 lg:mt-0 text-center lg:text-left lg:w-auto">
                    <h3 className='text-[24px] font-lato font-semibold text-accent'>Hello, My name is</h3>
                    <h2 className='text-[48px] lg:text-[60px] font-montserrat font-bold py-1'>Ifeoluwa Oladepo</h2>
                    <div className="flex flex-col gap-4 lg:flex-row items-center">
                        <div className="w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0"></div>
                        <p className="px-2.5 text-[20px] font-openSans font-medium">Full-Stack Web Developer (PERN) & UI/UX Designer</p>
                    </div>
                    <ScrollLink to="about-me" smooth={true} duration={700} offset={-70} className='py-3 px-12 rounded-full bg-linear-to-r from-btn-first to-btn-second text-[18px] font-semibold font-montserrat shadow-frame cursor-pointer hover:scale-98 duration-500 inline-block mt-7'>
                        Know More
                    </ScrollLink>
                </div>
                <div className="pointer-events-none">
                    <div className="hidden lg:block absolute right-40 -top-15 bg-accent opacity-50 w-120 h-120 rounded-full blur-xl"></div>
                    <div
                        className="
                            lg:absolute
                            right-0
                            top-2

                            w-52 h-auto
                            sm:w-80   
                            md:w-100
                            lg:w-200

                            md:right-2
                            md:-top-8

                            lg:right-1
                            lg:-top-25
                        "
                    >
                        <Image
                            src="/Image/Pic.png"
                            width={800}
                            height={500}
                            alt="Ifeoluwa Oladepo's picture"
                            className="
                                w-full
                                h-auto
                                bg-[#222121]
                                rounded-[28px]
                                md:rounded-[35px]
                                lg:bg-transparent
                                lg:rounded-none
                            "
                            priority
                            quality={100}
                            unoptimized
                        />
                    </div>
                </div>
                <div className='hidden lg:block rounded-lg z-10 px-2 py-2 pointer-events-none bg-muted'>
                    <MdVerified className="text-primary text-[40px]" />
                </div>
            </div>
        </div>
    )
}

export default Banner