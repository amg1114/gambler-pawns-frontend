import { useCallback, useEffect } from "react";
import { endGameDataInterface } from "../../_components/EndGameModal";
import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";

interface UseChessWebSocketReturnType {
  emitWebsocketMakeMove: (from: string, to: string, promotion: string) => void;
  emitWebsocketAcceptDraw: () => void;
  emitWebsocketRejectDraw: () => void;
  emitWebsocketOfferDraw: () => void;
  emitWebsocketResignGame: () => void;
}

/**
 * Custom hook to manage WebSocket connections and events for a chess game.
 *
 * @param {string} playerId - The ID of the player.
 * @param {function} onOpponentMove - Function to update the game state from the opponent's move.
 * @param {function} onTimerUpdate - Function to handle timer updates.
 * @param {function} onDrawOffer - Function to set the draw offer state.
 * @param {function} onDrawOfferRejected - Function to handle the rejection of a draw offer.
 * @param {function} onGameEnd - Function to handle the end of the game.
 * @param {function} onInactivityTimerUpdate - Function to handle inactivity timer updates.
 * @param {function} onGameException - Function to handle game exceptions.
 * @param {any} gameData - The current game data.
 * @returns {UseChessWebSocketReturnType} - An object containing functions to make a move, accept a draw, reject a draw, offer a draw, and resign the game.
 */
export function useChessWebSocket(
  playerId: string,
  onOpponentMove: (pgn: string) => void,
  onTimerUpdate: (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => void,
  onDrawOffer: (value: boolean) => void,
  onDrawOfferRejected: () => void,
  onGameEnd: (data: endGameDataInterface) => void,
  onInactivityTimerUpdate: (data: any) => void,
  onGameException: (data: any) => void,
  gameData: any,
): UseChessWebSocketReturnType {
  const { socket } = useWebSocketConnection();

  // hadlers for game events socket listeners

  /** Listens for a move made by the opponent. */
  const handleMoveMade = useCallback(
    (data: any) => {
      // Update local game state with server's game instance PGN
      onOpponentMove(data.moveResult.pgn);
    },
    [onOpponentMove],
  );

  /** Handles timer updates.*/
  const handleTimerUpdate = useCallback(
    (data: any) => {
      onTimerUpdate({
        playerOneTime: data.playerOneTime,
        playerTwoTime: data.playerTwoTime,
      });
    },
    [onTimerUpdate],
  );

  /** Handles inactivity countdown updates. */
  const handleInactivityCountdownUpdate = useCallback(
    (data: any) => {
      onInactivityTimerUpdate(data.remainingMiliseconds);
    },
    [onInactivityTimerUpdate],
  );

  /** Handles a draw offer from the opponent. */
  const handleDrawOffered = useCallback(() => {
    onDrawOffer(true);
  }, [onDrawOffer]);

  /** Handles the rejection of a draw offer. */
  const handleDrawRejected = useCallback(() => {
    onDrawOfferRejected();
  }, [onDrawOfferRejected]);

  /** Handles the end of the game. */
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

  /** Handles game exceptions. */
  const handleException = useCallback(
    (data: any) => {
      onGameException(data);
    },
    [onGameException],
  );

  /** Handles game reconnection. */
  const handleGameReconnected = useCallback(
    (data: any) => {
      onOpponentMove(data.pgn);
    },
    [onOpponentMove],
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
    socket.on("game:reconnected", handleGameReconnected);

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
      socket.off("game:reconnected", handleGameReconnected);
    };
  }, [
    handleDrawOffered,
    handleDrawRejected,
    handleException,
    handleGameEnd,
    handleInactivityCountdownUpdate,
    handleMoveMade,
    handleTimerUpdate,
    handleGameReconnected,
    socket,
  ]);

  // functions to emit events
  /** Emits event to make a move. */
  const emitWebsocketMakeMove = useCallback(
    (from: string, to: string, promotion: string) => {
      if (!socket) return;
      socket.emit("game:makeMove", { playerId, from, to, promotion });
    },
    [socket, playerId],
  );

  /** Emits event to accept a draw offer.*/
  const emitWebsocketAcceptDraw = useCallback(() => {
    if (!socket) return;

    socket.emit("game:acceptDraw", {
      playerId,
      gameId: gameData.gameId,
    });
  }, [socket, playerId, gameData?.gameId]);

  /** Emits event to reject a draw offer. */
  const emitWebsocketRejectDraw = useCallback(() => {
    if (!socket) return;

    socket.emit("game:rejectDraw", {
      playerId,
      gameId: gameData.gameId,
    });
  }, [socket, playerId, gameData?.gameId]);

  /** Emits event to offer a draw to the opponent.*/
  const emitWebsocketOfferDraw = useCallback(() => {
    if (!socket) return;

    socket.emit("game:offerDraw", {
      playerId,
      gameId: gameData.gameId,
    });
  }, [socket, playerId, gameData?.gameId]);

  /** Emits event to resign the game.*/
  const emitWebsocketResignGame = useCallback(() => {
    if (!socket) return;

    socket.emit("game:resign", { playerId });
  }, [socket, playerId]);

  /** Emits event to reconnect to game */
  const emitWebsocketReconnectGame = useCallback(() => {
    if (!socket) return;
    socket.emit("game:reconnect", { playerId, gameId: gameData.gameId });
  }, [socket, playerId, gameData?.gameId]);

  // reconnect to game when component mounts
  // TODO: verificar si hay una manera mejor de hacer esto, cuando alguien pierda la conexión o cuando intencionalmente recargue la página
  useEffect(() => {
    emitWebsocketReconnectGame();
  }, [emitWebsocketReconnectGame]);

  return {
    emitWebsocketMakeMove,
    emitWebsocketAcceptDraw,
    emitWebsocketRejectDraw,
    emitWebsocketOfferDraw,
    emitWebsocketResignGame,
  };
}
