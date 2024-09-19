import Image from "next/image";

//Importar de react
import { useState } from "react";

//Import SVG
import Check from "@/app/ui/icons/check.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";

//Import component
import StyledLink from "@/app/ui/components/typography/StyledLink";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";

export default function ModifierOption(title: string, explain: string) {
    const [isCheckVisible, setIsCheckVisible] = useState<boolean>(false);
    const [isTextVisible, setIsTextVisible] = useState<boolean>(false);

    const toggleCheck = () => {
        setIsCheckVisible(!isCheckVisible);
    };

    const toggleText = () => {
        setIsTextVisible(!isTextVisible);
    };

    return (
        <div className="w-full rounded-base bg-dark-2 px-md pb-xs pt-md">
            <div className="flex justify-between">
                <div className="flex">
                    <label className="flex justify-between">
                        <input
                            type="checkbox"
                            id="checkbox1"
                            className="peer hidden"
                        />
                        <div
                            className="rounded-sm flex h-4 w-4 border-spacing-1 justify-center border border-dark-1 bg-primary peer-checked:border-dark-2"
                            onClick={toggleCheck}
                        >
                            <Image
                                src={Check}
                                alt=""
                                className={` ${isCheckVisible ? "" : "hidden"}`}
                            ></Image>
                        </div>
                    </label>
                    <StyledTitle variant="h3" extraClasses="pl-md">
                        {title}
                    </StyledTitle>
                </div>
                <div className="flex" onClick={toggleText}>
                    <StyledLink href="#" extraClasses="pr-sm">
                        explain
                    </StyledLink>
                    <Image
                        src={ArrowDown}
                        alt=""
                        width={15}
                        height={15}
                        className="pb-md"
                    />
                </div>
            </div>

            <StyledParagraph
                extraClasses={`text-sm pl-lg ${isTextVisible ? "" : "hidden"}`}
            >
                {explain}
            </StyledParagraph>
        </div>
    );
}
