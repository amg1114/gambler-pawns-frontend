"use client";

//Components
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import UserInfo from "./UserInfo";

//libs
import { useSession } from "next-auth/react";
import { bungee } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";

interface SkeletonGameProps {
  joinGameDataFormRequest: any;
  exceptionFromBackendChessService?: any;
}

export default function SkeletonGame({
  joinGameDataFormRequest,
  exceptionFromBackendChessService,
}: SkeletonGameProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <section className="mx-auto flex max-w-screen-board flex-col items-center justify-center">
      {exceptionFromBackendChessService ? (
        <p>{exceptionFromBackendChessService.message}</p>
      ) : null}
      <UserInfo isLoading />
      <div className="relative w-full">
        <div
          className={`absolute z-10 flex h-8 w-full items-center justify-center border-dark-1 bg-secondary text-base text-dark-1 ${bungee.className}`}
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <span>Waiting for your opponent</span>
        </div>
        <ChessBoardGame />
      </div>
      <UserInfo
        isLoading={false}
        isCurrentPlayer
        userData={{
          timer: joinGameDataFormRequest?.time || "5:00",
          nickname:
            session?.data?.nickname || joinGameDataFormRequest?.playerId,
          eloRating: joinGameDataFormRequest?.eloRating || 1200,
          countryCode: session?.data?.countryCode || "co",
          userAvatar: session?.data?.userAvatarImg?.fileName || "1.png",
        }}
      />

      <StyledButton onClick={handleCancel}>Cancel</StyledButton>
    </section>
  );
}
