"use client";
import { azeret_mono, bungee } from "@/app/ui/fonts";
import Image from "next/image";
import Board from "../ui/icons/board.svg";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "../ui/components/typography/StyledParagraph";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import Fire from "../ui/icons/fire.svg";
import Arcade from "../ui/icons/arcade.svg";
import Classic from "../ui/icons/classic.svg";

export default function HomePage() {
  let friends: String[]; /*arreglo de tipo user*/
  return (
    <div className="w-auto grid-cols-2 gap-14 lg:grid">
      <div className="my-3xl w-auto space-y-5">
        <div className="h-auto w-auto bg-dark-2 p-md">
          <StyledTitle variant="h2" extraClasses="text-left text-slate-500 ">
            Welcome to the game
          </StyledTitle>
          <StyledParagraph extraClasses="text-left text-slate-500">
            Enjoy chess with our new features, learn more in about
          </StyledParagraph>
        </div>
        <Image src={Board} alt="" className="w-full" />
      </div>
      <div className="my-3xl w-auto space-y-5">
        <StyledTitle variant="h1" extraClasses="text-left text-center">
          SELECT GAME MODE
        </StyledTitle>
        <StyledButton variant="primary" style="outlined" extraClasses="w-full ">
          Single Player
        </StyledButton>
        <StyledButton variant="primary" style="filled" extraClasses="w-full ">
          Arcade
        </StyledButton>
        <StyledButton variant="primary" style="outlined" extraClasses="w-full ">
          Against AI
        </StyledButton>
        <StyledButton variant="primary" style="outlined" extraClasses="w-full ">
          Puzzles
        </StyledButton>
        {/*Stats section*/}
        <div className="h-auto w-auto bg-dark-2 p-md">
          <StyledTitle variant="h2" extraClasses="text-left text-lg ">
            My stats
          </StyledTitle>
          <div className="flex space-x-5">
            <div className="rounded-lg p-4 flex h-40 w-32 flex-col items-center justify-center bg-dark-1 shadow-lg">
              <StyledTitle variant="h3">Streak</StyledTitle>
              <Image src={Fire} alt="" className="h-12 w-9" />
              <p className="text-slate-300 text-lg">14 days</p>
            </div>
            <div className="rounded-lg p-4 flex h-40 w-32 flex-col items-center justify-center bg-dark-1 shadow-lg">
              <StyledTitle variant="h3">Classic</StyledTitle>
              <Image src={Classic} alt="" className="h-12 w-9" />
              <p className="text-slate-300 text-lg">14 days</p>
            </div>
            <div className="rounded-lg p-4 flex h-40 w-32 flex-col items-center justify-center bg-dark-1 shadow-lg">
              <StyledTitle variant="h3">Arcade</StyledTitle>
              <Image src={Arcade} alt="" className="h-12 w-9" />
              <p className="text-slate-300 text-lg">14 days</p>
            </div>
          </div>
        </div>
        {/*Friends section*/}
        <div className="h-auto w-auto bg-dark-2 p-md">
          <StyledTitle variant="h2" extraClasses="text-left text-lg ">
            Friends
          </StyledTitle>
        </div>
      </div>
    </div>
  );
}
