"use client";

import { useState, useContext, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import stateHandler from '../Context/stateHandler';
import Link from 'next/link';
import Image from 'next/image';
import { FaXmark, FaArrowRight } from 'react-icons/fa6';

function NavBar() {
    const { burgerIcon, setBurgerIcon, burgerIconHandler } = useContext(stateHandler);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const sections = [
            { id: "home", target: "home" },
            { id: "aboutMe", target: "about-me" },
            { id: "Services", target: "services" },
            { id: "Projects", target: "projects" },
            { id: "FAQ", target: "faq" },
            { id: "GetQuote", target: "get-quote" },
        ];

        const observers = sections.map(({ id, target }) => {
            const element = document.getElementById(target);
            if (!element) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
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

        return () => {
            observers.forEach((obs) => {
                if (obs) obs.observer.unobserve(obs.element);
            });
        };
    }, []);

    const handleSetActive = (section) => {
        if (burgerIcon) {
            setBurgerIcon(false);
            setActiveSection(section);
        } else {
            setActiveSection(section);
        }
    };

    const closeHandler = () => {
        setBurgerIcon(false);
    };

    return (
        <div className="fixed inset-x-0 top-0 z-20 bg-linear-to-r from-secondary to-primary font-montserrat">
            <div className="w-[95%] m-auto py-6.25 flex justify-between items-center">
                <a href="/">
                    <h2 className="text-accent font-bold text-[24px]">Neefex .</h2>
                </a>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center">
                    <ul className="flex items-center">
                        <li>
                            <ScrollLink onClick={() => handleSetActive("home")} className={`p-4 no-underline text-muted text-[16px] font-bold cursor-pointer ${activeSection === "home" ? "bg-accent p-4 rounded-full text-secondary" : ""}`} to="home" smooth={true} duration={700} offset={-70}>
                                Home
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink onClick={() => handleSetActive("aboutMe")} className={`px-4 no-underline text-muted text-[16px] font-bold cursor-pointer ${activeSection === "aboutMe" ? "bg-accent p-4 rounded-full text-secondary" : ""}`} to="about-me" smooth={true} duration={700} offset={-70}>
                                About
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink onClick={() => handleSetActive("Services")} className={`px-4 no-underline text-muted text-[16px] font-bold cursor-pointer ${activeSection === "Services" ? "bg-accent p-4 rounded-full text-secondary" : ""}`} to="services" smooth={true} duration={700} offset={-70}>
                                Services
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink onClick={() => handleSetActive("Projects")} className={`px-4 no-underline text-muted text-[16px] font-bold cursor-pointer ${activeSection === "Projects" ? "bg-accent p-4 rounded-full text-secondary" : ""}`} to="projects" smooth={true} duration={700} offset={-70}>
                                Projects
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink onClick={() => handleSetActive("FAQ")} className={`px-4 no-underline text-muted text-[16px] font-bold cursor-pointer ${activeSection === "FAQ" ? "bg-accent p-4 rounded-full text-secondary" : ""}`} to="faq" smooth={true} duration={700} offset={-70}>
                                FAQ
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink onClick={() => handleSetActive("GetQuote")} className={`px-4 no-underline text-muted text-[16px] font-bold cursor-pointer ${activeSection === "GetQuote" ? "bg-accent p-4 rounded-full text-secondary" : ""}`} to="get-quote" smooth={true} duration={700} offset={-70}>
                                Get Quote
                            </ScrollLink>
                        </li>
                        <li className="relative -top-2 px-4">
                            <a href="/Document/My-CV.pdf" download="My CV.pdf" className="text-muted">
                                <div className="flex flex-col items-center">
                                    <div className="text-[12px] font-medium">Download</div>
                                    <div className="text-[16px] font-bold">Resume</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Mobile Burger Icon */}
                {!burgerIcon && (
                    <div
                        className="flex lg:hidden flex-col items-center gap-2 transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={burgerIconHandler}
                    >
                        <span className="w-8 h-1 bg-[#DDDEDE]"></span>
                        <span className="w-8 h-1 bg-[#DDDEDE]"></span>
                        <span className="w-8 h-1 bg-[#DDDEDE]"></span>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {burgerIcon && (
                <div
                className="
                fixed
                inset-0
                overflow-x-hidden
                overflow-y-auto 
                z-999
                bg-[#0F6A58]
                flex
                flex-col
                px-8
                pt-10
                pb-8
                lg:hidden
                "
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <a href="/" className="text-[30px] font-bold font-montserrat text-white">
                                <h2 >
                                    Neefex .
                                </h2>
                            </a>

                            <p className="mt-2 text-[16px] leading-6 text-[#D9F4EF] font-lato max-w-xs">
                                Creative Designer &
                                <br />
                                Full Stack Web Developer
                            </p>
                        </div>
                        <button
                            onClick={closeHandler}
                            className="
                                w-12
                                h-12
                                rounded-full
                                bg-white/10
                                flex
                                items-center
                                justify-center
                                hover:bg-white/20
                                transition
                                cursor-pointer
                            "
                        >
                            <FaXmark className="text-white text-2xl"/>
                        </button>
                    </div>
                    <ul className="flex flex-col gap-5 mt-14">
                        <li>
                            <ScrollLink
                                to="home"
                                smooth
                                duration={700}
                                offset={-70}
                                onClick={() => {
                                    setActiveSection("home");

                                    setTimeout(() => {
                                        setBurgerIcon(false);
                                    }, 250);
                                }}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    cursor-pointer
                                    px-6
                                    py-5
                                    w-full
                                    text-lg
                                    font-semibold
                                    transition-all
                                    bg-white text-[#0F6A58]
                                    hover:scale-98
                                `}
                            >
                                <span>Home</span>
                                <FaArrowRight className="text-xl"/>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="about-me"
                                smooth
                                duration={700}
                                offset={-70}
                                onClick={() => {
                                    setActiveSection("aboutMe");

                                    setTimeout(() => {
                                        setBurgerIcon(false);
                                    }, 250);
                                }}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    cursor-pointer
                                    px-6
                                    py-5
                                    w-full
                                    text-lg
                                    font-semibold
                                    transition-all
                                    bg-white text-[#0F6A58]
                                    hover:scale-98
                                `}
                            >
                                <span>About</span>
                                <FaArrowRight className="text-xl"/>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="services"
                                smooth
                                duration={700}
                                offset={-70}
                                onClick={() => {
                                    setActiveSection("services");

                                    setTimeout(() => {
                                        setBurgerIcon(false);
                                    }, 250);
                                }}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    cursor-pointer
                                    px-6
                                    py-5
                                    w-full
                                    text-lg
                                    font-semibold
                                    transition-all
                                    bg-white text-[#0F6A58]
                                    hover:scale-98
                                `}
                            >
                                <span>Services</span>
                                <FaArrowRight className="text-xl"/>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="projects"
                                smooth
                                duration={700}
                                offset={-70}
                                onClick={() => {
                                    setActiveSection("projects");

                                    setTimeout(() => {
                                        setBurgerIcon(false);
                                    }, 250);
                                }}  
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    cursor-pointer
                                    px-6
                                    py-5
                                    w-full
                                    text-lg
                                    font-semibold
                                    transition-all
                                    bg-white text-[#0F6A58]
                                    hover:scale-98
                                `}
                            >
                                <span>Projects</span>
                                <FaArrowRight className="text-xl"/>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="faq"
                                smooth
                                duration={700}
                                offset={-70}
                                onClick={() => {
                                    setActiveSection("faq");

                                    setTimeout(() => {
                                        setBurgerIcon(false);
                                    }, 250);
                                }}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    cursor-pointer
                                    px-6
                                    py-5
                                    w-full
                                    text-lg
                                    font-semibold
                                    transition-all
                                    bg-white text-[#0F6A58]
                                    hover:scale-98
                                `}
                            >
                                <span>FAQ</span>
                                <FaArrowRight className="text-xl"/>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="get-quote"
                                smooth
                                duration={700}
                                offset={-70}
                                onClick={() => {
                                    setActiveSection("get-quote");

                                    setTimeout(() => {
                                        setBurgerIcon(false);
                                    }, 250);
                                }}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    cursor-pointer
                                    px-6
                                    py-5
                                    w-full
                                    text-lg
                                    font-semibold
                                    transition-all
                                    bg-white text-[#0F6A58]
                                    hover:scale-98
                                `}
                            >
                                <span>Get Quote</span>
                                <FaArrowRight className="text-xl"/>
                            </ScrollLink>
                        </li>
                    </ul>
                    <div className="mt-10">
                        <a
                            href="/Document/My-CV.pdf"
                            download
                            className="
                            flex
                            justify-center
                            items-center
                            rounded-full
                            bg-linear-to-r
                            from-btn-first
                            to-btn-second
                            py-4
                            font-bold
                            text-neutral-white
                            shadow-lg
                            hover:scale-[0.98]
                            transition
                            "
                            >
                            Download Resume
                        </a>
                    </div>
                    <div className="mt-auto pt-10">
                        <div className="flex justify-center items-center gap-5 w-full">

                            <Link
                                href="https://github.com/LegendNeefex"
                                target="_blank"
                                className="
                                    w-14
                                    h-14
                                    rounded-full
                                    bg-white/10
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-white/20
                                    transition
                                "
                            >
                                <Image
                                    src="/Image/github.png"
                                    alt="GitHub"
                                    width={28}
                                    height={28}
                                />
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/neefex"
                                target="_blank"
                                className="
                                    w-14
                                    h-14
                                    rounded-full
                                    bg-white/10
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-white/20
                                    transition
                                "
                            >
                                <Image
                                    src="/Image/linkedin.png"
                                    alt="LinkedIn"
                                    width={28}
                                    height={28}
                                />
                            </Link>

                        </div>

                        <p className="mt-6 text-center text-sm text-[#D9F4EF] font-lato">
                           &copy; {new Date().getFullYear()} Neefex. All rights reserved.
                        </p>
                </div>
            </div>
            )}
        </div>
    );
}

export default NavBar;