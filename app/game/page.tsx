"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useExceptionHandler } from "./_hooks/useGameExceptionHandler";
import SkeletonGame from "./_components/SkeletonGame";
import { readFromSessionStorage } from "../lib/utils/sessionStorageUtils";
import { useSession } from "next-auth/react";
import useJoinToRandomPairingGame from "./_hooks/useJoinToRandomPairingGame";
import useOnlineChessGameConnection from "../lib/hooks/useOnlineChessGameConnection";

// TODO: we should to save joinGameDataFormRequest, and gameData in a global state
// -> to avoid losing the data when the component unmounts.
//    as a temporary solution we are saving it in sessionStorage

// TODO: type joinGameDataFormRequest and gameData

export default function GamePage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const isFriendRequest = useMemo(
    () => searchParams.get("friend-req") === "true",
    [searchParams],
  );

  // Reads the join game data form request from session storage.
  const joinGameDataFormRequest: any = useMemo(
    () => readFromSessionStorage("joinGameDataFormRequest"),
    [],
  );

  // call this hook conditionally, only when the user is joining a random pairing game
  useJoinToRandomPairingGame(!isFriendRequest, joinGameDataFormRequest);
  // handle game started event
  useOnlineChessGameConnection();

  const currentUserData = useMemo(
    () => ({
      timer: "5:00", // TODO: get the timer from the joinGameDataFormRequest
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
    />
  );
}
