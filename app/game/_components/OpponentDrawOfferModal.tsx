"use client";

import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledButton from "../../ui/components/typography/StyledButton";
import StyledTitle from "../../ui/components/typography/StyledTitle";

interface DrawModalProps {
  isOpen: boolean;
  acceptDraw: () => void;
  rejectDraw: () => void;
}

const OpponentDrawOfferModal: React.FC<DrawModalProps> = ({
  isOpen,
  acceptDraw,
  rejectDraw,
}) => {
  if (!isOpen) return;

  return (
    <GameAlert close={rejectDraw}>
      <StyledTitle
        variant="h2"
        extraClasses="!text-center pt-md pb-lg mb-xs max-w-60 lg:max-w-60 md:max-w-80 sm:max-w-80 "
      >
        Opponent asking for draw
      </StyledTitle>
      <div className="grid grid-cols-1 pt-md">
        <StyledButton
          variant="primary"
          extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
          onClick={acceptDraw}
        >
          Accept
        </StyledButton>
        <StyledButton
          variant="primary"
          style="outlined"
          extraClasses="mx-auto !w-36"
          onClick={rejectDraw}
        >
          Reject
        </StyledButton>
      </div>
    </GameAlert>
  );
};

export default OpponentDrawOfferModal;
