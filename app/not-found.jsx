import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-screen bg-[#1a1a1a] flex flex-col items-center justify-center gap-6">
            <h1 className="text-[#1ABC9C] font-montserrat font-bold text-[72px]">404</h1>
            <p className="text-white font-openSans text-[18px]">Sory!! This page doesn't exist.</p>
            <Link
                href="/"
                className="py-3 px-8 bg-linear-to-r from-btn-first to-btn-second rounded-full text-white font-montserrat font-semibold hover:scale-95 duration-300"
            >
                Back to Portfolio
            </Link>
        </div>
    );
}