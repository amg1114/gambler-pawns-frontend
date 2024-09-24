"use client";

import { useSearchParams } from "next/navigation";
import { ChessBoardGame } from "../../ui/components/chessBoardGame/chessBoardGame";
import { useGameConnection } from "../_hooks/useGameConnection";
import { useChessWebSocket } from "../_hooks/useChessWebSocket";
import { useChessGame } from "../_hooks/useChessGame";

export default function ActualGamePage({ id }: { id: string | undefined }) {
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

    // Hook to manage conection and reconnection
    const { socket, loading } = useGameConnection({
        gameId: gameId as string | undefined,
        playerId: playerId as string,
        gameMode: gameMode as string,
        bet,
        eloRating,
    });

    //Hook to validate and handle moves
    const chessGame = useChessGame("valid", (from, to) => {
        // handling move
        makeMove(from, to);
    });

    // Hook to manage in-game events
    const { gameState, makeMove } = useChessWebSocket(
        socket,
        playerId as string,
        chessGame.updateGameFromOpponent,
    );
    // es muy importante no renderizar el otro componente si loading es true
    // esto estaba dando un error muy paila me dejó un rato ahí :(
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="space-y-xl py-xl">
            <ChessBoardGame
                // show local position of opponent's one
                position={chessGame.position}
                onDrop={chessGame.onDrop}
            />
        </section>
    );
}
