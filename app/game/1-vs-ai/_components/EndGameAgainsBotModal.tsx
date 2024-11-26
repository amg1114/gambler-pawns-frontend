"use client";

import { useRouter } from "next/navigation";
// TODO: (in the future) all modals could be refactored with some react design pattern

// Components
import StyledButton from "../../../ui/components/typography/StyledButton";
import StyledTitle from "../../../ui/components/typography/StyledTitle";
// Icons
import GameAlert from "@/app/ui/components/modals/GameAlert";

export interface endGameDataInterface {
  winner: string;
  reason: string;
  eloChange: number;
  moneyGameGiftForWinner: number | null;
}

interface endGameInterface {
  isOpen: boolean;
  winner: "Bot" | "You" | "Draw";
  reason: string;
  onNewGame: () => void;
}

export default function EndGameAgainsBotModal({
  isOpen,
  winner,
  reason,
  onNewGame,
}: endGameInterface) {
  const router = useRouter();

  if (!isOpen) return;

  return (
    <GameAlert close={onNewGame}>
      <StyledTitle variant="h2" extraClasses="pt-md mb-xs text-center">
        {winner !== "Draw" ? winner + " Wins" : "Draw"}
      </StyledTitle>
      <StyledTitle variant="h3" extraClasses="mt-xs text-center !h-12">
        By {" " + reason}
      </StyledTitle>
      <div className="grid grid-cols-1 pt-md">
        <StyledButton
          variant="primary"
          extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
          onClick={onNewGame}
        >
          New Game
        </StyledButton>
        <StyledButton
          variant="primary"
          style="outlined"
          extraClasses="mx-auto !w-36"
          onClick={() => router.push(`/`)}
        >
          Menu
        </StyledButton>
      </div>
    </GameAlert>
  );
}
