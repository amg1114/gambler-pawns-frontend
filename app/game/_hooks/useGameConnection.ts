"use client";

import { useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface UseGameConnectionProps {
  gameId: string | undefined;
}

// TODO: we should to save joinGameDataFormRequest, and gameData in a global state
// -> to avoid losing the data when the component unmounts.
//    as a temporary solution we are saving it in sessionStorage

/**
 * Reads the game data from session storage.
 * @returns The parsed game data, or null if no data is found.
 */
const readGameData = () => {
  if (typeof window === "undefined") return null;
  const storedGameData = sessionStorage.getItem("gameData");
  if (!storedGameData) return null;
  return JSON.parse(storedGameData);
};

/**
 * Reads the join game data form request from session storage.
 * @returns {any | null} - The parsed join game data form request, or null if no data is found.
 */
const readJoinGameDataFormRequest = (session: Session | null): any | null => {
  if (typeof window === "undefined") return null;
  const storedJoinGameDataFormRequest = sessionStorage.getItem(
    "joinGameDataFormRequest",
  );
  if (!storedJoinGameDataFormRequest) return null;
  const parsedJoinDataFormRequest = JSON.parse(storedJoinGameDataFormRequest);
  return {
    ...parsedJoinDataFormRequest,
    playerId: session?.data?.userId.toString() || `guest_${Date.now()}`,
  };
};

/**
 * Unifies connection logic for both initial connection and reconnection.
 * @param props - The game connection parameters.
 * @returns An object containing the socket and loading state.
 */
export function useGameConnection({ gameId }: UseGameConnectionProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  /**
   * This state holds the join game data form request,  which is initially read from session storage.
   */
  const joinGameDataFormRequest = useMemo(
    () => readJoinGameDataFormRequest(session),
    [session],
  );

  /**
   * This state holds the game data, which is initially read from session storage.
   */
  const [gameData, setGameData] = useState<any>(readGameData);

  useEffect(() => {
    if (!joinGameDataFormRequest || !joinGameDataFormRequest.playerId) return;

    // connect to ws server
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL);
    setSocket(newSocket);

    // when connection is established, join the game or reconnect
    newSocket.on("connect", () => {
      if (gameId) {
        console.log("Trying reconnection", gameId);
        // Reconnecting to existing game
        newSocket.emit("game:reconnect", {
          gameId,
          playerId: joinGameDataFormRequest.playerId,
        });
      } else {
        console.log("Joining game with data", joinGameDataFormRequest);
        newSocket.emit("game:join", joinGameDataFormRequest);
      }
    });

    // when reconnected to game
    newSocket.on("game:reconnected", (data: any) => {
      setLoading(false);
      console.log("Reconnected to game", data);
    });

    // when new game is started
    newSocket.on("game:started", (data: any) => {
      console.log("Game started", data);
      sessionStorage.setItem("gameData", JSON.stringify(data));
      setGameData(data);
      setLoading(false);
      router.replace(`/game/${data.gameId}`);
    });

    return () => {
      // Disconnect socket when component unmounts
      newSocket.off("connect");
      newSocket.off("game:reconnected");
      newSocket.off("game:started");
      newSocket.disconnect();
    };
  }, [gameId, joinGameDataFormRequest, router]);

  return { socket, loading, joinGameDataFormRequest, gameData };
}
