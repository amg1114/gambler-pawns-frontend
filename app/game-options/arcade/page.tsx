"use client";
import Image from "next/image";

// Importing icons
import ChessTile from "@/app/ui/icons/chess-tile.svg";
import Dice from "@/app/ui/icons/dice.svg";
import Link from "@/app/ui/icons/link-shared.svg";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import BetOption from "@/app/game-options/_components/bet-options";
import ArcadeOptions from "@/app/game-options/_components/modifier-options";

export default function ClassicOptionPage() {
  return (
    <div className="mt-lg grid w-[715px] grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="space-y-lg">
        <StyledTitle variant="h1" extraClasses="text-center !mb-sm">
          Arcade Game Options
        </StyledTitle>
        <StyledTitle variant="h2" extraClasses="text-center">
          Select Modifiers
        </StyledTitle>

        <ArcadeOptions />

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
      </div>
      <div className="space-y-xl">
        <StyledTitle variant="h1" extraClasses="text-center">
          Against Who?
        </StyledTitle>

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
            <Image src={Link} alt="" className="h-auto w-auto pr-sm" />
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
    </div>
  );
}
