"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

function FAQ() {
    const [openId, setOpenId] = useState(null);

    const faqData = [
        {
            id: 1,
            question: "What services do you offer?",
            answer: "I offer Full Stack Web Development, UI/UX Design, Graphic Design, and Social Media Management services. Whether you need a modern website, a complete digital product, branding materials, or assistance managing your online presence, I can help bring your ideas to life."
        },
        {
            id: 2,
            question: "How long does it take to complete a project?",
            answer: "The timeline for completing a project depends on its complexity and scope. I work closely with each client to establish realistic deadlines and keep you informed throughout the development process."
        },
        {
            id: 3,
            question: "What technologies do you use?",
            answer: "I work with a variety of technologies including JavaScript, React, Node.js, Next.js, Tailwind CSS and more. I choose the best tools for each project based on your specific needs and goals."
        },
        {
            id: 4,
            question: "Do you offer ongoing support after project completion?",
            answer: "Yes, I offer ongoing support and maintenance services to ensure your project continues to perform at its best. This includes bug fixes, updates, and performance optimizations."
        },
        {
            id: 5,
            question: "Can you redesign an existing website or improve my current design?",
            answer: "Absolutely! I can help redesign your existing website or improve your current design to enhance user experience, functionality, and visual appeal. Let's discuss your goals and how we can make your website stand out."
        },
        {
            id: 6,
            question: "Do you build mobile-friendly websites?",
            answer: "Yes, I ensure that all websites I build are fully responsive and provide an optimal user experience across all devices, including desktops, tablets, and smartphones."
        },
        {
            id: 7,
            question: "How do I get started?",
            answer: "Getting started is easy! Simply reach out to me through my contact form, and we can schedule a consultation to discuss your project requirements, goals, and timeline. From there, we can create a plan to bring your vision to life."
        }
    ];

    const toggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div id="faq" className="bg-section-secondary relative overflow-hidden">
            <div className='absolute -top-10 left-20 bg-[#0F6A58] opacity-25 w-300  h-300 rounded-full blur-3xl z-0'></div>
            <div className="w-[95%] m-auto py-10 relative z-10">
                
                <div className="w-[50%] m-auto flex flex-col gap-6 justify-center items-center text-center">
                    <Image
                        src="/Image/star 1.png"
                        alt="Star"
                        width={170}
                        height={100}
                        quality={100}
                        unoptimized={true}
                    />
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center">
                            <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                            <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">FAQs</p>
                        </div>
                        <div>
                            <h2 className="text-[24px] font-semibold text-muted font-montserrat mb-2">Frequently Asked Questions</h2>
                            <p className="text-[16px] font-openSans font-medium text-[#DDDEDE]">Have questions about my services, process, or project timelines? Here are answers to some of the most common questions clients ask before getting started.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-16 w-[90%] mx-auto">
                    {faqData.map((faq) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div
                                key={faq.id}
                                className="bg-[#2F2D2D] rounded-xl px-6 py-6 flex flex-col gap-0 overflow-hidden"
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggle(faq.id)}
                                >
                                    <p className="font-poppins text-[16px] font-medium text-neutral-white pr-4">{faq.question}</p>
                                    <div className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                                        <FaPlus className="text-neutral-white text-[18px] shrink-0" />
                                    </div>
                                </div>

                                <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-7" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-[16px] text-[#C9CACA] font-lato font-regular">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default FAQ;