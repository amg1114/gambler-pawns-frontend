import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

export default function BetOption(id: string) {
    return (
        <div className="px-sm">
            <input
                id={"bet" + id}
                className="peer/bet hidden"
                type="radio"
                name="status"
                defaultChecked={id === "0"}
            />
            <div className="h-6 rounded-base bg-green-board px-md text-light ring-2 ring-transparent peer-checked/bet:bg-green-hover peer-checked/bet:ring-accent peer-checked:ring-offset-2">
                <label htmlFor={"bet" + id} className="cursor-pointer">
                    <div className="flex justify-center">
                        <StyledParagraph extraClasses="font-bold">
                            ${id}
                        </StyledParagraph>
                    </div>
                </label>
            </div>
        </div>
    );
}
