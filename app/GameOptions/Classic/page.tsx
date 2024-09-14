"use client";

// Importing React
import { useState } from "react";
import { azeret_mono, bungee } from "@/app/ui/fonts";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import { Nunito } from "next/font/google";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

function BetOption(id: string) {
    return (
        <div>
            <input
                id={"bet" + id}
                className="peer/bet hidden"
                type="radio"
                name="status"
                defaultChecked
            />
            <div className="p-5 bg-green-board peer-checked/bet:bg-green-hover ring-transparent h-6 w-14 rounded-base text-light ring-2 peer-checked/bet:ring-accent peer-checked:ring-offset-2">
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

export default function ClassicOptionPage() {
    const [showAlertM, setShowAlertM] = useState(false);
    const [showAlertL, setShowAlertL] = useState(false);

    return (
        <section className="space-y-xl py-xl">
            <StyledTitle variant="h1" extraClasses="text-center">
                Game Options
            </StyledTitle>

            <div className="flex justify-center">
                <StyledButton style="outlined" extraClasses="!px-[114px]">
                    Rapid, 10 min
                </StyledButton>
            </div>

            <StyledTitle variant="h2" extraClasses="text-center">
                Your bet
            </StyledTitle>

            <fieldset className="flex justify-between">
                {BetOption("0")}
                {BetOption("20")}
                {BetOption("60")}
                {BetOption("100")}
                {BetOption("220")}
                {BetOption("580")}
                {BetOption("1000")}
            </fieldset>

            <StyledTitle variant="h2" extraClasses="text-center">
                Against Who?
            </StyledTitle>
            <div>
                <div className="flex items-center justify-center p-md">
                    <StyledButton extraClasses="!px-[105px]">
                        Play vs. Random
                    </StyledButton>
                </div>
                <div className="flex items-center justify-center">
                    <StyledButton extraClasses="!px-[101px]">
                        Copy Game’s Link
                    </StyledButton>
                </div>
                <div className="flex items-center justify-center p-md">
                    <StyledButton extraClasses="!px-[106px]">
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
