import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface GameState {
    position: string; // FEN string
    // Otras propiedades del estado del juego
}

export function useChessWebSocket(gameId: string, playerId: string) {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io("http://localhost:3000"); // URL del servidor WebSocket
        setSocket(newSocket);

        // Unirse al juego
        newSocket.emit("game:join", { gameId, playerId });

        // Listener para actualizaciones del juego
        newSocket.on("moveMade", (data: any) => {
            setGameState(data);
        });

        newSocket.on("gameOver", (data: any) => {
            console.log("Game Over", data);
        });

        return () => {
            newSocket.disconnect(); // Desconectar al desmontar el componente
        };
    }, [gameId, playerId]);

    // Función para hacer un movimiento
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
