"use client";
import Image from "next/image";
import { useState } from "react";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";

// Importing icons
import Clock from "@/app/ui/icons/clock.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";

const arrayGameModes = [
    { mode: "Rapid, 15 min, +10 sec", id: "option1" },
    { mode: "Rapid, 10 min", id: "option2" },
    { mode: "Blitz, 5 min", id: "option3" },
    { mode: "Blitz, 3 min, +2 sec", id: "option4" },
    { mode: "Bullet, 1 min", id: "option5" },
    { mode: "Bullet, 2 min +1 sec", id: "option6" },
];

export default function DropdownButton({
    dropStyles,
}: {
    dropStyles: "filled" | "outlined" | undefined;
}) {
    // Estado para controlar la visibilidad del dropdown
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    // Función para alternar la visibilidad del dropdown
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    let selected = "option2";

    function selectedOption(id: string) {
        selected = id;
        const button = document.getElementById("toggleButton");
        const div = document.getElementById(selected);
        button!.textContent = div!.textContent;
    }

    return (
        <div id="dropdownButton">
            <div className="flex justify-center">
                <StyledButton
                    style={dropStyles}
                    extraClasses="w-full flex justify-between items-center bg-dark-2"
                    onClick={toggleDropdown}
                >
                    <Image
                        src={Clock}
                        alt=""
                        width={20}
                        height={20}
                        className="h-auto w-auto"
                    />
                    <div id="toggleButton">Select Game Mode</div>
                    <Image src={ArrowDown} alt="" width={18} height={18} />
                </StyledButton>
            </div>

            <div
                className={`absolute h-auto w-[334px] select-none rounded-base border-x-2 border-b-2 border-primary bg-dark-2 ${isDropdownVisible ? "" : "hidden"}`}
                id="dropdown"
            >
                {arrayGameModes.map((gameMode) => (
                    <span
                        key={gameMode.id}
                        className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
                        id={gameMode.id}
                        onClick={() => selectedOption(gameMode.id)}
                    >
                        {gameMode.mode}
                    </span>
                ))}
            </div>
        </div>
    );
}
