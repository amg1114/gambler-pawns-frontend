"use client";

// Libs
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
// Components
import StyledButton from "../typography/StyledButton";
import StyledTitle from "../typography/StyledTitle";
// Icons
import Image from "next/image";
import Coin from "../../icons/coin.svg";

const EndGameModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Mostrar el modal automáticamente cuando la página se carga
    setIsOpen(true);
  }, []);

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
              } items-center justify-center rounded-base bg-dark-1 px-2xl py-lg shadow-lg`}
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
        </div>
      )}
    </>
  );
};

export default EndGameModal;
