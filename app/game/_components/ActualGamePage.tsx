"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { formatTimeMs } from "../utils/formatTimeMs";

// custom hooks
import { useSearchParams } from "next/navigation";
import { ChessBoardGame } from "../../ui/components/chessBoardGame/ChessBoardGame";
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
import SkeletonGame from "./SkeletonGame";
import UserInfo from "./UserInfo";

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

  // handle game events for modals
  const [isOpponentDrawOffer, setOpponentDrawOffer] = useState(false);
  const handleOpponentDrawOffer = () => {
    setOpponentDrawOffer(true);
  };
  // Handle current player draw offer
  const [isDrawOffer, setDrawOffer] = useState(false);
  const [isResignModalOpen, setResignModalOpen] = useState(false);
  const [endGameData, setEndGameData] = useState<endGameDataInterface | null>(
    null,
  );
  const [endGameStreakModalOpen, setEndGameStreakModalOpen] = useState(false);
  const [gameEndModalOpen, setGameEndModalOpen] = useState(false);

  const handleEndGame = (data: endGameDataInterface) => {
    setEndGameData(data);

    if (data.winner === "You") {
      setEndGameStreakModalOpen(true);
    } else {
      setGameEndModalOpen(true);
    }
  };

  // timers
  const [playerOneTime, setPlayerOneTime] = useState(timeMinutes * 60 * 1000);
  const [playerTwoTime, setPlayerTwoTime] = useState(timeMinutes * 60 * 1000);

  const handleTimerUpdate = (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => {
    setPlayerOneTime(times.playerOneTime);
    setPlayerTwoTime(times.playerTwoTime);
  };

  // player's info
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState<any>({});
  const [opponentPlayerInfo, setOpponentPlayerInfo] = useState<any>({});
  const [side, setSide] = useState<"white" | "black">("white");

  useEffect(() => {
    if (loading) return;
    const gameDataRaw = localStorage.getItem("gameData");
    if (!gameDataRaw) return;

    const gameData = JSON.parse(gameDataRaw);

    setSide(gameData.color);

    const blackData = {
      timer: formatTimeMs(playerTwoTime),
      nickname: gameData.playerBlack.nickname,
      eloRating: gameData.playerBlack.eloRapid,
      countryCode: gameData.playerBlack.countryCode,
      userAvatar: gameData.playerBlack.userAvatarImg.fileName,
    };

    const whiteData = {
      timer: formatTimeMs(playerOneTime),
      nickname: gameData.playerWhite.nickname,
      eloRating: gameData.playerWhite.eloRapid,
      countryCode: gameData.playerWhite.countryCode,
      userAvatar: gameData.playerWhite.userAvatarImg.fileName,
    };

    if (gameData.color === "white") {
      setCurrentPlayerInfo(whiteData);
      setOpponentPlayerInfo(blackData);
    } else {
      setCurrentPlayerInfo(blackData);
      setOpponentPlayerInfo(whiteData);
    }
  }, [playerOneTime, playerTwoTime, loading]);

  //Hook to validate and handle moves
  const chessGame = useChessGame("rapid", (from, to, promotion) => {
    makeMove(from, to, promotion);
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

  if (loading) {
    return <SkeletonGame />;
  }

  return (
    <>
      <section className="mx-auto max-w-screen-board">
        <p>
          {chessGame.gameHistoryMoves.map(
            (move, index) =>
              `${(index + 1) % 2 === 1 ? Math.floor(index / 2) + 1 + "." : ","} ${move} `,
          )}
        </p>
        <UserInfo
          isLoading={false}
          userData={opponentPlayerInfo}
          isCurrentPlayer={false}
        />
        <ChessBoardGame
          position={chessGame.position}
          onDrop={chessGame.onDrop}
          side={side}
        />
        <UserInfo
          isLoading={false}
          userData={currentPlayerInfo}
          isCurrentPlayer
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
      <StreakModal
        isOpen={endGameStreakModalOpen}
        streakNumber={session?.data?.streakDays || 0}
        moneyGameGiftForWinner={endGameData?.moneyGameGiftForWinner || 0}
        onClose={() => {
          setEndGameStreakModalOpen(false);
          setGameEndModalOpen(true);
        }}
      />
      {/* TODO: pasar el modod de juego dinamicamente */}
      <EndGameModal
        isOpen={gameEndModalOpen}
        gameData={endGameData as endGameDataInterface | null}
        gameMode={"rapid"}
        gameId={id as string}
      />
    </>
  );
}
