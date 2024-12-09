"use client";

import { useState, useEffect, useRef } from "react";
import StyledButton from "../typography/StyledButton";
import Image from "next/image";

// Importing icons
import Clock from "@/app/ui/icons/clock.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";
import {
  GameOptions,
  useGameOptions,
} from "@/app/game-options/_hooks/useGameOptions";

interface DropDownOption {
  id: string;
  option: string;
  config?: any;
}

type Dropdown = {
  dropStyles: "filled" | "outlined" | undefined;
  title: string;
};
interface DropDownProps {
  options: DropDownOption[];
  dropDown: Dropdown;
  selectedId: string;
  setSelectedId: (id: string) => void;
}

export default function DropdownButton({
  options,
  dropDown,
  selectedId,
  setSelectedId,
}: DropDownProps) {
  // Estado para controlar la visibilidad del dropdown
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState(dropDown.title);

  const { setGameOptions } = useGameOptions();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Función para alternar la visibilidad del dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Función para cambiar el texto del boton por la opción seleccionada
  function selectedOption(id: string, label: string, mode: GameOptions) {
    setGameOptions(mode);
    setSelectedLabel(label);
    setSelectedId(id);
    setIsDropdownVisible(false);
  }

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="dropdown-container"
      className="relative"
      ref={dropdownRef} // Referencia al contenedor del dropdown
    >
      <div className="flex justify-center" id="dropdownButton">
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
          <span id="toggleButton">{selectedLabel}</span>

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
        className={`absolute z-10 h-auto w-full select-none rounded-base border-x-2 border-b-2 border-primary bg-dark-2 ${
          isDropdownVisible ? "" : "hidden"
        }`}
        id="dropdown"
      >
        {options && options.length > 0 ? (
          options.map((gameMode) => (
            <span
              key={gameMode.id}
              className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
              id={selectedId}
              onClick={() =>
                selectedOption(gameMode.id, gameMode.option, gameMode.config)
              }
            >
              {gameMode.option}
            </span>
          ))
        ) : (
          <span className="block py-sm pl-md">No options available</span>
        )}
      </div>
    </div>
  );
}
