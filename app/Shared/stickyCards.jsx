
import { FaCheck } from "react-icons/fa6";

function StickyCards({text=""}) {

    return(
        <div className="bg-muted rounded-r-xl px-4 py-4 flex gap-7 items-center">
            <div className="bg-[#0F6A58] w-12 h-12 rounded-xl inline-flex justify-center items-center">
                <FaCheck className="text-neutral-white text-[24px]" />
            </div>
            <p className="text-[18px] text-[#2F2D2D] font-medium font-outfit ">{text}</p>
        </div>
    )
}

export default StickyCards