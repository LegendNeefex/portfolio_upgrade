

function StackTags({ color, text, tagColor }) {
    return (
        <div className={`rounded-xl px-3 py-3 ${color}`}>
            <p className={`font-poppins font-semi-bold text-[16px] ${tagColor}`}>
                {text}
            </p>
        </div>
    );
}

export default StackTags;