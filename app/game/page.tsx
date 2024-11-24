"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const { socket } = useWebSocketConnection();

  const isFriendRequest = useMemo(
    () => searchParams.get("friend-req") === "true",
    [searchParams],
  );

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

  // to handle connection lost when internet connection is back (random pairing)
  useEffect(() => {
    if (!socket) return;
    if (isFriendRequest) return;
    // TODO: revisar este enfoque, pero en el futuro es necesario agregar un tiempo maxDisconectedTime para no eliminar al socket de los rooms si se reconecta en un tiempo corto
    if (socket.recovered) {
      emitGameJoin();
    }
  }, [socket, emitGameJoin, isFriendRequest]);

  // handle joining to a game (random pairing)
  useEffect(() => {
    if (!socket) return;
    if (isFriendRequest) return;

    // join game
    emitGameJoin();

    // manually disconnect and connect to trigger backend mechanism which avoid pairing with disconnected player
    return () => {
      socket.disconnect();
      socket.connect();
    };
  }, [socket, emitGameJoin, isFriendRequest]);

  // handle game started event for both (random pairing and friend request)
  useEffect(() => {
    if (!socket) return;
    socket.on("game:started", handleGameStarted);
    // cleanup socket listeners when component unmounts
    return () => {
      socket.off("game:started", handleGameStarted);
    };
  }, [socket, handleGameStarted, isFriendRequest]);

  // exception handling
  const { exception: backendChessServiceException } = useExceptionHandler();

  return (
    <SkeletonGame
      joinGameDataFormRequest={joinGameDataFormRequest}
      exceptionFromBackendChessService={backendChessServiceException}
    />
  );
}
