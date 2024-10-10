import { useEffect } from "react";
import { Socket } from "socket.io-client";

// TODO: implement resign and draw offers
export function useChessWebSocket(
  socket: Socket | null,
  playerId: string,
  updateGameFromOpponent: (fen: string, movesHistory: string[]) => void,
  onTimerUpdate: (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => void,
  setDrawOffer: (value: boolean) => void,
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

    // Liste for draw offers
    socket.on("drawOffered", (data: any) => {
      // on draw offer
      setDrawOffer(true);
      console.log("Draw offered", data);
    });

    socket.on("drawAccepted", (data: any) => {
      // on draw accepted
      console.log("Draw accepted", data);
    });

    socket.on("drawRejected", (data: any) => {
      // on draw rejected
      console.log("Draw rejected", data);
    });

    return () => {
      // cleanup listeners when component unmounts
      socket.off("moveMade");
      socket.off("gameOver");
      socket.off("timerUpdate");
      socket.off("drawOffered");
      socket.off("drawAccepted");
      socket.off("drawRejected");
    };
  }, [socket, updateGameFromOpponent, onTimerUpdate, setDrawOffer]);

  // function to make a move
  const makeMove = (from: string, to: string) => {
    if (socket) {
      socket.emit("game:makeMove", { playerId, from, to });
    }
  };
  // oppontent offers a draw
  const acceptDraw = () => {
    if (socket) {
      socket.emit("game:acceptDraw", {
        playerId,
        gameId: JSON.parse(localStorage.getItem("gameData") as string).gameId,
      });
    }
  };

  const rejectDraw = () => {
    if (socket) {
      socket.emit("game:rejectDraw", {
        playerId,
        gameId: JSON.parse(localStorage.getItem("gameData") as string).gameId,
      });
    }
  };

  // current player offers a draw
  const offerDraw = () => {
    if (socket) {
      socket.emit("game:offerDraw", {
        playerId,
        gameId: JSON.parse(localStorage.getItem("gameData") as string).gameId,
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
