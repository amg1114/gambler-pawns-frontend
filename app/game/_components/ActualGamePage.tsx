"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { formatTimeMs } from "../utils/formatTimeMs";

// custom hooks
import { useSearchParams } from "next/navigation";
import { ChessBoardGame } from "../../ui/components/chessBoardGame/chessBoardGame";
import { useGameConnection } from "../_hooks/useGameConnection";
import { useChessWebSocket } from "../_hooks/useChessWebSocket";
import { useChessGame } from "../_hooks/useChessGame";
// components
import StyledButton from "@/app/ui/components/typography/StyledButton";
import OpponentDrawOfferModal from "./OpponentDrawOfferModal";
import OfferDrawModal from "./OfferDrawModal";
import ResignGameModal from "./ResignGameModal";
import EndGameModal, { endGameDataInterface } from "./EndGameModal";
import StreakModal from "./StreakModal";
export default function ActualGamePage({ id }: { id: string | undefined }) {
  const { data: session } = useSession();

  // get searchParams from URL
  const searchParams = useSearchParams();
  const gameMode = searchParams.get("mode");
  const playerId = searchParams.get("playerId");
  const bet = +(searchParams.get("bet") as string);
  const eloRating = 1200; // TODO: get this from token next-auth
  const timeMinutes = 10;
  const timeIncSeconds = 2;
  let gameId = undefined;

  // else get gameId from URL
  if (!searchParams.get("mode") && id !== "") {
    gameId = id;
  }

  // Hook to manage conection and reconnection
  const { socket, loading } = useGameConnection({
    gameId: gameId as string | undefined,
    playerId: playerId as string,
    gameMode: gameMode as string,
    bet,
    eloRating,
    timeMinutes,
    timeIncSeconds,
  });

  // Save timers (miliseconds)
  const [playerOneTime, setPlayerOneTime] = useState(timeMinutes * 60 * 1000);
  const [playerTwoTime, setPlayerTwoTime] = useState(timeMinutes * 60 * 1000);

  // Manejar actualización del reloj
  const handleTimerUpdate = (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => {
    setPlayerOneTime(times.playerOneTime);
    setPlayerTwoTime(times.playerTwoTime);
  };

  // Handle opponent draw offer
  const [isOpponentDrawOffer, setOpponentDrawOffer] = useState(false);
  const handleOpponentDrawOffer = () => {
    setOpponentDrawOffer(true);
  };

  // Handle current player draw offer
  const [isDrawOffer, setDrawOffer] = useState(false);

  // handle resign confirmation modal
  const [isResignModalOpen, setResignModalOpen] = useState(false);

  // handle gameEnd
  const [endGameData, setEndGameData] = useState<endGameDataInterface | null>(
    null,
  );
  const [gameEndModalOpen, setGameEndModalOpen] = useState(false);
  const handleEndGame = (data: endGameDataInterface) => {
    setEndGameData(data);
    if (data.winner === "You") {
      setGameEndModalOpen(true);
    }
    setGameEndModalOpen(false);
  };

  //Hook to validate and handle moves
  const chessGame = useChessGame("rapid", (from, to) => {
    // handling move
    makeMove(from, to);
  });

  // Hook to manage in-game events
  const { makeMove, acceptDraw, rejectDraw, offerDraw, resignGame } =
    useChessWebSocket(
      socket,
      playerId as string,
      chessGame.updateGameFromOpponent,
      handleTimerUpdate,
      handleOpponentDrawOffer,
      handleEndGame,
    );

  // muy importante esta condición, si se cambia comienza dar errores inesperados
  // TODO: dentro del if loading, mostrar el skeleton (importar el componente, no declararlo porque es muy grande)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="mx-auto max-w-screen-board">
        <div>
          <div>Player 1 Time: {formatTimeMs(playerOneTime)}</div>
          <div>Player 2 Time: {formatTimeMs(playerTwoTime)}</div>
        </div>
        <p>
          {chessGame.gameHistoryMoves.map(
            (move, index) =>
              `${(index + 1) % 2 === 1 ? Math.floor(index / 2) + 1 + "." : ","} ${move} `,
          )}
        </p>
        <ChessBoardGame
          position={chessGame.position}
          onDrop={chessGame.onDrop}
          side={JSON.parse(localStorage.getItem("gameData") as string).color}
        />
        <StyledButton
          onClick={() => {
            setDrawOffer(true);
          }}
        >
          Offer Draw
        </StyledButton>
        <StyledButton
          onClick={() => {
            setResignModalOpen(true);
          }}
        >
          Resign
        </StyledButton>
      </section>
      {/* Modals */}
      <ResignGameModal
        isOpen={isResignModalOpen}
        handleNo={() => {
          setResignModalOpen(false);
        }}
        handleYes={() => {
          setResignModalOpen(false);
          resignGame();
        }}
      />
      <OfferDrawModal
        isOpen={isDrawOffer}
        handleNo={() => {
          setDrawOffer(false);
        }}
        handleYes={() => {
          offerDraw();
          setDrawOffer(false);
        }}
      />
      <OpponentDrawOfferModal
        isOpen={isOpponentDrawOffer}
        acceptDraw={() => {
          setOpponentDrawOffer(false);
          acceptDraw();
        }}
        rejectDraw={() => {
          setOpponentDrawOffer(false);
          rejectDraw();
        }}
      />
      {!!endGameData && endGameData.winner === "You" && !!session?.data ? (
        <>
          <StreakModal
            isOpen={!!endGameData}
            streakNumber={session?.data?.streakDays || 0}
            moneyGameGiftForWinner={endGameData?.moneyGameGiftForWinner || 0}
            onClose={() => {
              setGameEndModalOpen(true);
            }}
          />
          {
            /* TODO: pasar el game mode dinamicamente */
            console.log("endGameData", gameEndModalOpen)
          }
          <EndGameModal
            isOpen={gameEndModalOpen}
            gameData={endGameData as endGameDataInterface | null}
            gameMode={"rapid"}
            gameId={id as string}
          />
        </>
      ) : (
        <EndGameModal
          isOpen={!!endGameData || true}
          gameData={endGameData as endGameDataInterface | null}
          gameMode={"rapid"}
          gameId={id as string}
        />
      )}
    </>
  );
}
