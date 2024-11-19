"use client";

import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledButton from "../../ui/components/typography/StyledButton";
import StyledTitle from "../../ui/components/typography/StyledTitle";

interface DrawModalProps {
  isOpen: boolean;
  handleYes: () => void;
  handleNo: () => void;
}

const OfferDrawModal: React.FC<DrawModalProps> = ({
  isOpen,
  handleYes,
  handleNo,
}) => {
  if (!isOpen) return;

  return (
    <GameAlert close={handleNo}>
      <StyledTitle
        variant="h2"
        extraClasses="!text-center pt-md pb-lg mb-xs max-w-60 lg:max-w-60 md:max-w-80 sm:max-w-80 "
      >
        Are you Sure? Offer Draw
      </StyledTitle>
      <div className="grid grid-cols-1 pt-md">
        <StyledButton
          variant="primary"
          extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
          onClick={handleYes}
        >
          Yes
        </StyledButton>
        <StyledButton
          variant="primary"
          style="outlined"
          extraClasses="mx-auto !w-36"
          onClick={handleNo}
        >
          No
        </StyledButton>
      </div>
    </GameAlert>
  );
};

export default OfferDrawModal;
