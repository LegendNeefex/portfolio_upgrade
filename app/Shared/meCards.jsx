import {FaQuoteLeft} from "react-icons/fa"


export default function MeCards({bgColor="", numType=true, num="", lineCol="", text=""}) { 
    return (
        <div className={`${bgColor} px-6 py-6 rounded-lg`}>
            <div className="flex flex-col justify-between h-full gap-4">
                <div className="bg-muted rounded-full w-12 h-12 flex justify-center items-center">
                    <FaQuoteLeft className="text-[20px] text-frame-primary" />
                </div>
                <p className="text-[18px] text-muted font-lato font-light flex-1">{text}</p>
                <div className="flex gap-6 justify-between items-center">
                    {numType? 
                    <>
                        <div className={`${lineCol} rounded-full h-1.5 w-full`}></div>
                        <h3 className="font-poppins font-semibold text-[36px] text-[#C9CACA]">{num}</h3>
                    </>
                    :
                    <>
                        <h3 className="font-poppins font-semibold text-[36px] text-[#C9CACA]">{num}</h3>  
                        <div className={`${lineCol} rounded-full h-1.5 w-full`}></div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}