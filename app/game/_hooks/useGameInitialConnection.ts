import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

interface GameJoinResponse {
    gameId: string;
    opponentId: string;
    color: "white" | "black";
}

/**
 * Custom hook responsible of managing initial when creating a new chess game.
 *   1. Connects to the server.
 *   2. Sends a message to join the game.
 *   3. Redirects to the game URL.
 * @param playerId - The ID of the player.
 * @param gameMode - The game mode.
 * @param bet - The bet amount.
 * @returns An object containing the socket and loading state.
 */
export function useGameInitialConnection(
    playerId: string,
    gameMode: string,
    bet: number,
    eloRating: number,
) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // connect to websocket server
        const newSocket = io(process.env.NEXT_PUBLIC_WS_URL);
        setSocket(newSocket);

        // Join game just after component mounts
        // if (playerId && gameMode && bet && eloRating) {
        newSocket.emit("game:join", {
            playerId,
            mode: gameMode,
            bet,
            eloRating,
        });

        // listen server response of game:join message / event
        newSocket.on("game:started", (data: GameJoinResponse) => {
            console.log("Game started", data);
            // Redirect to the URL of the new game
            router.replace(`/game/${data.gameId}`);
            setLoading(false);
        });
        // }

        return () => {
            // close the socket connection when the component unmounts
            newSocket.disconnect();
        };
    }, [playerId, gameMode, bet, eloRating, router]);

    return { socket, loading };
}
