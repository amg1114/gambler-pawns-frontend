"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import StyledButton from "../typography/StyledButton";
import Image from "next/image";

// Importing icons
import Clock from "@/app/ui/icons/clock.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";

type DropDownContext = {
  dropDown: Dropdown;
};

const DropDownContext = createContext<DropDownContext | undefined>(undefined);

export function useDropDownContext() {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error(
      "useDropDownContext must be used within a DropDownProvider",
    );
  }
  return context;
}

type Dropdown = {
  dropStyles: "filled" | "outlined" | undefined;
  text: string;
};

type DropDownProps = PropsWithChildren & {
  dropDown: Dropdown;
};

export default function DropdownButton({ children, dropDown }: DropDownProps) {
  // Estado para controlar la visibilidad del dropdown
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  // Función para alternar la visibilidad del dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Función para cambiar el texto del boton por la opción seleccionada

  function selectedOption(mode: string) {
    const button = document.getElementById("toggleButton");
    button!.textContent = mode;
  }

  return (
    <DropDownContext.Provider value={{ dropDown }}>
      <div id="dropdownButton">
        <div className="flex justify-center">
          <StyledButton
            style={dropDown.dropStyles}
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
            <text id="toggleButton">{dropDown.text}</text>

            <Image
              src={ArrowDown}
              alt=""
              width={18}
              height={18}
              className="fill-primary"
            />
          </StyledButton>
        </div>

        <div
          className={`absolute h-auto w-[334px] select-none rounded-base border-x-2 border-b-2 border-primary bg-dark-2 ${isDropdownVisible ? "" : "hidden"}`}
          id="dropdown"
        >
          {children}
        </div>
      </div>
    </DropDownContext.Provider>
  );
}
