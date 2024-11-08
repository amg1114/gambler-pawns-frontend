import { useEffect, useLayoutEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getEloByMode from "@/app/lib/utils/getEloByMode";

interface UseGameConnectionProps {
  gameId: string | undefined;
}

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

  // TODO: we have to save joinGameDataFormRequest, and gameData in a global state
  // -> to avoid losing the data when the component unmounts
  //    as a temporary solution we are saving it in sessionStorage
  //    then we should not remove them (both states) from sessionStorage until the game ends
  const [joinGameDataFormRequest, setJoinGameDataFormRequest] =
    useState<any>(null);
  const [gameData, setGameData] = useState<any>(null);

  // Load data from sessionStorage when component mounts
  // -> see comment below about this temporary solution
  useLayoutEffect(() => {
    const storedJoinGameDataFormRequest = sessionStorage.getItem(
      "joinGameDataFormRequest",
    );
    const storedGameData = sessionStorage.getItem("gameData");

    if (storedJoinGameDataFormRequest) {
      setJoinGameDataFormRequest(JSON.parse(storedJoinGameDataFormRequest));
    }

    if (storedGameData) {
      setGameData(JSON.parse(storedGameData));
    }
  }, []);

  useLayoutEffect(() => {
    if (!session?.data) return;
    const storedGameData = sessionStorage.getItem("joinGameDataFormRequest");
    if (!storedGameData) return;
    const parsedStoredGameData = JSON.parse(storedGameData);

    setJoinGameDataFormRequest({
      ...parsedStoredGameData,
      playerId: session?.data?.userId.toString() || `guest_${Date.now()}`,
      eloRating: getEloByMode(parsedStoredGameData.mode, session),
    });
  }, [session]);

  useEffect(() => {
    if (!joinGameDataFormRequest || !joinGameDataFormRequest.playerId) return;

    // connect to ws server
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL);
    setSocket(newSocket);

    // Manejadores de eventos para la conexión
    newSocket.on("connect", () => {
      console.log("Socket conectado");

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

    // listen to server responses
    newSocket.on("game:reconnected", (data: any) => {
      setLoading(false);
      console.log("Reconnected to game", data);
    });

    newSocket.on("game:started", (data: any) => {
      // redirect to game page
      console.log("Game started", data);
      sessionStorage.setItem("gameData", JSON.stringify(data));
      setGameData(data);
      setLoading(false);
      router.replace(`/game/${data.gameId}`);
    });

    return () => {
      // Desconnect socket when component unmounts
      newSocket.disconnect();
    };
  }, [gameId, joinGameDataFormRequest, router]);

  return { socket, loading, joinGameDataFormRequest, gameData };
}
