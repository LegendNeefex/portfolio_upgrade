import { useContext } from "react"
import stateHandler from "../../Context/stateHandler"
import ProjectHighlights from "./projectHighlight"


function ProjectOverview(params) {
    const {selectedProject} = useContext(stateHandler)

    return (
        <div className="bg-[#2F2D2D]">
            <div className="w-[95%] m-auto py-8">
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-2 md:text-left text-center">
                        <div className="flex md:justify-start items-center justify-center gap-4">
                            <div className="flex w-10 h-1 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative"></div>
                            <p className=" text-[16px] font-medium text-muted font-montserrat">PROJECT OVERVIEW</p>
                        </div>
                        <h2 className="text-[24px] font-bold text-muted font-montserrat">{`What is ${selectedProject.project_title} about?`}</h2>
                    </div>
                    <p className="text-[20px] font-openSans font-light text-[#E3F2FD] leading-10 md:text-left text-center"><span className="text-accent font-bold">{selectedProject.project_title} </span>{selectedProject.project_overview}</p>
                </div>
            </div>
            <div>
                <ProjectHighlights />
            </div>
        </div>
    )
}

export default ProjectOverview;