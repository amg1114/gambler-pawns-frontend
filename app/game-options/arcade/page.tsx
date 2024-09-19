"use client";
import Image from "next/image";

// Importing icons
import ChessTile from "@/app/ui/icons/chess-tile.svg";
import Dice from "@/app/ui/icons/dice.svg";
import Link from "@/app/ui/icons/link-shared.svg";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import BetOption from "@/app/game-options/components/bet-options";
import ModifierOption from "@/app/game-options/components/modifier-options";

const arrayArcadeModes = [
    {
        id: "option1",
        title: "Blood Square",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
    {
        id: "option2",
        title: "Random Freeze",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
    {
        id: "option3",
        title: "Borders of Blood",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
    {
        id: "option4",
        title: "BlooVengeful Rider",
        explain:
            "Randomly activated squares, players will have 2 turns to removepieces from that square, otherwise the piece will be lost.",
    },
];

export default function ClassicOptionPage() {
    return (
        <section className="col-auto w-[334px] content-center space-y-xl">
            <StyledTitle variant="h1" extraClasses="text-center !mb-sm">
                Arcade Game Options
            </StyledTitle>
            <StyledTitle variant="h2" extraClasses="text-center">
                Select Modifiers
            </StyledTitle>

            <div className="space-y-4">
                {arrayArcadeModes.map((mode) => {
                    return ModifierOption(mode.title, mode.explain);
                })}
            </div>

            <StyledTitle variant="h2" extraClasses="text-center">
                Your bet
            </StyledTitle>
            <fieldset className="flex justify-center">
                {BetOption("0")}
                {BetOption("20")}
                {BetOption("60")}
                {BetOption("100")}
            </fieldset>
            <fieldset className="flex justify-center">
                {BetOption("220")}
                {BetOption("580")}
                {BetOption("1000")}
            </fieldset>
            <StyledTitle variant="h2" extraClasses="text-center">
                Against Who?
            </StyledTitle>
            <div>
                <div className="flex items-center justify-center py-md">
                    <StyledButton extraClasses={"w-full flex justify-center"}>
                        <Image
                            src={Dice}
                            alt=""
                            width={20}
                            height={20}
                            className="h-auto w-auto pr-sm"
                        />
                        Play vs. Random
                    </StyledButton>
                </div>
                <div className="flex items-center justify-center">
                    <StyledButton extraClasses={"w-full flex justify-center"}>
                        <Image
                            src={Link}
                            alt=""
                            className="h-auto w-auto pr-sm"
                        />
                        Copy Game’s Link
                    </StyledButton>
                </div>
                <div className="flex items-center justify-center py-md">
                    <StyledButton extraClasses={"w-full flex justify-center"}>
                        <Image
                            src={ChessTile}
                            alt=""
                            width={20}
                            height={20}
                            className="h-auto w-auto pr-sm"
                        />
                        Play vs. a Friend
                    </StyledButton>
                </div>
                <div className="flex items-center justify-center p-md">
                    <StyledButton style="outlined" extraClasses="!px-[32px]">
                        Cancel
                    </StyledButton>
                </div>
            </div>
        </section>
    );
}
