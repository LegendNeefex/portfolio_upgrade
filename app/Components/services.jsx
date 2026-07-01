
import { MdEdit, MdSupport } from "react-icons/md";
import { FaCode, FaBriefcase, FaPenNib } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import Image from "next/image";

function Services(params) {
    
    return (
        <div className="bg-section-secondary py-8" id="services">
            <div className="flex flex-col relative m-auto w-[95%]" >
                <div className="hidden lg:flex flex-col justify-center h-full gap-70 absolute -left-5 z-1">
                    <Image 
                        src="/Image/watermarks/ps 1.png" 
                        alt="Photoshop Image" 
                        width={100} 
                        height={100} 
                        quality={100} 
                        unoptimized={true} 
                    />

                    <Image 
                        src="/Image/watermarks/react 1.png" 
                        alt="React.js Image" 
                        width={120} 
                        height={120} 
                        quality={100} 
                        unoptimized={true} 
                    />
                </div>
                <div className="hidden lg:flex flex-col justify-center h-full gap-70 absolute -right-5 z-1">
                    <Image 
                        src="/Image/watermarks/code 1.png" 
                        alt="Code Image" 
                        width={120} 
                        height={120} 
                        quality={100} 
                        unoptimized={true} 
                    />

                    <Image 
                        src="/Image/watermarks/figma 1.png" 
                        alt="Figma Image" 
                        width={100} 
                        height={100} 
                        quality={100} 
                        unoptimized={true} 
                    />
                </div>
                <div className="relative">
                    <div className="flex flex-col gap-2 md:text-left text-center">
                        <div className="flex md:justify-start items-center justify-center gap-4">
                            <div className="flex w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative"></div>
                            <p className=" text-[16px] font-medium text-muted font-montserrat">MY SERVICES</p>
                        </div>
                        <h2 className="text-[24px] font-bold text-muted font-montserrat">What can i do ?</h2>
                    </div>
                    <div className="hidden lg:flex gap-7 absolute right-0 -top-5 z-1">
                        <Image 
                        src="/Image/watermarks/node 1.png" 
                        alt="Node.js Image" 
                        width={170} 
                        height={100} 
                        quality={100} 
                        unoptimized={true} />

                        <Image 
                        src="/Image/watermarks/github 1.png" 
                        alt="GitHub Image" 
                        width={120} 
                        height={100} 
                        quality={100} 
                        unoptimized={true} />
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-[90%] m-auto py-4 lg:py-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 w-[85%] mx-auto">
                        <div className="bg-passport-bg p-8 rounded-2xl text-center items-center justify-center flex gap-6 flex-col cursor-pointer hover:scale-99">
                            <MdEdit className="text-[24px] text-primary " />
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[20px] font-semibold text-neutral-white font-outfit">UI/UX Website Design</h3>
                                <p className="text-[15px] font-light font-openSans text-muted">I specialize in crafting visually compelling designs that communicate clear messages and captivate audiences. My work balances creativity with functionality, ensuring each design is both aesthetically pleasing and user-friendly.</p>
                            </div>
                        </div>
                        <div className="bg-passport-bg p-8 rounded-2xl text-center flex flex-col items-center gap-6 cursor-pointer hover:scale-99">
                            <MdSupport className="text-[30px] text-primary " />
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[20px] font-semibold text-neutral-white font-outfit">Fast Support</h3>
                                <p className="text-[15px] font-light font-openSans text-muted">i offer expert support to help you diagnose and resolve issues efficiently, minimizing downtime and ensuring your operations continue smoothly.</p>
                            </div>
                        </div>
                        <div className="bg-passport-bg p-8 rounded-2xl text-center flex flex-col items-center gap-6 cursor-pointer hover:scale-99">
                            <FaCode className="text-[30px] text-primary " />
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[20px] font-semibold text-neutral-white font-outfit">Clean Code</h3>
                                <p className="text-[15px] font-light font-openSans text-muted">I prioritize writing clean, readable code that is easy to understand and maintain. My code follows industry best practices and conventions, making it easier for teams to collaborate and for future developers to work on.</p>
                            </div>
                        </div>
                        <div className="bg-passport-bg p-8 rounded-2xl text-center flex flex-col items-center gap-6 cursor-pointer hover:scale-99">
                            <FaBriefcase className="text-[30px] text-primary " />
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[20px] font-semibold text-neutral-white font-outfit">Frontend Development</h3>
                                <p className="text-[15px] font-light font-openSans text-muted">As a Front-End Developer, I build custom front-end solutions using modern frameworks like React. My expertise includes JavaScript development, creating Single Page Applications (SPAs), and integrating APIs for dynamic content. I provide maintenance services, including updates and bug fixes.</p>
                            </div>
                        </div>
                        <div className="bg-passport-bg p-8 rounded-2xl text-center flex flex-col items-center gap-6 cursor-pointer hover:scale-99">
                            <FaLaptopCode className="text-[30px] text-primary " />
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[20px] font-semibold text-neutral-white font-outfit">Backend Development</h3>
                                <p className="text-[15px] font-light font-openSans text-muted">For backend development, I use Node.js, Express, and PostgresDB. I am proficient in building robust and efficient server-side systems. I ensure that data is securely managed and the application runs seamlessly.</p>
                            </div>
                        </div>
                        <div className="bg-passport-bg p-8 rounded-2xl text-center flex flex-col items-center gap-6 cursor-pointer hover:scale-99">
                            <FaPenNib className="text-[30px] text-primary " />
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[20px] font-semibold text-neutral-white font-outfit">Graphic Designer & Social Media Manager </h3>
                                <p className="text-[15px] font-light font-openSans text-muted">I help businesses grow their online presence through high-quality graphic design and results-driven social media management. By combining creative visuals with strategic content, I create engaging brand experiences that increase visibility, strengthen credibility, and drive customer engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile & Tablet Watermarks */}
                <div className="flex lg:hidden justify-center flex-wrap items-center gap-6 mt-10 opacity-100">
                    <Image
                        src="/Image/watermarks/ps 1.png"
                        alt="Photoshop"
                        width={55}
                        height={55}
                        quality={100}
                        unoptimized
                    />

                    <Image
                        src="/Image/watermarks/react 1.png"
                        alt="React"
                        width={60}
                        height={60}
                        quality={100}
                        unoptimized
                    />

                    <Image
                        src="/Image/watermarks/code 1.png"
                        alt="Code"
                        width={60}
                        height={60}
                        quality={100}
                        unoptimized
                    />

                    <Image
                        src="/Image/watermarks/figma 1.png"
                        alt="Figma"
                        width={55}
                        height={55}
                        quality={100}
                        unoptimized
                    />

                    <Image
                        src="/Image/watermarks/node 1.png"
                        alt="Node"
                        width={75}
                        height={55}
                        quality={100}
                        unoptimized
                    />

                    <Image
                        src="/Image/watermarks/github 1.png"
                        alt="GitHub"
                        width={60}
                        height={60}
                        quality={100}
                        unoptimized
                    />
                </div>
            </div>
        </div>
    )
}

export default Services