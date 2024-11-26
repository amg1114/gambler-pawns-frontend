//libs
import { bungee } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";

//Components
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import UserInfo, { userDataInterface } from "./UserInfo";
import ShowMessage from "./ShowMessage";

interface SkeletonGameProps {
  userData: userDataInterface;
  exceptionFromBackendChessService?: any;
}

export default function SkeletonGame({
  userData,
  exceptionFromBackendChessService,
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
      <UserInfo isLoading={false} isCurrentPlayer userData={userData} />

      <StyledButton onClick={handleCancel}>Cancel</StyledButton>
    </section>
  );
}
