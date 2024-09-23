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
 * @returns An object containing the game state and a function to make a move.
 */
export function useChessWebSocket(socket: Socket | null, playerId: string) {
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {
        if (!socket) return;

        // listening for game updates
        socket.on("moveMade", (data: any) => {
            setGameState(data);
        });

        socket.on("gameOver", (data: any) => {
            console.log("Game Over", data);
        });

        return () => {
            socket.off("moveMade");
            socket.off("gameOver");
        };
    }, [socket]);

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
