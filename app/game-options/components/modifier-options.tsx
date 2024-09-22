import Image from "next/image";

//Importar de react
import { useState } from "react";

//Import SVG
import Check from "@/app/ui/icons/check.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";

//Import component
import { azeret_mono } from "@/app/ui/fonts";
import StyledLink from "@/app/ui/components/typography/StyledLink";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import exp from "constants";

const arrayArcadeModes = [
    {
        id: "arcade1",
        title: "Blood Square",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
    {
        id: "arcade2",
        title: "Random Freeze",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
    {
        id: "arcade3",
        title: "Borders of Blood",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
    {
        id: "arcade4",
        title: "BlooVengeful Rider",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
];

type Modifier = {
    id: string;
    title: string;
    explain: string;
};

type arcadeOptionsProps = {
    modifier: Modifier;
};

function ModifierOption({ modifier }: arcadeOptionsProps) {
    const [isCheckVisible, setIsCheckVisible] = useState<boolean>(false);
    const [isTextVisible, setIsTextVisible] = useState<boolean>(false);

    const toggleCheck = () => {
        setIsCheckVisible(!isCheckVisible);
    };

    const toggleText = () => {
        setIsTextVisible(!isTextVisible);
    };

    return (
        <div
            className="w-full rounded-base bg-dark-2 px-md pb-xs pt-md"
            key={modifier.id}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <label className="hover:cursor-pointer">
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
                    <p
                        className={`pl-md text-xl font-semibold ${azeret_mono.className}`}
                    >
                        {modifier.title}
                    </p>
                </div>

                <div>
                    <Image
                        src={ArrowDown}
                        alt=""
                        width={16}
                        height={16}
                        className={`hover:cursor-pointer ${isTextVisible ? "rotate-180" : ""}`}
                        onClick={toggleText}
                    />
                </div>
            </div>
            <div className="h-[12px]" />
            <StyledParagraph
                extraClasses={`text-sm pl-lg ${isTextVisible ? "" : "hidden"}`}
            >
                {modifier.explain}
            </StyledParagraph>
        </div>
    );
}

export default function ArcadeOptions() {
    return (
        <div className="space-y-4">
            {arrayArcadeModes.map((mode) => (
                <ModifierOption
                    key={mode.id}
                    modifier={{
                        id: mode.id,
                        title: mode.title,
                        explain: mode.explain,
                    }}
                />
            ))}
        </div>
    );
}
