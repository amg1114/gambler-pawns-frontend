"use client";

import { useRouter } from "next/navigation";
import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";
import { useCallback, useEffect, useMemo } from "react";
import { useExceptionHandler } from "./_hooks/useGameExceptionHandler";
import SkeletonGame from "./_components/SkeletonGame";
import {
  readFromSessionStorage,
  writeToSessionStorage,
} from "../lib/utils/sessionStorageUtils";

// TODO: we should to save joinGameDataFormRequest, and gameData in a global state
// -> to avoid losing the data when the component unmounts.
//    as a temporary solution we are saving it in sessionStorage

// TODO: type joinGameDataFormRequest and gameData

export default function GamePage() {
  const router = useRouter();
  const { socket } = useWebSocketConnection();

  // Reads the join game data form request from session storage.
  const joinGameDataFormRequest: any = useMemo(
    () => readFromSessionStorage("joinGameDataFormRequest"),
    [],
  );

  const handleGameStarted = useCallback(
    (data: any) => {
      writeToSessionStorage("gameData", data);
      router.replace(`/game/${data.gameId}`);
    },
    [router],
  );

  const emitGameJoin = useCallback(() => {
    if (!socket) return;

    socket.emit("game:join", joinGameDataFormRequest);
  }, [joinGameDataFormRequest, socket]);

  // to handle connection lost when internet connection is back
  useEffect(() => {
    if (!socket) return;

    // TODO: revisar este enfoque, pero en el futuro es necesario agregar un tiempo maxDisconectedTime para no eliminar al socket de los rooms si se reconecta en un tiempo corto
    if (socket.recovered) {
      emitGameJoin();
    }
  }, [socket, emitGameJoin]);

  // handle joining to a game
  useEffect(() => {
    if (!socket) return;

    // join game
    emitGameJoin();

    // when new game is started
    socket.on("game:started", handleGameStarted);

    // cleanup socket listeners when component unmounts
    return () => {
      socket.off("game:started", emitGameJoin);
      // manually disconnect and connect to trigger backend mechanism which avoid pairing with disconnected player
      socket.disconnect();
      socket.connect();
    };
  }, [socket, handleGameStarted, emitGameJoin]);

  // exception handling
  const { exception: backendChessServiceException } = useExceptionHandler();

  return (
    <SkeletonGame
      joinGameDataFormRequest={joinGameDataFormRequest}
      exceptionFromBackendChessService={backendChessServiceException}
    />
  );
}
