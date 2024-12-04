"use client";

import Image from "next/image";
import Coin from "@/app/ui/icons/coin.svg";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import { useRouter } from "next/navigation";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";

export default function EndPuzzleModal() {
  const router = useRouter();

  return (
    <GameAlert
      close={() => {
        router.push("/puzzles");
      }}
    >
      <StyledTitle variant="h2" extraClasses="pt-md mb-xs text-center">
        Puzzle Done
      </StyledTitle>

      <div className="grid grid-cols-2">
        <StyledTitle variant="h4" extraClasses="text-right my-xs">
          2
        </StyledTitle>
        <Image src={Coin} alt="coin" className="my-xs ml-sm size-6" />
      </div>

      <div className="grid grid-cols-1 pt-md">
        <StyledButton
          variant="primary"
          extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
          onClick={() => router.push("/puzzles")}
        >
          New Puzzle
        </StyledButton>
      </div>
    </GameAlert>
  );
}
