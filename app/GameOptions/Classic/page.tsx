"use client";

// Importing React
import { useState } from "react";
import { azeret_mono, bungee } from "@/app/ui/fonts";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import GameAlert from "@/app/ui/components/modals/GameAlert";

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
