import Image from "next/image";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import useNotificationsWebSockets from "../_hook/useNotificationsWebSockets";

interface GameInviteProps {
  id: number;
  playerName: string;
  gameDescription: string;
  timeAgo: string;
  playerAvatar?: any;
  type: string;
  actionText1: string | null;
  actionLink1: string | null;
  actionText2: string | null;
  actionLink2: string | null;
}

const NotifyCard = ({
  id,
  playerName,
  gameDescription,
  timeAgo,
  playerAvatar,
  type,
  actionText1,
  actionLink1,
  actionText2,
  actionLink2,
}: GameInviteProps) => {
  const { handleClickAction } = useNotificationsWebSockets(
    id,
    actionLink1,
    actionLink2,
  );

  return (
    <div className="rounded-lg p-4 mx-auto mb-xl max-w-sm">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Image
            src={playerAvatar}
            alt={`${playerName}'s avatar`}
            className="w-2xl rounded-full"
            width={52}
            height={52}
          />
        </div>

        <div className="mb-xs flex flex-1 flex-col">
          <div>
            <StyledTitle variant="h3">
              {playerName} {type}
            </StyledTitle>
          </div>
          <div>
            <StyledParagraph extraClasses="mb-xs">
              {gameDescription}
            </StyledParagraph>
            <StyledParagraph>{timeAgo}</StyledParagraph>
          </div>

          <div className="flex gap-2">
            {actionText1 && (
              <StyledButton onClick={handleClickAction}>
                {actionText1}
              </StyledButton>
            )}
            {actionText2 && (
              <StyledButton
                onClick={handleClickAction}
                variant="primary"
                style="outlined"
              >
                {actionText2}
              </StyledButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyCard;
