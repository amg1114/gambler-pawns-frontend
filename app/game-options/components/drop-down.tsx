"use client";
import Image from "next/image";
import { useState } from "react";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";

// Importing icons
import Clock from "@/app/ui/icons/clock.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";

export default function DropdownButton() {
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
                    style="outlined"
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
                className={`h-65 absolute w-[334px] select-none rounded-base border-x-2 border-b-2 border-primary bg-dark-2 ${isDropdownVisible ? "" : "hidden"}`}
                id="dropdown"
            >
                <div
                    className="cursor-pointer py-sm pl-md hover:bg-dark-1"
                    id="option1"
                    onClick={() => selectedOption("option1")}
                >
                    Rapid, 15 min, +10 sec
                </div>
                <div
                    className="cursor-pointer py-sm pl-md hover:bg-dark-1"
                    id="option2"
                    onClick={() => selectedOption("option2")}
                >
                    Rapid, 10 min
                </div>
                <div
                    className="cursor-pointer py-sm pl-md hover:bg-dark-1"
                    id="option3"
                    onClick={() => selectedOption("option3")}
                >
                    Blitz, 5 min
                </div>
                <div
                    className="cursor-pointer py-sm pl-md hover:bg-dark-1"
                    id="option4"
                    onClick={() => selectedOption("option4")}
                >
                    Blitz, 3 min, +2 sec
                </div>
                <div
                    className="cursor-pointer py-sm pl-md hover:bg-dark-1"
                    id="option5"
                    onClick={() => selectedOption("option5")}
                >
                    Bullet, 1 min
                </div>
                <div
                    className="cursor-pointer py-sm pl-md hover:bg-dark-1"
                    id="option6"
                    onClick={() => selectedOption("option6")}
                >
                    Bullet, 2 min +1 sec
                </div>
            </div>
        </div>
    );
}
