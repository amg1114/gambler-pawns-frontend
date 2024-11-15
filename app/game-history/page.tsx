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
  const [selectedIdGameMode, setSelectedIdGameMode] = useState("All");
  const [selectedIdPlayedAs, setSelectedIdPlayedAs] = useState("All");
  const [selectedIdResultType, setSelectedIdResultType] = useState("All");

  return (
    <section className="mt-lg grid w-[715px] grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="space-y-lg">
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
            selectedId={selectedIdGameMode}
            setSelectedId={setSelectedIdGameMode}
          />
        </div>
        <div>
          <p className={`${azeret_mono.className} pb-md font-bold`}>
            I played as
          </p>
          <DropdownButton
            options={arrayPlayedAsColor}
            dropDown={{ dropStyles: "outlined", title: "All" }}
            selectedId={selectedIdPlayedAs}
            setSelectedId={setSelectedIdPlayedAs}
          />
        </div>

        <div>
          <p className={`${azeret_mono.className} pb-md font-bold`}>
            Result Type
          </p>
          <DropdownButton
            options={arrayResultType}
            dropDown={{ dropStyles: "outlined", title: "All" }}
            selectedId={selectedIdResultType}
            setSelectedId={setSelectedIdResultType}
          />
        </div>
      </div>
      <GameResume
        options={{
          GameMode: selectedIdGameMode,
          ResultType: selectedIdResultType,
          PlayedAs: selectedIdPlayedAs,
        }}
      />
    </section>
  );
}
