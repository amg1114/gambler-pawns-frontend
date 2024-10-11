"use client";
import Image from "next/image";

// Components
import StyledButton from "../../ui/components/typography/StyledButton";
import StyledTitle from "../../ui/components/typography/StyledTitle";
// Icons
import Fire from "../../ui/icons/fire.svg";
import Coin from "../../ui/icons/coin.svg";
import GameAlert from "@/app/ui/components/modals/GameAlert";

const StreakModal = ({
  isOpen,
  streakNumber,
  moneyGameGiftForWinner,
  onClose,
}: {
  isOpen: boolean;
  streakNumber: number;
  moneyGameGiftForWinner: number;
  onClose: () => void;
}) => {
  if (isOpen) {
    return (
      <GameAlert close={onClose}>
        <div
          className={`fixed inset-0 mx-auto flex items-center ${!isOpen && "hidden"} `}
        >
          <div
            className={`mx-auto h-auto w-auto ${
              !isOpen ? "animate-fade-in-down" : "animate-fade-out-up"
            } items-center justify-center rounded-base bg-dark-1 p-sm shadow-lg`}
          >
            <StyledTitle variant="h2" extraClasses="pt-md text-center">
              Streak +1
            </StyledTitle>
            <Image
              src={Fire}
              alt="fire"
              className="mx-auto mb-md flex h-3xl w-3xl"
            />
            <StyledTitle
              variant="h3"
              extraClasses="pt-md max-w-60 lg:max-w-80 md:max-w-80 sm:max-w-80"
            >
              you’ve won {streakNumber} times in a row
            </StyledTitle>
            <div className="grid grid-cols-2">
              <StyledTitle variant="h3" extraClasses="text-right my-xs">
                + {" " + moneyGameGiftForWinner}
              </StyledTitle>
              <Image src={Coin} alt="coin" className="my-xs ml-sm size-6" />
            </div>
            <StyledButton
              variant="primary"
              extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
              onClick={onClose}
            >
              Accept
            </StyledButton>
          </div>
        </div>
      </GameAlert>
    );
  }
};

export default StreakModal;
