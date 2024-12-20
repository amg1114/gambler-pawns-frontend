"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

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
  }, [isClosing, close]);

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
        <div className="rounded-base bg-primary p-lg text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
}
