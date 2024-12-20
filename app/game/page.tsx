"use client";

import { useEffect, useMemo, useState } from "react";
import { useExceptionHandler } from "./_hooks/useGameExceptionHandler";
import SkeletonGame from "./_components/SkeletonGame";
import { readFromSessionStorage } from "../lib/utils/sessionStorageUtils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useWebSocketConnection } from "../lib/contexts/WebSocketContext";
import { GameOptions } from "../game-options/_hooks/useGameOptions";
import { getEloRatingByMode } from "../lib/utils/players.utils";

export default function GamePage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  // Reads the join game data form request from session storage.
  const joinGameDataFormRequest: GameOptions | null = useMemo(
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
      gameLink: idToJoinGame,
    });
  }, [socket, idToJoinGame, isFriendGameRequest]);

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  // get the current url
  useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentUrl(idToJoinGame ? window.location.href : null);
  }, [idToJoinGame]);

  const currentUserData = useMemo(
    () => ({
      timer: joinGameDataFormRequest?.timeInMinutes || "5:00",
      nickname: session?.data?.nickname || "Guest",
      eloRating: joinGameDataFormRequest
        ? getEloRatingByMode(joinGameDataFormRequest?.mode, session)
        : 1200,
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
