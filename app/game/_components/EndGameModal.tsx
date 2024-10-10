"use client";

// Components
import StyledButton from "../../ui/components/typography/StyledButton";
import StyledTitle from "../../ui/components/typography/StyledTitle";
// Icons
import Image from "next/image";
import Coin from "../../icons/coin.svg";

const EndGameModal = ({ isOpen }: { isOpen: boolean }) => {
  if (isOpen) {
    return (
      <div className="fixed inset-0 mx-auto flex items-center">
        <div
          className={`mx-auto transition-transform duration-500 ${
            !isOpen
              ? "translate-y-[-100px] opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <StyledTitle variant="h1" extraClasses="pt-md mb-xs ">
            White Won
          </StyledTitle>
          <StyledTitle extraClasses="mt-xs">By resign</StyledTitle>
          <div className="grid grid-cols-2">
            <StyledTitle variant="h3" extraClasses="text-right my-xs">
              +20
            </StyledTitle>
            <Image src={Coin} alt="coin" className="my-xs ml-sm size-6" />
          </div>
          <StyledTitle variant="h3" extraClasses="text-center my-xs  ">
            +20 ELO
          </StyledTitle>
          <div className="grid grid-cols-1 pt-md">
            <StyledButton
              variant="primary"
              extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
            >
              New Game
            </StyledButton>
            <StyledButton
              variant="primary"
              style="outlined"
              extraClasses="mx-auto !w-36"
            >
              Watch Again
            </StyledButton>
          </div>
        </div>
      </div>
    );
  }
};

export default EndGameModal;
