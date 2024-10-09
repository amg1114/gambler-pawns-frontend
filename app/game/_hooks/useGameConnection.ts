import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

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
  timeMinutes: number;
  timeIncSeconds: number;
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
  timeMinutes,
  timeIncSeconds,
}: UseGameConnectionProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Conectar al servidor WebSocket
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL);
    setSocket(newSocket);

    if (gameId !== undefined) {
      // Reconnecting to existing game
      // TODO: pedir al back todos los datos necesarios
      newSocket.emit("game:reconnect", {
        gameId,
        playerId,
      });
      console.log("Reconnecting to game", gameId);

      // listen to server response
      newSocket.on("game:reconnected", (data: any) => {
        setLoading(false);
        console.log("Reconnected to game", data);
      });
    } else {
      // Initial connection to start a new game
      newSocket.emit("game:join", {
        playerId,
        mode: gameMode,
        bet,
        eloRating,
        initialTime: timeMinutes,
        incrementTime: timeIncSeconds,
      });

      // listen to server response
      newSocket.on("game:started", (data: GameJoinResponse) => {
        // Cambiar la URL sin redirigir
        // TODO: get playerId from token next-auth, also game info should be stored in the local storage
        console.log(data);
        localStorage.setItem("gameData", JSON.stringify(data));
        router.replace(`/game/${data.gameId}?playerId=${playerId}`);
        setLoading(false);
        console.log("Game started", data);
      });
    }

    return () => {
      // Desconnect socket when component unmounts
      newSocket.disconnect();
    };
  }, [
    gameId,
    playerId,
    gameMode,
    bet,
    eloRating,
    router,
    timeIncSeconds,
    timeMinutes,
  ]);

  return { socket, loading };
}
