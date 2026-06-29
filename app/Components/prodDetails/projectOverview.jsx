import { useContext } from "react"
import stateHandler from "../../Context/stateHandler"
import ProjectHighlights from "./projectHighlight"


function ProjectOverview(params) {
    const {selectedProject} = useContext(stateHandler)

    return (
        <div className="bg-[#2F2D2D]">
            <div className="w-[95%] m-auto py-8">
                <div className="flex flex-col gap-14">
                    <div>
                        <div className="flex">
                            <div className="flex w-10 h-0.5 bg-linear-to-r from-btn-first to-btn-second rounded-0 relative top-2.5"></div>
                            <p className="px-2.5 text-[16px] font-medium text-muted font-montserrat">PROJECT OVERVIEW</p>
                        </div>
                        <h2 className="text-[24px] font-bold text-muted font-montserrat">{`What is ${selectedProject.project_title} about?`}</h2>
                    </div>
                    <p className="text-[20px] font-openSans font-light text-[#E3F2FD] leading-10"><span className="text-accent font-bold">{selectedProject.project_title} </span>{selectedProject.project_overview}</p>
                </div>
            </div>
            <div>
                <ProjectHighlights />
            </div>
        </div>
    )
}

export default ProjectOverview;