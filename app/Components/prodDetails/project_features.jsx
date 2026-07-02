import FeatureCards from "@/app/Shared/featureCards";


function ProjectFeatures(params) {
    return (
        <div id="features" className="bg-[#2B2A2A]"> 
            <div className="w-[95%] m-auto pt-8 pb-14">
                <div className="flex flex-col gap-2 md:text-left text-center">
                    <div className="flex md:justify-start items-center justify-center gap-4">
                        <div className="flex w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative"></div>
                        <p className=" text-[16px] font-medium text-muted font-montserrat">FINAL RESULT</p>
                    </div>
                    <h2 className="text-[24px] font-bold text-muted font-montserrat">Key Features & Outcomes</h2>
                </div>
                <div>
                    <FeatureCards />
                </div>
            </div>
        </div>
    )
}

export default ProjectFeatures;