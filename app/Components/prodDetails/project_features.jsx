import FeatureCards from "@/app/Shared/featureCards";


function ProjectFeatures(params) {
    return (
        <div id="features" className="bg-[#2B2A2A]"> 
            <div className="w-[95%] m-auto pt-8 pb-14">
                <div>
                    <div className="flex">
                        <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                        <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">FINAL RESULT</p>
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