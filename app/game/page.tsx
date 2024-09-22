"use client";

import { useSearchParams } from "next/navigation";
import { ChessBoardGame } from "../ui/components/chessBoardGame/chessBoardGame";
import { useGameInitialConnection } from "./_hooks/useGameInitialConnection";
import { useChessWebSocket } from "./_hooks/useChessWebSocket";
import { useChessGame } from "./_hooks/useChessGame";

export default function GamePage() {
    const searchParams = useSearchParams();
    const gameMode = searchParams.get("mode");
    const playerId = searchParams.get("playerId");
    const bet = +searchParams.get("bet");
    const eloRating = 1200; // TODO: get this from token next-auth

    // Hook para la conexión inicial
    const { socket, loading } = useGameInitialConnection(
        playerId as string,
        gameMode as string,
        bet,
        eloRating,
    );

    /*
    // Hook para manejar el tablero de ajedrez
    const chessGame = useChessGame("valid"); // Modo de juego

    // Hook para manejar los WebSockets
    const { gameState, makeMove } = useChessWebSocket(
        socket,
        playerId as string,
    );
    */
    if (loading) {
        return <div>Loading...</div>; // Mostrar un mensaje de carga mientras esperamos el ID del juego
    }

    return (
        <section className="space-y-xl py-xl">
            <ChessBoardGame
            // position={gameState?.position || chessGame.position}
            // onDrop={chessGame.onDrop}
            />
        </section>
    );
}
