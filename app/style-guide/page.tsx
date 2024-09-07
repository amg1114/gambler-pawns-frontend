"use client";

// Importing React
import { useState } from "react";
import { azeret_mono, bungee } from "@/app/ui/fonts";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "../ui/components/typography/StyledParagraph";
import StyledLink from "../ui/components/typography/StyledLink";
import StyledButton from "@/app/ui/components/typography/StyledButton";

import GameAlert from "@/app/ui/components/modals/GameAlert";
import StoreModal from "@/app/ui/components/modals/StoreModal";

export default function StyleGuidePage() {
    const [showAlertM, setShowAlertM] = useState(false);
    const [showAlertL, setShowAlertL] = useState(false);
    const [showStoreModal, setShowStoreModal] = useState(false);

    return (
        <section className="space-y-xl py-xl">
            <StyledTitle variant="h1" extraClasses="text-center">
                Style Guide
            </StyledTitle>

            <article className="border-b border-light pb-md">
                <StyledTitle variant="h2">Typography:</StyledTitle>
                <StyledParagraph>
                    After much deliberation, we’ve come to the conclusion of using <span className={bungee.className}>Bungee</span> as our primary font, as it evokes a playful, game-like aesthetic. For our secondary font, we chose <span className={`${azeret_mono.className} font-bold`}>Azeret_Mono</span>, which brings a retro and arcade-inspired vibe. Lastly, we opted for <span className="underline">Nunito</span> as our flat font due to its simplicity and clean design.
                </StyledParagraph>
                <div className="gap-md grid grid-cols-2">
                    <article>
                        <StyledTitle variant="h1">Heading 1</StyledTitle>
                        <StyledTitle variant="h2">Heading 2</StyledTitle>
                        <StyledTitle variant="h3">Heading 3</StyledTitle>
                        <StyledTitle variant="h4">Heading 4</StyledTitle>
                    </article>
                    <article>
                        <StyledParagraph>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maiores dolorum quasi deserunt sint ullam ut
                            quam, dolorem eum quas beatae.
                        </StyledParagraph>
                        <StyledLink href="#">Sytled Link</StyledLink>
                    </article>
                </div>
            </article>
            <article className="">
                <StyledTitle variant="h2" extraClasses="!mb-md">
                    Buttons:
                </StyledTitle>
                <div className="gap-sm flex flex-wrap">
                    <StyledButton>Primary Filled</StyledButton>
                    <StyledButton variant="secondary">
                        Secondary Filled
                    </StyledButton>
                    <StyledButton style="outlined">
                        Primary Outlined
                    </StyledButton>
                    <StyledButton variant="secondary" style="outlined">
                        Secondary Outlined
                    </StyledButton>
                </div>
            </article>
            <article className="">
                <StyledTitle>Modals</StyledTitle>
                <div className="flex flex-wrap gap-4">
                    <StyledButton
                        onClick={() => {
                            setShowAlertM(true);
                        }}
                    >
                        Open Game Alert MEDIUM
                    </StyledButton>
                    <StyledButton
                        onClick={() => {
                            setShowAlertL(true);
                        }}
                    >
                        Open Game Alert LARGE
                    </StyledButton>
                    <StyledButton
                        onClick={() => {
                            setShowStoreModal(true);
                        }}
                    >
                        Open Store Modal
                    </StyledButton>
                </div>

                {showAlertM ? (
                    <GameAlert close={() => setShowAlertM(false)} size="medium">
                        Game Alert MEDIUM
                    </GameAlert>
                ) : null}
                {showAlertL ? (
                    <GameAlert close={() => setShowAlertL(false)} size="large">
                        Game Alert LARGE
                    </GameAlert>
                ) : null}
                {showStoreModal ? (
                    <StoreModal close={() => setShowStoreModal(false)}>
                        Game Store Modal
                    </StoreModal>
                ) : null}
            </article>
        </section>
    );
}
