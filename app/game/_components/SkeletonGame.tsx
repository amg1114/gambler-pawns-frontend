"use client";

//libs
import { bungee } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";

//Components
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import UserInfo, { userDataInterface } from "./UserInfo";
import ShowMessage from "./ShowMessage";
import { CopyLinkButton } from "./CopyLinkButton";

interface SkeletonGameProps {
  userData: userDataInterface;
  exceptionFromBackendChessService?: any;
  linkToJoin?: string | null;
}

export default function SkeletonGame({
  userData,
  exceptionFromBackendChessService,
  linkToJoin,
}: SkeletonGameProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <section className="mx-auto flex max-w-screen-board flex-col items-center justify-center">
      {exceptionFromBackendChessService && (
        <ShowMessage message={exceptionFromBackendChessService.message} />
      )}
      <div className="my-lg flex w-full">
        {linkToJoin ? (
          <CopyLinkButton value={linkToJoin} />
        ) : (
          <UserInfo isLoading timer={userData.timer} />
        )}
      </div>

      <div className="relative w-full">
        <div
          className={`absolute z-10 flex h-8 w-full items-center justify-center border-dark-1 bg-secondary text-base text-dark-1 ${bungee.className}`}
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <span>Waiting for your opponent</span>
        </div>
        <ChessBoardGame />
      </div>
      <div className="mb-lg mt-md">
        <UserInfo isLoading={false} isCurrentPlayer userData={userData} />
      </div>

      <StyledButton onClick={handleCancel}>Cancel</StyledButton>
    </section>
  );
}
