"use client";
import Image from "next/image";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import BetOption from "@/app/game-options/components/bet-options";
import DropdownButton from "@/app/game-options/components/drop-down";

// Importing icons
import Clock from "@/app/ui/icons/clock.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";

export default function ClassicOptionPage() {
    return (
        <section className="w-[334px] content-center space-y-xl">
            <StyledTitle variant="h1" extraClasses="text-center">
                Game Options
            </StyledTitle>

            <DropdownButton />

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
                    <StyledButton extraClasses={"w-full"}>
                        Play vs. Random
                    </StyledButton>
                </div>
                <div className="flex items-center justify-center">
                    <StyledButton extraClasses={"w-full"}>
                        Copy Game’s Link
                    </StyledButton>
                </div>
                <div className="flex items-center justify-center py-md">
                    <StyledButton extraClasses={"w-full"}>
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
