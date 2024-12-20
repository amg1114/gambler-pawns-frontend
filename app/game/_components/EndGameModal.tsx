"use client";

// Components
import StyledButton from "../../ui/components/typography/StyledButton";
import StyledTitle from "../../ui/components/typography/StyledTitle";
// Icons
import Image from "next/image";
import Coin from "../../ui/icons/coin.svg";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import { useRouter } from "next/navigation";
import { formatSignedNumber } from "../[id]/_utils/formatSignedNumber";

export interface endGameDataInterface {
  winner: string;
  reason: string;
  eloChange: number;
  moneyGameGiftForWinner: number | null;
}

interface endGameInterface {
  isOpen: boolean;
  gameMode: string | undefined;
  gameId: string | undefined;
  gameData: endGameDataInterface | null;
}

const EndGameModal = ({
  isOpen,
  gameMode,
  gameId,
  gameData,
}: endGameInterface) => {
  const router = useRouter();

  if (!isOpen || !gameData) return;

  return (
    <GameAlert
      close={() => {
        router.push("/");
        sessionStorage.removeItem("joinGameDataFormRequest");
      }}
    >
      <StyledTitle variant="h2" extraClasses="pt-md mb-xs text-center">
        {gameData.winner !== "Draw" ? gameData.winner + " Wins" : "Draw"}
      </StyledTitle>
      <StyledTitle variant="h3" extraClasses="mt-xs text-center !h-12">
        By {" " + gameData.reason}
      </StyledTitle>

      <div className="grid grid-cols-2">
        <StyledTitle variant="h4" extraClasses="text-right my-xs">
          {formatSignedNumber(gameData.moneyGameGiftForWinner as number)}
        </StyledTitle>
        <Image src={Coin} alt="coin" className="my-xs ml-sm size-6" />
      </div>

      <StyledTitle variant="h4" extraClasses="text-center my-xs  ">
        {formatSignedNumber(gameData.eloChange) + " "} ELO
      </StyledTitle>
      <div className="grid grid-cols-1 pt-md">
        <StyledButton
          variant="primary"
          extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
          onClick={() => {
            sessionStorage.removeItem("joinGameDataFormRequest");
            if (gameMode === "arcade") {
              router.push("game-options/arcade");
            }
            router.push("/game-options/classic");
          }}
        >
          New Game
        </StyledButton>
        <StyledButton
          variant="primary"
          style="outlined"
          extraClasses="mx-auto !w-36"
          onClick={() => {
            router.push(`/game-history/${gameId}`);
            sessionStorage.removeItem("joinGameDataFormRequest");
          }}
        >
          Watch Again
        </StyledButton>
      </div>
    </GameAlert>
  );
};

export default EndGameModal;
