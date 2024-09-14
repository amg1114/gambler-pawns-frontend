"use client";
import Image from "next/image";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import BetOption from "@/app/game-options/components/bet-options";
import DropDown from "@/app/game-options/components/drop-down";

import Clock from "@/app/ui/icons/clock.svg";

export default function ClassicOptionPage() {
    return (
        <section className="w-[334px] content-center space-y-xl">
            {DropDown("Classic")}
            <StyledTitle variant="h1" extraClasses="text-center">
                Game Options
            </StyledTitle>

            <div className="flex justify-center">
                <StyledButton
                    style="outlined"
                    extraClasses="w-full flex justify-between items-center bg-dark-2"
                >
                    <Image
                        src={Clock}
                        alt=""
                        width={20}
                        height={20}
                        className="h-auto w-auto"
                    />
                    Rapid, 10 min
                    <svg
                        className="-mr-1 text-gray-400 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </StyledButton>
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
