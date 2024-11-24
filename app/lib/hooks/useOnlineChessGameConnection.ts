import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { writeToSessionStorage } from "../utils/sessionStorageUtils";
import { useWebSocketConnection } from "../contexts/WebSocketContext";
import { GameData } from "../interfaces/responses/gameData.interface";

/**
 * Custom hook to manage the online chess game connection.
 *
 * This hook handles the WebSocket connection for starting a game and
 * redirects the user to the game page when a game starts.
 */
export default function useOnlineChessGameConnection() {
  const router = useRouter();
  const { socket } = useWebSocketConnection();

  /**
   * Handles the game started event.
   *
   * This function is called when the "game:started" event is received from the WebSocket.
   * It writes the game data to session storage and redirects the user to the game page.
   *
   * @param {GameData} data - The game data received from the WebSocket.
   */
  const handleGameStarted = useCallback(
    (data: GameData) => {
      writeToSessionStorage("gameData", data);
      router.replace(`/game/${data.gameId}`);
    },
    [router],
  );

  /**
   * This effect sets up a listener for the "game:started" event on the WebSocket
   * and cleans up the listener when the component unmounts.
   */
  useEffect(() => {
    if (!socket) return;
    socket.on("game:started", handleGameStarted);
    // cleanup socket listeners when component unmounts
    return () => {
      socket.off("game:started", handleGameStarted);
    };
  }, [socket, handleGameStarted]);
}
