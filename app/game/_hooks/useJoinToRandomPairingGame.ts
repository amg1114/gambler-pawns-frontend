import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";
import { useCallback, useEffect } from "react";

/**
 * Custom hook to manage joining a random pairing game.
 *
 * This hook handles the WebSocket connection for joining a random pairing game
 * and rejoining the game if the connection is lost and then recovered.
 *
 * @param {boolean} shouldBeUsed - Flag indicating whether the hook should be used.
 * @param {any} joinGameDataFormRequest - The data form request for joining the game.
 */
export default function useJoinToRandomPairingGame(
  shouldBeUsed: boolean,
  joinGameDataFormRequest: any,
) {
  const { socket } = useWebSocketConnection();

  /**
   * Emits the game join event.
   *
   * This function emits the "game:join" event to the WebSocket with the join game data form request.
   */
  const emitGameJoin = useCallback(() => {
    if (!socket) return;

    socket.emit("game:join", joinGameDataFormRequest);
  }, [joinGameDataFormRequest, socket]);

  /**
   * Effect to handle connection lost and rejoining the game when the connection is recovered.
   *
   * This effect checks if the socket connection is recovered and emits the game join event.
   */
  // TODO: revisar este enfoque, pero en el futuro es necesario agregar un tiempo maxDisconectedTime para no eliminar al socket de los rooms si se reconecta en un tiempo corto
  // TODO: revisar la reconexión del socket al recargar la pagina (no esta funcionando, si recarga la pagina se va a quedar esperando para siempre)
  // useEffect(() => {
  //   if (!shouldBeUsed || !socket) return;

  // if (socket.recovered) {
  //   emitGameJoin();
  // }
  // }, [socket, emitGameJoin, shouldBeUsed]);

  /**
   * Effect to handle joining the game.
   *
   * This effect emits the game join event and handles disconnecting and reconnecting the socket
   * to trigger the backend mechanism which avoids pairing with disconnected players.
   */
  useEffect(() => {
    if (!shouldBeUsed || !socket) return;

    emitGameJoin();
  }, [socket, emitGameJoin, shouldBeUsed]);
}
