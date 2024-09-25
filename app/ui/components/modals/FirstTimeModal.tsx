import clsx from "clsx";
import { useEffect, useState } from "react";
import StyledTitle from "../typography/StyledTitle";
import StyledLink from "../typography/StyledLink";
import StyledButton from "../typography/StyledButton";

interface StoreModalProps {
  children: React.ReactNode;
  close: () => void;
}

export default function StoreModal({ children, close }: StoreModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const closeHandler = (
    event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event instanceof KeyboardEvent && event.key !== "Escape") return;
    setIsClosing(true);
  };

  useEffect(() => {
    document.addEventListener("keydown", closeHandler);

    return () => {
      document.removeEventListener("keydown", closeHandler);
    };
  }, []);

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        close();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isClosing]);

  return (
    <div className="fixed inset-0 flex flex-wrap-reverse items-center justify-center bg-gray/70">
      <div
        className={clsx("w-4/5", {
          "animate-fade-out-up": isClosing,
          "animate-fade-in-down": !isClosing,
        })}
      >
        <header className="flex justify-end">
          <button className="text-xl" onClick={close}>
            &times;
          </button>
        </header>
        <div className="rounded-base bg-dark-2 p-lg text-secondary">
          <StyledTitle variant="h2" extraClasses="text-center text-warning"> Welcome!! </StyledTitle>
          <StyledLink href="/register" extraClasses="text-center text-warning">DONT HAVE ACCOUNT?</StyledLink>
          <StyledButton
            variant="primary"
            extraClasses="w-full mt-4"
            onClick={closeHandler}
          > Login </StyledButton>
          <StyledButton variant="secondary" extraClasses="w-full mt-4 text-warning"> Play As Guest </StyledButton>
        </div>
      </div>
    </div>
  );
}
