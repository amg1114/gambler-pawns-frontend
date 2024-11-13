"use client";
import { azeret_mono, nunito } from "@/app/ui/fonts";
import Image from "next/image";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import Aguacate from "@/app/ui/icons/aguacate.png";
import DropdownButton from "../ui/components/DropDown/DropDownButton";

// Importing option arrays
import { arraySimplifyGameModes } from "@/app/game-history/_components/optionArrays";
import { arrayPlayedAsColor } from "@/app/game-history/_components/optionArrays";
import { arrayResultType } from "@/app/game-history/_components/optionArrays";

export default function GameHistoryPage() {
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
          />
        </div>
        <div>
          <p className={`${azeret_mono.className} pb-md font-bold`}>
            I played as
          </p>
          <DropdownButton
            options={arrayPlayedAsColor}
            dropDown={{ dropStyles: "outlined", title: "All" }}
          />
        </div>

        <div>
          <p className={`${azeret_mono.className} pb-md font-bold`}>
            Result Type
          </p>
          <DropdownButton
            options={arrayResultType}
            dropDown={{ dropStyles: "outlined", title: "All" }}
          />
        </div>
      </div>
      <div className="w-[386px] space-y-lg">
        <div className="flex">
          <Image
            src={Aguacate}
            alt=""
            width={52}
            height={52}
            className="h-14 w-14"
          />
          <ul className="pl-md">
            <li className={`${azeret_mono.className} pb-xs font-bold`}>
              Pepito39427 (1250)
            </li>
            <li className={`${nunito.className} pb-md font-light`}>
              Classic,10min +2sec increment -3 sep 2024
            </li>
            <StyledButton extraClasses="py-xs px-sm">Watch Again</StyledButton>
          </ul>
        </div>
      </div>
    </section>
  );
}
