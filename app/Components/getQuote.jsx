"use client";

import { useState, useRef, useEffect } from "react";
import { IoMdFlash, IoIosArrowUp  } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SiKashflow } from "react-icons/si";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-green/theme.css";
import { NG, US, GB } from "country-flag-icons/react/3x2";
import StickyCards from "../Shared/stickyCards";

const currencies = [
  {
    flag: <NG className="w-6 h-6 rounded-sm" />,
    code: "NGN",
    symbol: "₦",
    placeholder: "500,000 - 1,000,000",
  },
  {
    flag: <US className="w-6 h-6 rounded-sm" />,
    code: "USD",
    symbol: "$",
    placeholder: "500 - 1,000",
  },
  {
    flag: <GB className="w-6 h-6 rounded-sm" />,
    code: "GBP",
    symbol: "£",
    placeholder: "400 - 800",
  },
];

function GetQuote() {
    const toast = useRef(null);
    const [currencyDropdown, setCurrencyDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        projectTimeline: "",
        projectDesc: "",
        budgetRange: "",
        budgetCurrency: currencies[0],
        budgetFlexibility: "",
    });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const selectCurrency = (currency) => {
        setFormData({ ...formData, budgetCurrency: currency, budgetRange: "" });
        setCurrencyDropdown(false);
    };

    const selectFlexibility = (option) => {
        setFormData({ ...formData, budgetFlexibility: option });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail, life: 3000 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, projectType, projectTimeline, projectDesc, budgetRange, budgetFlexibility } = formData;

        if (!name.trim()) return showToast("error", "Error", "Name is required.");
        if (!email.trim()) return showToast("error", "Error", "Email is required.");
        if (!validateEmail(email)) return showToast("error", "Error", "Please enter a valid email address.");
        if (!projectType.trim()) return showToast("error", "Error", "Project type is required.");
        if (!projectTimeline.trim()) return showToast("error", "Error", "Project timeline is required.");
        if (!projectDesc.trim()) return showToast("error", "Error", "Project description is required.");
        if (!budgetRange.trim()) return showToast("error", "Error", "Budget range is required.");
        if (!budgetFlexibility) return showToast("error", "Error", "Please select a budget flexibility option.");

        try {

            const payload = {
                ...formData,
                budgetCurrency: {
                    code: formData.budgetCurrency.code,
                    symbol: formData.budgetCurrency.symbol,
                },
            };

            setIsSubmitting(true);
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            // console.log("got here");

            

            if (!response.ok) {
                throw new Error("Failed");
            }

            showToast(
                "success",
                "Success",
                "Your quote request has been submitted!"
            );

            setFormData({
                name: "",
                email: "",
                projectType: "",
                projectTimeline: "",
                projectDesc: "",
                budgetRange: "",
                budgetCurrency: currencies[0],
                budgetFlexibility: "",
            });

        } catch (err) {

            showToast(
                "error",
                "Oops",
                "Something went wrong. Please try again."
            );

            console.log(err);

        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div id="get-quote" className="bg-[#2F2D2D]">
            <Toast
                ref={toast}
                position={isMobile ? "top-center" : "top-right"}
            />
            <div className="w-[95%] m-auto py-24 relative">
                {/* Header */}
                <div className="w-full lg:w-[55%] m-auto flex flex-col gap-6 justify-center items-center text-center">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center">
                            <div className="flex w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                            <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">GET QUOTE</p>
                        </div>
                        <div>
                            <h2 className="text-[24px] font-semibold text-muted font-montserrat mb-2">Let's Bring Your Idea to Life</h2>
                            <p className="text-[16px] font-openSans font-medium text-[#DDDEDE]">Whether you need a modern website, UI/UX design, branding materials, or social media management, I'm here to help transform your vision into a successful digital product. Let's discuss your project and create something amazing together.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4 md:flex md:flex-row md:justify-center md:gap-10">
                            <div className="flex gap-4 items-center">
                                <IoMdFlash
                                    style={{ fill: "url(#iconGradient)" }}
                                    className="text-[28px] shrink-0"
                                />
                                <p className="text-[16px] text-muted font-openSans font-medium">
                                    Fast Response
                                </p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <MdContactSupport
                                    style={{ fill: "url(#iconGradient)" }}
                                    className="text-[28px] shrink-0"
                                />
                                <p className="text-[16px] text-muted font-openSans font-medium">
                                    Tailored Solutions
                                </p>
                            </div>

                            <div className="flex gap-4 items-center col-span-2 justify-center lg:col-span-1 lg:justify-start">
                                <SiKashflow
                                    style={{ fill: "url(#iconGradient)" }}
                                    className="text-[28px] shrink-0"
                                />
                                <p className="text-[16px] text-muted font-openSans font-medium">
                                    Transparent Process
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex justify-center mt-30 gap-48 lg:gap-70 flex-col lg:flex-row">
                    {/* Sticky Cards */}
                    <div className="flex flex-col gap-7 relative">
                        <div className="absolute left-9 z-0">
                            <div className="w-1.5 h-120 bg-muted"></div>
                            <div className="w-4 h-4 rounded-full bg-muted relative right-1 bottom-2 shadow-frame"></div>
                        </div>
                        <div className="relative z-10 flex flex-col gap-7">
                            <StickyCards text="Submit your request" />
                            <StickyCards text="Schedule a call/meeting" />
                            <StickyCards text="Receive a detailed proposal" />
                            <StickyCards text="Project Build Commences" />
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-[#E3F2FD] flex flex-col gap-6 border-3 border-[#A0A9B1] md:rounded-[60px] rounded-[30px] py-8 px-4 lg:px-8 w-full lg:w-[45%]">
                        <div className="flex flex-col items-center gap-4 w-[80%] m-auto">
                            <p className="font-openSans font-bold text-[#2D2D2D] text-[16px] text-center">
                                Please, provide details about your projects so we can help you better.
                            </p>
                            <div className="bg-linear-to-r from-btn-first to-btn-second h-1.5 w-30 rounded-full"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-openSans font-bold text-[#2D2D2D] text-[16px]">Name</label>
                                <input
                                    maxLength={100}
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border-2 border-[#B8B9B9] py-3 rounded-full outline-0 px-4 placeholder:text-[#B8B9B9] placeholder:font-lato placeholder:text-[16px]"
                                    autoComplete="off"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-openSans font-bold text-[#2D2D2D] text-[16px]">Email</label>
                                <input
                                     maxLength={50}
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border-2 border-[#B8B9B9] py-3 rounded-full outline-0 px-4 placeholder:text-[#B8B9B9] placeholder:font-lato placeholder:text-[16px]"
                                    autoComplete="off"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            {/* Project Type */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="projectType" className="font-openSans font-bold text-[#2D2D2D] text-[16px]">Project Type</label>
                                <input
                                    maxLength={100}
                                    type="text"
                                    id="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="border-2 border-[#B8B9B9] py-3 rounded-full outline-0 px-4 placeholder:text-[#B8B9B9] placeholder:font-lato placeholder:text-[16px]"
                                    autoComplete="off"
                                    placeholder="Website, UI/UX Design, Graphic Design..."
                                />
                            </div>

                            {/* Project Timeline */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="projectTimeline" className="font-openSans font-bold text-[#2D2D2D] text-[16px]">Project Timeline</label>
                                <input
                                    maxLength={50}
                                    type="text"
                                    id="projectTimeline"
                                    value={formData.projectTimeline}
                                    onChange={handleChange}
                                    className="border-2 border-[#B8B9B9] py-3 rounded-full outline-0 px-4 placeholder:text-[#B8B9B9] placeholder:font-lato placeholder:text-[16px]"
                                    autoComplete="off"
                                    placeholder="What's your expected timeline?"
                                />
                            </div>

                            {/* Project Description */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="projectDesc" className="font-openSans font-bold text-[#2D2D2D] text-[16px]">Project Description</label>
                                <textarea
                                    maxLength={500}
                                    id="projectDesc"
                                    rows={5}
                                    value={formData.projectDesc}
                                    onChange={handleChange}
                                    className="border-2 border-[#B8B9B9] py-3 rounded-xl outline-0 px-4 placeholder:text-[#B8B9B9] placeholder:font-lato placeholder:text-[16px] resize-none w-full"
                                    autoComplete="off"
                                    placeholder="Add additional details about your project"
                                />
                            </div>

                            {/* Budget Range */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="budgetRange" className="font-openSans font-bold text-[#2D2D2D] text-[16px]">Budget Range</label>
                                <div className="border-2 border-[#B8B9B9] py-3 rounded-full px-4 flex items-center gap-2 relative">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer border-r-2 border-[#B8B9B9] pr-3"
                                        onClick={() => setCurrencyDropdown(!currencyDropdown)}
                                    >
                                        <span className="text-[20px]">{formData.budgetCurrency.flag}</span>
                                        <span className="text-[14px] font-bold text-[#2D2D2D]">{formData.budgetCurrency.code}</span>
                                        <svg className={`w-4 h-4 text-[#B8B9B9] transition-transform duration-500 ${currencyDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <span className="text-[#B8B9B9] font-lato">{formData.budgetCurrency.symbol}</span>
                                    <input
                                        type="text"
                                        id="budgetRange"
                                        value={formData.budgetRange}
                                        onChange={handleChange}
                                        className="outline-0 flex-1 placeholder:text-[#B8B9B9] placeholder:font-lato placeholder:text-[16px] bg-transparent"
                                        autoComplete="off"
                                        placeholder={formData.budgetCurrency.placeholder}
                                    />
                                    {currencyDropdown && (
                                        <div className="absolute top-14 left-0 bg-white border-2 border-[#B8B9B9] rounded-2xl shadow-lg z-20 overflow-hidden w-48">
                                            {currencies.map((currency) => (
                                                <div
                                                    key={currency.code}
                                                    onClick={() => selectCurrency(currency)}
                                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${formData.budgetCurrency.code === currency.code ? "bg-gray-100" : ""}`}
                                                >
                                                    <span className="text-[20px]">{currency.flag}</span>
                                                    <span className="font-lato font-bold text-[#2D2D2D]">{currency.code}</span>
                                                    <span className="font-lato text-[#B8B9B9]">{currency.symbol}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Budget Flexibility */}
                            <div className="flex flex-col gap-3">
                                <label className="font-openSans font-bold text-[#2D2D2D] text-[16px]">Budget Flexibility</label>
                                <div className="flex gap-3 flex-wrap">
                                    {["Fixed", "Flexible", "Need Recommendation"].map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => selectFlexibility(option)}
                                            className={`border-2 font-lato font-bold text-[16px] py-2 px-5 rounded-full duration-300 cursor-pointer transition-all
                                                ${formData.budgetFlexibility === option
                                                    ? "bg-linear-to-r from-btn-first to-btn-second text-white border-transparent"
                                                    : "border-[#1ABC9C] text-[#2D2D2D] hover:bg-linear-to-r hover:from-btn-first hover:to-btn-second hover:text-white hover:border-transparent"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="py-3 px-6 bg-linear-to-r from-btn-first to-btn-second rounded-full shadow-frame w-full text-center text-[18px] text-neutral-white font-montserrat font-bold hover:scale-98 duration-500 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >

                                {isSubmitting ? (
                                    <>
                                        <AiOutlineLoading3Quarters className="animate-spin text-[22px]" />
                                        Sending Quote...
                                    </>
                                ) : (
                                    "Get Quote"
                                )}

                            </button>

                        </form>
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
    );
}

export default GetQuote;