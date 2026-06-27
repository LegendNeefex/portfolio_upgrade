

function StackTags({ color, text }) {
    return (
        <div className={`rounded-xl px-3 py-3 ${color}`}>
            <p className="font-poppins font-medium text-[15px] text-[#DDDEDE]">
                {text}
            </p>
        </div>
    );
}

export default StackTags;