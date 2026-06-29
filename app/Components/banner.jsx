"use client";

import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';

function Banner() {
    // const {theme,themeHandler} = useContext(ApiProvider)

  return (
        <div className="bg-linear-to-r from-secondary min-h-screen to-primary overflow-hidden " id='home'>
            <div className="flex justify-between items-center w-[95%] m-auto pt-30 relative mt-48" >
                <div className=" text-muted">
                    <h3 className='text-[24px] font-lato font-semibold text-accent'>Hello, My name is</h3>
                    <h2 className='text-[60px] font-montserrat font-bold py-1'>Ifeoluwa Oladepo</h2>
                    <div className="flex items-center">
                        <div className="w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0"></div>
                        <p className="px-2.5 text-[20px] font-openSans font-medium">Full-Stack Web Developer (PERN) & UI/UX Designer</p>
                    </div>
                    <ScrollLink to="about-me" smooth={true} duration={700} offset={-70} className='py-3 px-12 rounded-full bg-linear-to-r from-btn-first to-btn-second text-[18px] font-semibold font-montserrat shadow-frame cursor-pointer hover:scale-98 duration-500 inline-block mt-7'>
                        Know More
                    </ScrollLink>
                </div>
                <div className='pointer-events-none'>
                    <div className='absolute right-40 -top-15 bg-accent opacity-50 w-120 h-120 rounded-full blur-xl '></div>
                    <Image
                        src="/Image/Pic.png"
                        width={800}
                        height={500}
                        alt="ifeoluwa oladepo's picture"
                        className="absolute right-1 -top-25 "
                        quality={100} 
                        unoptimized={true} 
                        priority
                    />
                </div>
                <div className='rounded-lg z-10 px-2 py-2 pointer-events-none bg-muted'>
                    <MdVerified className="text-primary text-[40px]" />
                </div>
            </div>
        </div>
    )
}

export default Banner