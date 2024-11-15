"use client";
import { azeret_mono } from "@/app/ui/fonts";
import { useState } from "react";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import DropdownButton from "@/app/ui/components/DropDown/DropDownButton";
import GameResume from "@/app/game-history/_components/game-resume";

// Importing option arrays
import { arraySimplifyGameModes } from "@/app/ui/components/DropDown/optionArrays";
import { arrayPlayedAsColor } from "@/app/ui/components/DropDown/optionArrays";
import { arrayResultType } from "@/app/ui/components/DropDown/optionArrays";

export default function GameHistoryPage() {
  const [selectedGameMode, setSelectedGameMode] = useState("All");
  const [selectedPlayedAs, setSelectedPlayedAs] = useState("All");
  const [selectedResultType, setSelectedResultType] = useState("All");

  console.log(selectedGameMode, selectedPlayedAs, selectedResultType);

  return (
    <section className="flex flex-col items-center space-y-lg">
      <div className="w-[334px] space-y-lg">
        <StyledTitle variant="h1" extraClasses="text-center">
          Game History
        </StyledTitle>
        <div>
          <p className={`${azeret_mono.className} pb-md font-bold`}>
            Game Type
          </p>
          <DropdownButton
            options={arraySimplifyGameModes}
            dropDown={{ dropStyles: "outlined", title: "All" }}
            selectedLabel={selectedGameMode}
            setSelectedLabel={setSelectedGameMode}
          />
        </div>
        <div>
          <p className={`${azeret_mono.className} pb-md font-bold`}>
            I played as
          </p>
          <DropdownButton
            options={arrayPlayedAsColor}
            dropDown={{ dropStyles: "outlined", title: "All" }}
            selectedLabel={selectedPlayedAs}
            setSelectedLabel={setSelectedPlayedAs}
          />
        </div>

        <div>
          <p className={`${azeret_mono.className} pb-md font-bold`}>
            Result Type
          </p>
          <DropdownButton
            options={arrayResultType}
            dropDown={{ dropStyles: "outlined", title: "All" }}
            selectedLabel={selectedResultType}
            setSelectedLabel={setSelectedResultType}
          />
        </div>
      </div>
      <GameResume />
    </section>
  );
}
