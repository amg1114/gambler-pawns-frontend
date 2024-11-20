import Image from "next/image";
import React from "react";
import aguacate from "../../ui/icons/aguacate.png";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

interface GameInviteProps {
  playerName: string;
  gameDescription: string;
  timeAgo: string;
  playerAvatar?: any;
}

const NotifyCard = ({
  playerName,
  gameDescription,
  timeAgo,
  playerAvatar = aguacate,
}: GameInviteProps) => {
  const handleAccept = () => {
    console.log("Invitation accepted");
  };

  const handleDecline = () => {
    console.log("Invitation declined");
  };
  return (
    <div className="rounded-lg p-4 mx-auto mb-xs max-w-sm">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Image
            src={playerAvatar}
            alt={`${playerName}'s avatar`}
            className="w-2xl rounded-full"
          />
        </div>

        <div className="mb-xs flex flex-1 flex-col">
          <div>
            <StyledTitle variant="h3">
              {playerName} Quiere Jugar Contigo
            </StyledTitle>
          </div>
          <div className="flex items-center gap-2">
            <StyledParagraph>
              {gameDescription} Hace {timeAgo}
            </StyledParagraph>
          </div>

          <div className="flex gap-2">
            <StyledButton onClick={handleAccept}>Play</StyledButton>
            <StyledButton
              onClick={handleDecline}
              variant="primary"
              style="outlined"
            >
              No Thanks
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyCard;

// Ejemplo de uso del componente
