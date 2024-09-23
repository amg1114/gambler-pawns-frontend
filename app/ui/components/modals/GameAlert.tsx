"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface GameAlertProps {
  children: React.ReactNode;
  close: () => void;
  size?: "medium" | "large";
}

const sizeClasses = {
  medium: "w-4/5 max-w-60",
  large: "w-4/5 max-w-80",
};

export default function GameAlert({ children, size, close }: GameAlertProps) {
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
        className={clsx(`${sizeClasses[size || "medium"]}`, {
          "animate-fade-out-up": isClosing,
          "animate-fade-in-down": !isClosing,
        })}
      >
        <header className="flex justify-end">
          <button className="text-xl" onClick={(e) => closeHandler(e)}>
            &times;
          </button>
        </header>
        <div className={`w-full rounded-base bg-dark-1 p-lg`}>{children}</div>
      </div>
    </div>
  );
}
