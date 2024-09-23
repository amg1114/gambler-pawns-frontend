"use client";

import { useSearchParams, useParams } from "next/navigation";
import { ChessBoardGame } from "../ui/components/chessBoardGame/chessBoardGame";
import { useGameConnection } from "./_hooks/useGameConnection"; // Unifica el hook de conexión
import { useChessWebSocket } from "./_hooks/useChessWebSocket";
import { useChessGame } from "./_hooks/useChessGame";
import { useEffect } from "react";
import path from "path";

export default function GamePage({ id = "" }) {
    // get searchParams from URL
    const searchParams = useSearchParams();
    const gameMode = searchParams.get("mode");
    const playerId = searchParams.get("playerId");
    const bet = +(searchParams.get("bet") as string);
    const eloRating = 1200; // TODO: get this from token next-auth
    let gameId = undefined;

    // else get gameId from URL
    if (!searchParams.get("mode") && id !== "") {
        gameId = id;
    }

    // Hook unificado para manejar la conexión inicial o reconexión
    const { socket, loading } = useGameConnection({
        gameId: gameId as string | undefined,
        playerId: playerId as string,
        gameMode: gameMode as string,
        bet,
        eloRating,
    });

    // Hook para manejar el tablero de ajedrez
    const chessGame = useChessGame("valid", (from, to) => {
        // Aquí manejas el movimiento
        makeMove(from, to);
    });

    // Hook para manejar los WebSockets
    const { gameState, makeMove } = useChessWebSocket(
        socket,
        playerId as string,
    );

    if (loading) {
        return <div>Loading...</div>; // Mostrar un mensaje de carga mientras esperamos el ID del juego
    }

    return (
        <section className="space-y-xl py-xl">
            <ChessBoardGame
                position={gameState?.position || chessGame.position}
                onDrop={chessGame.onDrop}
            />
        </section>
    );
}
