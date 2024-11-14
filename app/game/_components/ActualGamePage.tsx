"use client";

import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { formatTimeMs } from "../_utils/formatTimeMs";

// custom hooks
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

  const gameId = id;

  const { socket, loading, joinGameDataFormRequest, gameData } =
    useGameConnection({
      gameId: gameId,
    });

  // handle game events for modals
  const [isOpponentDrawOffer, setOpponentDrawOffer] = useState(false);
  const handleOpponentDrawOffer = () => {
    setOpponentDrawOffer(true);
  };
  // Handle current player draw offer
  const [isDrawOffer, setDrawOffer] = useState(false);
  const [isDrawOfferRejected, setDrawOfferRejected] = useState(false);
  const handleRejectDrawOffer = () => {
    setDrawOfferRejected(true);
  };
  useEffect(() => {
    if (isDrawOfferRejected) {
      const timer = setTimeout(() => {
        setDrawOfferRejected(false);
      }, 10000); // after 10 seconds the message will disappear

      return () => clearTimeout(timer); // Clears the timer if the component unmounts or the state changes
    }
  }, [isDrawOfferRejected]);

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
  const [playerOneTime, setPlayerOneTime] = useState(5 * 60 * 1000);
  const [playerTwoTime, setPlayerTwoTime] = useState(5 * 60 * 1000);

  useLayoutEffect(() => {
    if (!joinGameDataFormRequest?.timeMinutes) return;
    setPlayerOneTime(joinGameDataFormRequest.timeMinutes * 60 * 1000);
    setPlayerTwoTime(joinGameDataFormRequest.timeMinutes * 60 * 1000);
  }, [joinGameDataFormRequest?.timeMinutes]);

  const handleTimerUpdate = (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => {
    setPlayerOneTime(times.playerOneTime);
    setPlayerTwoTime(times.playerTwoTime);
  };

  const [inactivityTimer, setInactivityTimer] = useState<null | number>(null);

  const handleInactivityTimerUpdate = (remainingMiliseconds: number) => {
    setInactivityTimer(remainingMiliseconds);
  };

  // exception handling
  const [
    exceptionFromBackendChessService,
    setExceptionFromBackendChessService,
  ] = useState<any>(null);
  const handleExceptionFromBackendChessService = (data: any) => {
    setExceptionFromBackendChessService(data);
  };

  useEffect(() => {
    if (exceptionFromBackendChessService) {
      const timer = setTimeout(() => {
        setExceptionFromBackendChessService(null);
      }, 10000); // after 10 seconds the message will disappear

      return () => clearTimeout(timer); // Clears the timer if the component unmounts or the state changes
    }
  }, [exceptionFromBackendChessService]);

  // player's info
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState<any>({});
  const [opponentPlayerInfo, setOpponentPlayerInfo] = useState<any>({});
  const [side, setSide] = useState<"white" | "black">("white");

  useLayoutEffect(() => {
    if (loading) return;
    setSide(gameData.color);

    const blackData = {
      timer: formatTimeMs(playerTwoTime),
      nickname: gameData.playerBlack.userInfo.nickname,
      eloRating: gameData.playerBlack.elo,
      countryCode: gameData.playerBlack.userInfo.countryCode,
      userAvatar: gameData.playerBlack.userInfo.userAvatarImg.fileName,
    };

    const whiteData = {
      timer: formatTimeMs(playerOneTime),
      nickname: gameData.playerWhite.userInfo.nickname,
      eloRating: gameData.playerWhite.elo,
      countryCode: gameData.playerWhite.userInfo.countryCode,
      userAvatar: gameData.playerWhite.userInfo.userAvatarImg.fileName,
    };

    if (gameData.color === "white") {
      setCurrentPlayerInfo(whiteData);
      setOpponentPlayerInfo(blackData);
    } else {
      setCurrentPlayerInfo(blackData);
      setOpponentPlayerInfo(whiteData);
    }
  }, [playerOneTime, playerTwoTime, loading, gameData]);

  //Hook to validate and handle moves
  const chessGame = useChessGame(
    joinGameDataFormRequest?.mode,
    gameData,
    (from, to, promotion) => {
      setInactivityTimer(null);
      makeMove(from, to, promotion);
    },
  );

  // Hook to manage in-game events
  const { makeMove, acceptDraw, rejectDraw, offerDraw, resignGame } =
    useChessWebSocket(
      socket,
      joinGameDataFormRequest?.playerId,
      chessGame.updateGameFromOpponent,
      handleTimerUpdate,
      handleOpponentDrawOffer,
      handleRejectDrawOffer,
      handleEndGame,
      handleInactivityTimerUpdate,
      handleExceptionFromBackendChessService,
    );

  if (loading || !gameData) {
    return (
      <SkeletonGame
        joinGameDataFormRequest={joinGameDataFormRequest}
        exceptionFromBackendChessService={exceptionFromBackendChessService}
      />
    );
  }

  return (
    <>
      <section className="mx-auto max-w-screen-board">
        {/* TODO: crear un componente separado que se use para mostrar:
          -> 1. excepciones, el timer de inactividad, cuando alguien rechace una oferta de tablas */}
        {exceptionFromBackendChessService ? (
          <p>{exceptionFromBackendChessService.message}</p>
        ) : null}
        {isDrawOfferRejected ? <p>Draw offer was rejected</p> : null}
        {inactivityTimer ? (
          <p>{`Inactivity timer: ${formatTimeMs(inactivityTimer)}`}</p>
        ) : null}
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
          arePremovesAllowed={joinGameDataFormRequest?.mode === "bullet"}
          game={chessGame.game}
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
        onClose={() => {
          setEndGameStreakModalOpen(false);
          setGameEndModalOpen(true);
        }}
      />
      <EndGameModal
        isOpen={gameEndModalOpen}
        gameData={endGameData as endGameDataInterface | null}
        gameMode={joinGameDataFormRequest.mode}
        gameId={id as string}
      />
    </>
  );
}
