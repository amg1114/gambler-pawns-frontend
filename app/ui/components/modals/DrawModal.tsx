"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import StyledButton from "../typography/StyledButton";
import StyledTitle from "../typography/StyledTitle";

const DrawModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAcceptDraw = () => {
    router.push("/draw-accepted"); // Redirige a la página que desees
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <StyledButton
        variant="primary"
        extraClasses="!text-dark-1"
        onClick={openModal}
      >
        Draw
      </StyledButton>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 mx-auto flex items-center">
          <div className="mx-auto">
            <header className="flex justify-end"></header>
            <div
              className={`mx-auto h-auto w-auto ${
                isModalOpen ? "animate-fade-in-down" : "animate-fade-out-up"
              } items-center justify-center rounded-base bg-dark-1 px-lg py-lg shadow-lg`}
            >
              <StyledTitle
                variant="h1"
                extraClasses="pt-md pb-lg mb-xs max-w-60 lg:max-w-60 md:max-w-80 sm:max-w-80 "
              >
                Opponent asking for draw
              </StyledTitle>
              <div className="grid grid-cols-1 pt-md">
                <StyledButton
                  variant="primary"
                  extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
                  onClick={closeModal}
                >
                  No
                </StyledButton>
                <StyledButton
                  variant="primary"
                  style="outlined"
                  extraClasses="mx-auto !w-36"
                  onClick={handleAcceptDraw}
                >
                  Yes
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawModal;
