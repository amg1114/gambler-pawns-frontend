import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { endGameDataInterface } from "../_components/EndGameModal";

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
  handleException: (data: any) => void,
) {
  useEffect(() => {
    if (!socket) return;
    // listening for game updates
    socket.on("moveMade", (data: any) => {
      console.log(data);

      updateGameFromOpponent(
        data.moveResult.board,
        data.moveResult.historyMoves,
      ); // Update local game state with server's game instance FEN
    });

    // Listen for game over event
    socket.on("gameOver", (data: any) => {
      console.log("Game Over", data);
    });

    // Listen for timer updates
    socket.on("timerUpdate", (data: any) => {
      onTimerUpdate({
        playerOneTime: data.playerOneTime,
        playerTwoTime: data.playerTwoTime,
      });
    });

    // Listen for inactivity timer updates
    socket.on("inactivity:countdown:update", (data: any) => {
      onInactivityTimerUpdate(data.remainingMiliseconds);
    });

    // Liste for draw offers
    socket.on("drawOffered", (data: any) => {
      setDrawOffer(true);
      console.log("Draw offered", data);
    });

    socket.on("drawAccepted", (data: any) => {
      console.log("Draw accepted", data);
    });

    socket.on("drawRejected", (data: any) => {
      handleRejectDrawOffer();
      console.log("Draw rejected", data);
    });

    socket.on("gameEnd", (data) => {
      // set winner
      const mySide = JSON.parse(
        sessionStorage.getItem("gameData") as string,
      ).color;

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
    });

    // loging exceptions
    socket.on("exception", (data: any) => {
      handleException(data);
      console.error("Exception", data);
    });

    return () => {
      // cleanup listeners when component unmounts
      socket.off("moveMade");
      socket.off("gameOver");
      socket.off("timerUpdate");
      socket.off("drawOffered");
      socket.off("drawAccepted");
      socket.off("drawRejected");
      socket.off("gameEnd");
      socket.off("inactivity:countdown:update");
      socket.off("exception");
    };
  }, [
    socket,
    updateGameFromOpponent,
    onTimerUpdate,
    onInactivityTimerUpdate,
    setDrawOffer,
    handleRejectDrawOffer,
    onGameEnd,
  ]);

  // function to make a move
  const makeMove = (from: string, to: string, promotion: string) => {
    if (socket) {
      socket.emit("game:makeMove", { playerId, from, to, promotion });
    }
  };
  // oppontent offers a draw
  const acceptDraw = () => {
    if (socket) {
      socket.emit("game:acceptDraw", {
        playerId,
        gameId: JSON.parse(sessionStorage.getItem("gameData") as string).gameId,
      });
    }
  };

  const rejectDraw = () => {
    if (socket) {
      socket.emit("game:rejectDraw", {
        playerId,
        gameId: JSON.parse(sessionStorage.getItem("gameData") as string).gameId,
      });
    }
  };

  // current player offers a draw
  const offerDraw = () => {
    if (socket) {
      socket.emit("game:offerDraw", {
        playerId,
        gameId: JSON.parse(sessionStorage.getItem("gameData") as string).gameId,
      });
    }
  };

  const resignGame = () => {
    if (socket) {
      socket.emit("game:resign", { playerId });
    }
  };

  return {
    makeMove,
    acceptDraw,
    rejectDraw,
    offerDraw,
    resignGame,
  };
}
