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
      console.log("Game started", data);

      writeToSessionStorage("gameData", data);
      writeToSessionStorage("joinGameDataFormRequest", joinGameDataFormRequest);
      router.replace(`/game/${data.gameId}`);
    },
    [joinGameDataFormRequest, router],
  );

  const emitGameJoin = useCallback(() => {
    if (!socket) return;

    console.log("Joining game with data", joinGameDataFormRequest);

    socket.emit("game:join", {
      ...joinGameDataFormRequest,
    });
  }, [joinGameDataFormRequest, socket]);

  useEffect(() => {
    if (!socket) return;

    // join game
    emitGameJoin();

    // when new game is started
    socket.on("game:started", handleGameStarted);

    return () => {
      // cleanup socket listeners when component unmounts
      socket.off("game:started", emitGameJoin);
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
