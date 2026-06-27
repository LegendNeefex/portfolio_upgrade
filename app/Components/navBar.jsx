"use client";

import { useState, useContext, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import stateHandler from '../Context/stateHandler';
import Link from 'next/link';

function NavBar() {
    const {burgerIcon, setBurgerIcon, burgerIconHandler} = useContext(stateHandler)
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
                    rootMargin: "-120px 0px -55% 0px",
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
            setBurgerIcon(false)
            setActiveSection(section);
        } else {
            setActiveSection(section);
        }
    };

    const closeHandler = () => {
        setBurgerIcon(false)
    };

    return (
        <div className="bg-linear-to-r from-secondary to-primary fixed w-full z-12 font-montserrat">
            <div className="w-[95%] m-auto py-6.25">
                <div className="flex justify-between items-center">
                    <a href="/">
                        <h2 className='text-accent font-bold text-[24px]'>Neefex .</h2>
                    </a>
                    <ul className='flex items-center'>
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
                        <li className='relative -top-2 px-4'>
                            <a href='/Document/My-CV.pdf' download="My CV.pdf" className='text-muted'>
                                <div className="flex flex-col items-center">
                                    <div className='text-[12px] font-medium'>Download</div>
                                    <div className='text-[16px] font-bold'>Resume</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                {burgerIcon ? (
                    <div className="option-container">
                        <div className="top">
                            <div className="name-details">
                                <h2>Ifeoluwa Oladepo</h2>
                                <p>A creative Designer & FullStack Developer</p>
                            </div>
                            <i className="fa-solid fa-xmark" onClick={closeHandler}></i>
                        </div>
                        <ul>
                            <li>
                                <ScrollLink onClick={() => handleSetActive("home")} className={activeSection === "home" ? "active" : ""} to="home" smooth={true} duration={700} offset={-70}>
                                    Home
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink onClick={() => handleSetActive("aboutMe")} className={activeSection === "aboutMe" ? "active" : ""} to="about-me" smooth={true} duration={700} offset={-70}>
                                    About
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink onClick={() => handleSetActive("Services")} className={activeSection === "Services" ? "active" : ""} to="services" smooth={true} duration={700} offset={-70}>
                                    Services
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink onClick={() => handleSetActive("Projects")} className={activeSection === "Projects" ? "active" : ""} to="projects" smooth={true} duration={700} offset={-70}>
                                    Projects
                                </ScrollLink>
                            </li>
                            <li>
                                <a href='/Document/My-CV.pdf' download="My CV.pdf">
                                    <div className="text-flex">
                                        <div className='download'>Download</div>
                                        <div className='resume'>Resume</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <span className="line"></span>
                        <div className="flexB">
                            <Link href="https://github.com/LegendNeefex" target='_blank'></Link>
                            <Link href="https://www.linkedin.com/in/neefex" target='_blank'></Link>
                        </div>
                    </div>
                ) : (
                    <div className="burgericon" onClick={burgerIconHandler}>
                        <span className="line"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar