"use client";

import clsx from "clsx";
import { MouseEventHandler, useEffect, useState } from "react";

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
            }, 500); // Tiempo que dura la animación fade-out

            return () => clearTimeout(timeout);
        }
    }, [isClosing]);

    return (
        <div className="bg-gray/70 fixed inset-0 flex flex-wrap-reverse items-center justify-center">
            <div
                className={clsx(`${sizeClasses[size || "medium"]}`, {
                    "animate-fade-out-up": isClosing,
                    "animate-fade-in-down": !isClosing,
                })}
            >
                <header className="flex justify-end">
                    <button
                        className="text-xl"
                        onClick={(e) => closeHandler(e)}
                    >
                        &times;
                    </button>
                </header>
                <div className={`w-full rounded bg-dark-1 p-8`}>{children}</div>
            </div>
        </div>
    );
}