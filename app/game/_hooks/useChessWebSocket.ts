import { useCallback, useEffect } from "react";
import { Socket } from "socket.io-client";
import { endGameDataInterface } from "../_components/EndGameModal";

interface UseChessWebSocketReturnType {
  makeMove: (from: string, to: string, promotion: string) => void;
  acceptDraw: () => void;
  rejectDraw: () => void;
  offerDraw: () => void;
  resignGame: () => void;
}

/**
 * Custom hook to manage WebSocket connections and events for a chess game.
 *
 * @param {Socket | null} socket - The WebSocket connection.
 * @param {string} playerId - The ID of the player.
 * @param {function} updateGameFromOpponent - Function to update the game state from the opponent's move.
 * @param {function} onTimerUpdate - Function to handle timer updates.
 * @param {function} setDrawOffer - Function to set the draw offer state.
 * @param {function} handleRejectDrawOffer - Function to handle the rejection of a draw offer.
 * @param {function} onGameEnd - Function to handle the end of the game.
 * @param {function} onInactivityTimerUpdate - Function to handle inactivity timer updates.
 * @param {function} onGameException - Function to handle game exceptions.
 * @param {any} gameData - The current game data.
 * @returns {UseChessWebSocketReturnType} - An object containing functions to make a move, accept a draw, reject a draw, offer a draw, and resign the game.
 */
export function useChessWebSocket(
  socket: Socket | null,
  playerId: string,
  updateGameFromOpponent: (fen: string, movesHistory: string[]) => void,
  onTimerUpdate: (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => void,
  setDrawOffer: (value: boolean) => void,
  handleRejectDrawOffer: () => void,
  onGameEnd: (data: endGameDataInterface) => void,
  onInactivityTimerUpdate: (data: any) => void,
  onGameException: (data: any) => void,
  gameData: any,
): UseChessWebSocketReturnType {
  // hadlers for game events socket listeners

  /**
   * Listens for a move made by the opponent.
   */
  const handleMoveMade = useCallback(
    (data: any) => {
      // Update local game state with server's game instance FEN
      updateGameFromOpponent(
        data.moveResult.board,
        data.moveResult.historyMoves,
      );
    },
    [updateGameFromOpponent],
  );

  /**
   * Handles timer updates.
   */
  const handleTimerUpdate = useCallback(
    (data: any) => {
      onTimerUpdate({
        playerOneTime: data.playerOneTime,
        playerTwoTime: data.playerTwoTime,
      });
    },
    [onTimerUpdate],
  );

  /**
   * Handles inactivity countdown updates.
   */
  const handleInactivityCountdownUpdate = useCallback(
    (data: any) => {
      onInactivityTimerUpdate(data.remainingMiliseconds);
    },
    [onInactivityTimerUpdate],
  );

  /**
   * Handles a draw offer from the opponent.
   */
  const handleDrawOffered = useCallback(() => {
    setDrawOffer(true);
  }, [setDrawOffer]);

  /**
   * Handles the rejection of a draw offer.
   */
  const handleDrawRejected = useCallback(() => {
    handleRejectDrawOffer();
  }, [handleRejectDrawOffer]);

  /**
   * Handles the end of the game.
   */
  const handleGameEnd = useCallback(
    (data: any) => {
      const mySide = gameData?.color;

      let winner;
      if (
        (data.winner === "w" && mySide === "white") ||
        (data.winner === "b" && mySide === "black")
      ) {
        winner = "You";
      } else if (data.winner === "w") {
        winner = "White";
      } else if (data.winner === "b") {
        winner = "Black";
      } else {
        winner = "Draw";
      }

      // set elo change
      let eloChange;
      if (mySide === "white") {
        eloChange = data.eloWhitesAfterGameVariation;
      } else {
        eloChange = data.eloBlacksAfterGameVariation;
      }

      onGameEnd({
        winner: winner,
        reason: data.resultType,
        eloChange,
        moneyGameGiftForWinner: data.gameGiftForWin,
      });
    },
    [gameData?.color, onGameEnd],
  );

  /**
   * Handles game exceptions.
   */
  const handleException = useCallback(
    (data: any) => {
      onGameException(data);
    },
    [onGameException],
  );

  useEffect(() => {
    if (!socket) return;

    // listening for game updates
    socket.on("moveMade", handleMoveMade);
    socket.on("timerUpdate", handleTimerUpdate);
    socket.on("inactivity:countdown:update", handleInactivityCountdownUpdate);
    socket.on("drawOffered", handleDrawOffered);
    socket.on("drawRejected", handleDrawRejected);
    socket.on("gameEnd", handleGameEnd);
    socket.on("exception", handleException);

    return () => {
      // cleanup listeners when component unmounts
      socket.off("moveMade", handleMoveMade);
      socket.off("timerUpdate", handleTimerUpdate);
      socket.off(
        "inactivity:countdown:update",
        handleInactivityCountdownUpdate,
      );
      socket.off("drawOffered", handleDrawOffered);
      socket.off("drawRejected", handleDrawRejected);
      socket.off("gameEnd", handleGameEnd);
      socket.off("exception", handleException);
    };
  }, [
    handleDrawOffered,
    handleDrawRejected,
    handleException,
    handleGameEnd,
    handleInactivityCountdownUpdate,
    handleMoveMade,
    handleTimerUpdate,
    socket,
  ]);

  // functions to emit events
  /**
   * Emits event to make a move.
   */
  const makeMove = useCallback(
    (from: string, to: string, promotion: string) => {
      if (socket) {
        socket.emit("game:makeMove", { playerId, from, to, promotion });
      }
    },
    [socket, playerId],
  );

  /**
   * Emits event to accept a draw offer.
   */
  const acceptDraw = useCallback(() => {
    if (socket) {
      socket.emit("game:acceptDraw", {
        playerId,
        gameId: gameData?.gameId,
      });
    }
  }, [socket, playerId, gameData?.gameId]);

  /**
   * Emits event to reject a draw offer.
   */
  const rejectDraw = useCallback(() => {
    if (socket) {
      socket.emit("game:rejectDraw", {
        playerId,
        gameId: gameData?.gameId,
      });
    }
  }, [socket, playerId, gameData?.gameId]);

  /**
   * Emits event to offer a draw to the opponent.
   */
  const offerDraw = useCallback(() => {
    if (socket) {
      socket.emit("game:offerDraw", {
        playerId,
        gameId: gameData?.gameId,
      });
    }
  }, [socket, playerId, gameData?.gameId]);

  /**
   * Emits event to resign the game.
   */
  const resignGame = useCallback(() => {
    if (socket) {
      socket.emit("game:resign", { playerId });
    }
  }, [socket, playerId]);

  return {
    makeMove,
    acceptDraw,
    rejectDraw,
    offerDraw,
    resignGame,
  };
}
