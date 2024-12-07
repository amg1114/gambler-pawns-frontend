import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useExceptionHandler } from "../../_hooks/useGameExceptionHandler";
import SkeletonGame from "../../_components/SkeletonGame";
import { readFromSessionStorage } from "@/app/lib/utils/sessionStorageUtils";

export default function JoinToGameByLinkPage({
  params,
}: {
  params: { linkToJoin: string };
}) {
  const { data: session } = useSession();

  // Reads the join game data form request from session storage.
  const joinGameDataFormRequest: any = useMemo(
    () => readFromSessionStorage("joinGameDataFormRequest"),
    [],
  );

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
      linkToJoin={params.linkToJoin}
    />
  );
}
