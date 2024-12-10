"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { endGameDataInterface } from "../_components/EndGameModal";
import { formatTimeMs } from "../../lib/utils/formatTimeMs";
import UserInfo from "../_components/UserInfo";

// custom hooks
import { useGameTimers } from "./_hooks/useGameTimers";
import { useExceptionHandler } from "../_hooks/useGameExceptionHandler";
import { useChessPlayersInfo } from "./_hooks/useChessPlayersInfo";
import { useChessGame } from "@/app/lib/hooks/useChessGame";
import { useChessWebSocket } from "./_hooks/useChessWebSocket";
import { useGameContext } from "@/app/lib/contexts/GameDataContext";

// components
import StyledButton from "@/app/ui/components/typography/StyledButton";
import GameModals from "../_components/GameModals";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import ShowMessage from "../_components/ShowMessage";
import MovesHistory from "@/app/ui/components/chessBoardGame/MovesHistory";

interface DynamicGamePageProps {
  params: { id: string };
}

export default function DynamicGamePage({ params }: DynamicGamePageProps) {
  const { gameData } = useGameContext();

  const playerId = useMemo(() => {
    if (!gameData) return "";
    return (
      gameData.color === "white"
        ? gameData.playerWhite.userInfo.userId
        : gameData.playerBlack.userInfo.userId
    ).toString();
  }, [gameData]);

  /** State to manage if the opponent offers a draw */
  const [isOpponentDrawOfferModalOpen, setIsOpponentDrawOfferModalOpen] =
    useState(false);

  /** Handler to open the opponent draw offer modal. */
  const handleOpponentDrawOffer = useCallback(() => {
    setIsOpponentDrawOfferModalOpen(true);
  }, []);

  /** State to manage if you offer a draw */
  const [isDrawOfferModalOpen, setIsDrawOfferModalOpen] = useState(false);

  const handleDrawOfferCancelled = useCallback(() => {
    setIsDrawOfferModalOpen(false);
  }, []);

  /** State to manage if opponet rejects your draw offer*/
  const [wasDrawOfferRejected, setWasDrawOfferRejected] = useState(false);

  /** Handler to manage if your draw offer is rejected */
  const handleRejectDrawOffer = useCallback(() => {
    setWasDrawOfferRejected(true);
  }, []);

  useEffect(() => {
    if (!wasDrawOfferRejected) return;

    // Set a timer to hide the message after 10 seconds
    const timer = setTimeout(() => {
      setWasDrawOfferRejected(false);
    }, 10000);

    // Clears the timer if the component unmounts or the state changes
    return () => clearTimeout(timer);
  }, [wasDrawOfferRejected]);

  /** State to manage if the resign modal is open. */
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);

  /** Handler to manage if you cancel game resign */
  const handleResignGameCancelled = useCallback(() => {
    setIsResignModalOpen(false);
  }, []);

  /** State to hold game end data if game finishes */
  const [endGameData, setEndGameData] = useState<endGameDataInterface | null>(
    null,
  );

  /** State to manage whether streak modal is show or not */
  const [isEndGameStreakModalOpen, setIsEndGameStreakModalOpen] =
    useState(false);

  /** Handler to manage if you close streak modal */
  const hanldeCloseEndGameStreakModal = useCallback(() => {
    setIsEndGameStreakModalOpen(false);
    setIsGameEndModalOpen(true);
  }, []);

  /** State to manage whether game end modal is show or not */
  const [isGameEndModalOpen, setIsGameEndModalOpen] = useState(false);

  /** Handler to manage game end */
  const handleEndGame = useCallback((data: endGameDataInterface) => {
    setEndGameData(data);

    if (data.winner === "You") {
      setIsEndGameStreakModalOpen(true);
    } else {
      setIsGameEndModalOpen(true);
    }
  }, []);

  // timers
  const setInitialTimeMs = useCallback(() => {
    const timeMinutes = gameData?.timeInMinutes;
    const timeMinutesToMs = (timeMinutes ? timeMinutes : 5) * 60 * 1000;
    return timeMinutesToMs;
  }, [gameData?.timeInMinutes]);

  const { playerOneTime, playerTwoTime, handleTimerUpdate } =
    useGameTimers(setInitialTimeMs());

  // track inactivity timer
  const [inactivityTimer, setInactivityTimer] = useState<null | number>(null);

  const handleInactivityTimerUpdate = useCallback(
    (remainingMiliseconds: number) => {
      setInactivityTimer(remainingMiliseconds);
    },
    [],
  );

  // exception handling
  const {
    exception: backendChessServiceException,
    handleException: handleBackendChessServiceException,
  } = useExceptionHandler();

  // load players info
  const { currentPlayerInfo, opponentPlayerInfo } = useChessPlayersInfo(
    gameData,
    playerOneTime,
    playerTwoTime,
  );

  // TODO: resolver la dependencia circular entre useChessGame y useChessWebSocket
  // -> Una vez resuelta ver como se refactoriza la logica de este componente

  // Hook to interact with the chess game instance
  const chessGame = useChessGame({
    onMoveMade: (from: string, to: string, promotion: string) => {
      setInactivityTimer(null);
      emitWebsocketMakeMove(from, to, promotion);
    },
  });

  // Hook to manage in-game events
  const {
    emitWebsocketMakeMove,
    emitWebsocketAcceptDraw,
    emitWebsocketRejectDraw,
    emitWebsocketOfferDraw,
    emitWebsocketResignGame,
  } = useChessWebSocket(
    playerId,
    chessGame.loadGameFromPgn,
    handleTimerUpdate,
    handleOpponentDrawOffer,
    handleRejectDrawOffer,
    handleEndGame,
    handleInactivityTimerUpdate,
    handleBackendChessServiceException,
    gameData,
  );

  /** Handler to manage if you resign the game */
  const handleResignGameConfirmed = useCallback(() => {
    setIsResignModalOpen(false);
    emitWebsocketResignGame();
  }, [emitWebsocketResignGame]);

  /** Handler to manage if you offer a draw */
  const handleOfferDrawConfirmed = useCallback(() => {
    setIsDrawOfferModalOpen(false);
    emitWebsocketOfferDraw();
  }, [emitWebsocketOfferDraw]);

  /** Handler to manage that you rejects draw offer from opponent */
  const handleOpponentDrawOfferRejected = useCallback(() => {
    setIsOpponentDrawOfferModalOpen(false);
    emitWebsocketRejectDraw();
  }, [emitWebsocketRejectDraw]);

  /** Handler to manage that you accepts draw offer from opponent */
  const handleOpponentDrawOfferAccepted = useCallback(() => {
    setIsOpponentDrawOfferModalOpen(false);
    emitWebsocketAcceptDraw();
  }, [emitWebsocketAcceptDraw]);

  if (!gameData) return;

  return (
    <>
      <section className="mx-auto max-w-screen-board">
        {backendChessServiceException && (
          <ShowMessage message={backendChessServiceException.message} />
        )}
        {wasDrawOfferRejected && (
          <ShowMessage message="Draw offer was rejected" />
        )}
        {inactivityTimer && (
          <ShowMessage
            message={`Inactivity timer: ${formatTimeMs(inactivityTimer)}`}
          />
        )}
        <MovesHistory
          movesHistory={chessGame.movesHistory}
          extraClasses="mt-lg"
        />

        <div className="mb-md mt-lg">
          <UserInfo
            isLoading={false}
            userData={opponentPlayerInfo}
            isCurrentPlayer={false}
          />
        </div>
        <ChessBoardGame
          position={chessGame.position}
          onDrop={chessGame.makeMove}
          side={gameData.color}
          arePremovesAllowed={gameData.mode === "bullet"}
          game={chessGame.game}
        />
        <div className="my-md mb-lg">
          <UserInfo
            isLoading={false}
            userData={currentPlayerInfo}
            isCurrentPlayer
          />
        </div>
        <div className="flex justify-between">
          <StyledButton onClick={() => setIsDrawOfferModalOpen(true)}>
            Offer Draw
          </StyledButton>
          <StyledButton onClick={() => setIsResignModalOpen(true)}>
            Resign
          </StyledButton>
        </div>
      </section>
      <GameModals
        gameId={params.id}
        gameMode={gameData.mode}
        isResignModalOpen={isResignModalOpen}
        onResignGameConfirmed={handleResignGameConfirmed}
        onResignGameCancelled={handleResignGameCancelled}
        isDrawOfferModalOpen={isDrawOfferModalOpen}
        onOfferDrawConfirmed={handleOfferDrawConfirmed}
        onOfferDrawCancelled={handleDrawOfferCancelled}
        isOpponentDrawOfferModalOpen={isOpponentDrawOfferModalOpen}
        onAcceptDraw={handleOpponentDrawOfferAccepted}
        onRejectDraw={handleOpponentDrawOfferRejected}
        endGameData={endGameData}
        isGameEndModalOpen={isGameEndModalOpen}
        isEndGameStreakModalOpen={isEndGameStreakModalOpen}
        onCloseEndGameStreakModal={hanldeCloseEndGameStreakModal}
      />
    </>
  );
}
