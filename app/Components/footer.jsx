import Link from "next/link"

function Footer(params) {
    return (
        <div className="bg-linear-to-r from-secondary to-primary">
            <div className="w-[95%] m-auto py-6">
                <div className="flex justify-between">
                    <div className="">
                        <h2 className="text-[24px] font-montserrat text-neutral-white font-semibold ">Ifeoluwa Oladepo</h2>
                        <p className="text-[14px] text-accent pt-1.25 font-openSans font-medium">A creative Designer & Full stack developer</p>
                    </div>
                    <div className="flex gap-6">
                        <Link href="https://github.com/LegendNeefex" target='_blank'>
                            <img className="w-8 h-8 object-cover" src="/Image/github.png" alt="GitHub" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/neefex" target='_blank'>
                            <img className="w-8 h-8 object-cover" src="/Image/linkedin.png" alt="LinkedIn" />
                        </Link>
                    </div>
                </div>
                <h4 className="text-[16px] text-neutral-white mt-8 font-medium font-montserrat">Copyright &copy; 2026 - Ifeoluwa Oladepo</h4>
            </div>
        </div>
    )
}

export default Footer;