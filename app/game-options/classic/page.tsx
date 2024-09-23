"use client";
import Image from "next/image";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import BetOption from "@/app/game-options/components/bet-options";
import Dropdown from "@/app/game-options/components/drop-down";

// Importing icons
import ChessTile from "@/app/ui/icons/chess-tile.svg";
import Dice from "@/app/ui/icons/dice.svg";
import Link from "@/app/ui/icons/link-shared.svg";

export default function ClassicOptionPage() {
  return (
    <section className="w-[334px] content-center space-y-xl">
      <StyledTitle variant="h1" extraClasses="text-center">
        Game Options
      </StyledTitle>

      <Dropdown
        dropDown={{
          dropStyles: "outlined",
          text: "Select a Game Mode",
        }}
      >
        <Dropdown.GameModesDrop></Dropdown.GameModesDrop>
      </Dropdown>

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
        <div>
          <Dropdown
            dropDown={{
              dropStyles: "filled",
              text: "Play vs. a Friend",
            }}
          >
            <Dropdown.FriendsDrop></Dropdown.FriendsDrop>
          </Dropdown>
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
