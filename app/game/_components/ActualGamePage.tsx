"use client";

import { useCallback, useEffect, useState } from "react";
import { formatTimeMs } from "../_utils/formatTimeMs";
import { BLACK, WHITE } from "chess.js";

// custom hooks
import { useGameConnection } from "../_hooks/useGameConnection";
import { useChessGame } from "../../lib/hooks/useChessGame";
import { useChessWebSocket } from "../_hooks/useChessWebSocket";
import { useExceptionHandler } from "../_hooks/useGameExceptionHandler";
import { useGameTimers } from "../_hooks/useGameTimers";

// components
import { ChessBoardGame } from "../../ui/components/chessBoardGame/ChessBoardGame";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import SkeletonGame from "./SkeletonGame";
import UserInfo from "./UserInfo";
import GameModals from "./GameModals";
import { endGameDataInterface } from "./EndGameModal";
import { useChessPlayersInfo } from "../_hooks/useChessPlayersInfo";

export default function ActualGamePage({ id }: { id: string | undefined }) {
  const { socket, loading, joinGameDataFormRequest, gameData } =
    useGameConnection({
      gameId: id,
    });

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
    const { timeMinutes } = joinGameDataFormRequest;
    const timeMinutesToMs = (timeMinutes ? timeMinutes : 5) * 60 * 1000;
    return timeMinutesToMs;
  }, [joinGameDataFormRequest]);

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
  const { currentPlayerInfo, opponentPlayerInfo, side } = useChessPlayersInfo(
    gameData,
    playerOneTime,
    playerTwoTime,
    loading,
  );

  // TODO: resolver la dependencia circular entre useChessGame y useChessWebSocket
  // -> Una vez resuelta ver como se refactoriza la logica de este componente

  // Hook to interact with the chess game instance
  const chessGame = useChessGame({
    onMoveMade: (from: string, to: string, promotion: string) => {
      setInactivityTimer(null);
      emitWebsocketMakeMove(from, to, promotion);
    },
    moveHandlerOptions: {
      playAs: side === "white" ? WHITE : BLACK,
      allowInvalidMoves: false,
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
    socket,
    joinGameDataFormRequest?.playerId,
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
    emitWebsocketResignGame();
    setIsResignModalOpen(false);
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

  if (loading) {
    return (
      <SkeletonGame
        joinGameDataFormRequest={joinGameDataFormRequest}
        exceptionFromBackendChessService={backendChessServiceException}
      />
    );
  }

  return (
    <>
      <section className="mx-auto max-w-screen-board">
        {/* TODO: crear un componente separado que se use para mostrar:
          -> 1. excepciones, el timer de inactividad, cuando alguien rechace una oferta de tablas */}
        {backendChessServiceException && (
          <p>{backendChessServiceException.message}</p>
        )}
        {wasDrawOfferRejected && <p>Draw offer was rejected</p>}
        {inactivityTimer && (
          <p>{`Inactivity timer: ${formatTimeMs(inactivityTimer)}`}</p>
        )}
        <p>
          {chessGame.movesHistory.map(
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
          onDrop={chessGame.makeMove}
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
            setIsDrawOfferModalOpen(true);
          }}
        >
          Offer Draw
        </StyledButton>
        <StyledButton
          onClick={() => {
            setIsResignModalOpen(true);
          }}
        >
          Resign
        </StyledButton>
      </section>
      <GameModals
        gameId={id}
        gameMode={joinGameDataFormRequest?.mode as string}
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
