import Image from "next/image";
import React from "react";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

interface GameInviteProps {
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
  const handleAction1 = () => {
    console.log(actionLink1);
  };

  const handleAction2 = () => {
    console.log(actionLink2);
  };

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
            <StyledParagraph>Hace {timeAgo}</StyledParagraph>
          </div>

          <div className="flex gap-2">
            {actionText1 && (
              <StyledButton onClick={handleAction1}>{actionText1}</StyledButton>
            )}
            {actionText2 && (
              <StyledButton
                onClick={handleAction2}
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
