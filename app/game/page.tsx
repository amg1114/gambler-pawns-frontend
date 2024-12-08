"use client";

import { useEffect, useMemo, useState } from "react";
import { useExceptionHandler } from "./_hooks/useGameExceptionHandler";
import SkeletonGame from "./_components/SkeletonGame";
import { readFromSessionStorage } from "../lib/utils/sessionStorageUtils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useWebSocketConnection } from "../lib/contexts/WebSocketContext";
import { generatePlayerIdForGuest } from "../lib/utils/players.utils";

export default function GamePage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState("");

  // get the current url
  useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentUrl(window.location.href);
  }, []);

  // Reads the join game data form request from session storage.
  const joinGameDataFormRequest: any = useMemo(
    () => readFromSessionStorage("joinGameDataFormRequest"),
    [],
  );

  // join game id from the url
  const idToJoinGame = searchParams.get("join");
  const isFriendGameRequest = searchParams.get("friend-req") === "true";

  const { socket } = useWebSocketConnection();

  // when component mounts, check if if user has game link to join to the correspoding game (pairing via link shared)
  useEffect(() => {
    if (isFriendGameRequest || !idToJoinGame || !socket) return;

    socket.emit("game:joinWithLink", {
      userId: joinGameDataFormRequest?.playerId || generatePlayerIdForGuest(),
      gameLink: idToJoinGame,
    });
  }, [
    socket,
    idToJoinGame,
    isFriendGameRequest,
    joinGameDataFormRequest?.playerId,
  ]);

  const currentUserData = useMemo(
    () => ({
      timer: joinGameDataFormRequest?.timeInMinutes || "5:00",
      nickname: session?.data?.nickname || joinGameDataFormRequest?.playerId,
      eloRating: joinGameDataFormRequest?.eloRating || 1200,
      countryCode: session?.data?.countryCode || "co",
      userAvatar: session?.data?.userAvatarImg?.fileName || "1.png",
    }),
    [joinGameDataFormRequest, session],
  );

  // exception handling
  const { exception: backendChessServiceException } = useExceptionHandler();

  return (
    <SkeletonGame
      userData={currentUserData}
      exceptionFromBackendChessService={backendChessServiceException}
      linkToJoin={currentUrl}
    />
  );
}
