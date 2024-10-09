import { useEffect } from "react";
import { Socket } from "socket.io-client";

// TODO: implement resign and draw offers
export function useChessWebSocket(
  socket: Socket | null,
  playerId: string,
  updateGameFromOpponent: (fen: string) => void,
  onTimerUpdate: (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => void,
) {
  useEffect(() => {
    if (!socket) return;
    // listening for game updates
    socket.on("moveMade", (data: any) => {
      updateGameFromOpponent(data.moveResult.board); // Update local game state with opponent's FEN
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

    return () => {
      socket.off("moveMade");
      socket.off("gameOver");
      socket.off("timerUpdate");
    };
  }, [socket, updateGameFromOpponent]);

  // function to make a move
  const makeMove = (from: string, to: string) => {
    if (socket) {
      socket.emit("game:makeMove", { playerId, from, to });
    }
  };

  return {
    makeMove,
  };
}
