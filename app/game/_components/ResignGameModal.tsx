"use client";

import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledButton from "../../ui/components/typography/StyledButton";
import StyledTitle from "../../ui/components/typography/StyledTitle";

interface DrawModalProps {
  isOpen: boolean;
  handleYes: () => void;
  handleNo: () => void;
}

const ResignGameModal: React.FC<DrawModalProps> = ({
  isOpen,
  handleYes,
  handleNo,
}) => {
  if (isOpen) {
    return (
      <GameAlert close={handleNo}>
        <div className="fixed inset-0 mx-auto flex items-center">
          <div
            className={`mx-auto h-auto w-auto ${
              !isOpen ? "animate-fade-in-down" : "animate-fade-out-up"
            } items-center justify-center rounded-base bg-dark-1 px-lg py-lg shadow-lg`}
          >
            <StyledTitle
              variant="h2"
              extraClasses="pt-md pb-lg mb-xs max-w-60 lg:max-w-60 md:max-w-80 sm:max-w-80 "
            >
              Are you Sure? Resign
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
          </div>
        </div>
      </GameAlert>
    );
  }
};

export default ResignGameModal;
