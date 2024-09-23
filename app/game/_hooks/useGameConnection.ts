import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface GameJoinResponse {
    gameId: string;
    opponentId: string;
    color: "white" | "black";
}

interface UseGameConnectionProps {
    gameId?: string | undefined;
    playerId: string;
    gameMode: string;
    bet: number;
    eloRating: number;
}

/**
 * Unifies connection logic for both initial connection and reconnection.
 * @param props - The game connection parameters.
 * @returns An object containing the socket and loading state.
 */
export function useGameConnection({
    gameId,
    playerId,
    gameMode,
    bet,
    eloRating,
}: UseGameConnectionProps) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Conectar al servidor WebSocket
        const newSocket = io(process.env.NEXT_PUBLIC_WS_URL);
        setSocket(newSocket);

        if (gameId !== undefined) {
            // Reconectar a una partida existente
            newSocket.emit("game:reconnect", {
                gameId,
                playerId,
            });
            console.log("Reconnecting to game", gameId);

            // Escuchar la respuesta del servidor
            newSocket.on("game:reconnected", (data: any) => {
                setLoading(false);
                console.log("Reconnected to game", data);
            });
        } else {
            // Conexión inicial
            newSocket.emit("game:join", {
                playerId,
                mode: gameMode,
                bet,
                eloRating,
            });

            // Escuchar la respuesta del servidor
            newSocket.on("game:started", (data: GameJoinResponse) => {
                // Cambiar la URL sin redirigir
                // TODO: get playerId from token next-auth, also game info should be stored in the local storage
                router.replace(`/game/${data.gameId}?playerId=${playerId}`);

                setLoading(false);
                console.log("Game started", data);
            });
        }

        return () => {
            // Desconectar el socket cuando el componente se desmonte
            newSocket.disconnect();
        };
    }, [gameId, playerId, gameMode, bet, eloRating, router]);

    return { socket, loading };
}
