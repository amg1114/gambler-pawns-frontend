"use client";
import Image from "next/image";

// Components
import StyledButton from "../../ui/components/typography/StyledButton";
import StyledTitle from "../../ui/components/typography/StyledTitle";
// Icons
import Fire from "../../ui/icons/fire.svg";
import GameAlert from "@/app/ui/components/modals/GameAlert";

const StreakModal = ({
  isOpen,
  streakNumber,
  onClose,
}: {
  isOpen: boolean;
  streakNumber: number;
  onClose: () => void;
}) => {
  if (isOpen) {
    return (
      <GameAlert close={onClose}>
        <StyledTitle variant="h2" extraClasses="pt-md !text-center">
          Streak +1
        </StyledTitle>
        <Image
          src={Fire}
          alt="fire"
          className="mx-auto mb-md flex h-3xl w-3xl"
        />
        <StyledTitle
          variant="h3"
          extraClasses="!mx-auto !text-center pt-md max-w-60 lg:max-w-80 md:max-w-80 sm:max-w-80"
        >
          you’ve won {streakNumber} times in a row
        </StyledTitle>
        <div className="!mx-auto !text-center">
          <StyledButton
            variant="primary"
            extraClasses=" mt-md !text-dark-1 mb-md"
            onClick={onClose}
          >
            Accept
          </StyledButton>
        </div>
      </GameAlert>
    );
  }
};

export default StreakModal;
