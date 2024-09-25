import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface GameState {
  position: string; // FEN string
}

// TODO: implement resign and draw offers

/**
 * Custom hook to manage moves and other events / messages for chess game
 *
 * @param socket - The WebSocket connection object.
 * @param playerId - The ID of the player.
 * @param updateGameFromOpponent - Function to update the game state with opponent's move.
 * @returns An object containing the game state and a function to make a move.
 */
export function useChessWebSocket(
  socket: Socket | null,
  playerId: string,
  updateGameFromOpponent: (fen: string) => void, // Función para actualizar el juego
) {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    if (!socket) return;
    // listening for game updates
    socket.on("moveMade", (data: any) => {
      setGameState(data);
      updateGameFromOpponent(data.board); // Update local game state with opponent's FEN
      console.log("Move Made", data);
    });

    socket.on("gameOver", (data: any) => {
      console.log("Game Over", data);
    });

    return () => {
      socket.off("moveMade");
      socket.off("gameOver");
    };
  }, [socket, updateGameFromOpponent]);

  // function to make a move
  const makeMove = (from: string, to: string) => {
    if (socket) {
      socket.emit("game:makeMove", { playerId, from, to });
    }
  };

  return {
    gameState,
    makeMove,
  };
}
