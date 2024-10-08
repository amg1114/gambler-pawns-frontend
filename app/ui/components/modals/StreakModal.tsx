"use client";

// Libs
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
// Components
import StyledButton from "../typography/StyledButton";
import StyledTitle from "../typography/StyledTitle";
// Icons
import Fire from "../../icons/fire.svg";
import Image from "next/image";
import Coin from "../../icons/coin.svg";

const StreakModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Mostrar el modal automáticamente cuando la página se carga
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsClosing(true);
    // Espera 500ms para completar la animación antes de cerrar completamente el modal
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  return (
    <>
      {session?.data && isOpen && (
        <div className="fixed inset-0 mx-auto flex items-center">
          <div
            className={`mx-auto transition-transform duration-500 ${
              isClosing
                ? "translate-y-[-100px] opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <header className="flex justify-end"></header>
            <div
              className={`mx-auto h-auto w-auto ${
                !isClosing ? "animate-fade-in-down" : "animate-fade-out-up"
              } items-center justify-center rounded-base bg-dark-1 p-sm shadow-lg`}
            >
              <StyledTitle variant="h1" extraClasses="pt-md ">
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
                you’ve been playing for {session?.data.streakDays} days
              </StyledTitle>
              <div className="grid grid-cols-2">
                <StyledTitle variant="h3" extraClasses="text-right my-xs">
                  +2
                </StyledTitle>
                <Image src={Coin} alt="coin" className="my-xs ml-sm size-6" />
              </div>
              <StyledButton
                variant="primary"
                extraClasses="mx-auto mt-md !w-36 !text-dark-1 mb-md"
                onClick={closeModal}
              >
                Accept
              </StyledButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StreakModal;
