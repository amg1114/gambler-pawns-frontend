import React from "react";
import ResignGameModal from "./ResignGameModal";
import OfferDrawModal from "./OfferDrawModal";
import OpponentDrawOfferModal from "./OpponentDrawOfferModal";
import StreakModal from "./StreakModal";
import EndGameModal, { endGameDataInterface } from "./EndGameModal";
import { useSession } from "next-auth/react";

interface GameModalsProps {
  gameId: string | undefined;
  gameMode: string | undefined;
  isOpponentDrawOfferModalOpen: boolean;
  isGameEndModalOpen: boolean;
  isResignModalOpen: boolean;
  onResignGameConfirmed: () => void;
  onResignGameCancelled: () => void;
  onOfferDrawConfirmed: () => void;
  isDrawOfferModalOpen: boolean;
  onOfferDrawCancelled: () => void;
  onAcceptDraw: () => void;
  onRejectDraw: () => void;
  endGameData: endGameDataInterface | null;
  isEndGameStreakModalOpen: boolean;
  onCloseEndGameStreakModal: () => void;
}

const GameModals: React.FC<GameModalsProps> = ({
  gameId,
  gameMode,
  isResignModalOpen,
  onResignGameConfirmed,
  onResignGameCancelled,
  isDrawOfferModalOpen,
  onOfferDrawConfirmed,
  onOfferDrawCancelled,
  isOpponentDrawOfferModalOpen,
  onAcceptDraw,
  onRejectDraw,
  endGameData,
  isGameEndModalOpen,
  isEndGameStreakModalOpen,
  onCloseEndGameStreakModal,
}) => {
  const { data: session } = useSession();

  return (
    <>
      <ResignGameModal
        isOpen={isResignModalOpen}
        handleNo={onResignGameCancelled}
        handleYes={onResignGameConfirmed}
      />
      <OfferDrawModal
        isOpen={isDrawOfferModalOpen}
        handleNo={onOfferDrawCancelled}
        handleYes={onOfferDrawConfirmed}
      />
      <OpponentDrawOfferModal
        isOpen={isOpponentDrawOfferModalOpen}
        acceptDraw={onAcceptDraw}
        rejectDraw={onRejectDraw}
      />
      <StreakModal
        isOpen={isEndGameStreakModalOpen}
        streakNumber={session?.data?.streakDays || 0}
        onClose={onCloseEndGameStreakModal}
      />
      <EndGameModal
        isOpen={isGameEndModalOpen}
        gameData={endGameData}
        gameMode={gameMode}
        gameId={gameId}
      />
    </>
  );
};

export default GameModals;
