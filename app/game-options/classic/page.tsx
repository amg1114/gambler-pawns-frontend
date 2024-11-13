"use client";
import Image from "next/image";

// Importing option array
import { arraySimplifyGameModes } from "@/app/game-history/_components/optionArrays";

// components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import BetOption from "@/app/game-options/_components/bet-options";

// icons
import ErrorIcon from "@mui/icons-material/Error";
import ChessTile from "@/app/ui/icons/chess-tile.svg";
import Dice from "@/app/ui/icons/dice.svg";
import Link from "@/app/ui/icons/link-shared.svg";

// hooks
import {
  clearGameOptions,
  getGameOptions,
  setGameOptions,
} from "@/app/game-options/_hooks/game-options.hook";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import DropdownButton from "@/app/ui/components/DropDown/DropDownButton";

export default function ClassicOptionPage() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const handleCancelSubmission = () => {
    clearGameOptions();
    router.back();
  };

  const handleSubmission = () => {
    const gameOptions = getGameOptions();
    if (gameOptions) {
      if (gameOptions.mode && !gameOptions.bet) {
        setGameOptions({ bet: 0 });
      }

      router.push("/game");
      return;
    } else {
      setFormError("Please select all the game options");
      return;
    }
  };

  return (
    <section className="w-[334px] content-center space-y-xl">
      {formError && (
        <GameAlert close={() => setFormError(null)}>
          <StyledTitle extraClasses="text-center !flex items-center justify-center gap-sm">
            <ErrorIcon className="!text-4xl text-error" /> Error
          </StyledTitle>
          <StyledParagraph extraClasses="text-center">
            {formError}
          </StyledParagraph>
        </GameAlert>
      )}

      <StyledTitle variant="h1" extraClasses="text-center">
        Game Options
      </StyledTitle>
      <DropdownButton
        options={arraySimplifyGameModes}
        dropDown={{ dropStyles: "outlined", title: "All" }}
      />

      <StyledTitle variant="h2" extraClasses="text-center">
        Your bet
      </StyledTitle>
      <div>
        <fieldset className="flex justify-center pb-lg">
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
      <StyledTitle variant="h2" extraClasses="text-center">
        Against Who?
      </StyledTitle>
      <div>
        <div className="flex items-center justify-center py-md">
          <StyledButton
            extraClasses={"w-full flex justify-center"}
            onClick={() => handleSubmission()}
          >
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
        <div>
          <StyledButton>Friends</StyledButton>
        </div>

        <div className="flex items-center justify-center p-md">
          <StyledButton
            style="outlined"
            extraClasses="!px-[32px]"
            onClick={() => handleCancelSubmission()}
          >
            Cancel
          </StyledButton>
        </div>
      </div>
    </section>
  );
}
