"use client";
import Image from "next/image";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { setGameOptions } from "@/app/lib/hooks/game-options.hook";
import { setGameType } from "@/app/lib/hooks/game-type.hook";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";

// Importing icons
import Clock from "@/app/ui/icons/clock.svg";
import ArrowDown from "@/app/ui/icons/down-arrow.svg";

type GameMode = {
  mode: "rapid" | "blitz" | "bullet";
  timeMinutes: number;
  timeInSeconds: number;
};

const arrayGameModes: {
  mode: string;
  id: string;
  config: GameMode;
}[] = [
  {
    mode: "Rapid, 15 min, +10 sec",
    id: "option1",
    config: {
      mode: "rapid",
      timeMinutes: 15,
      timeInSeconds: 10,
    },
  },
  {
    mode: "Rapid, 10 min",
    id: "option2",
    config: {
      mode: "rapid",
      timeMinutes: 15,
      timeInSeconds: 10,
    },
  },
  {
    mode: "Blitz, 5 min",
    id: "option3",
    config: {
      mode: "blitz",
      timeMinutes: 15,
      timeInSeconds: 10,
    },
  },
  {
    mode: "Blitz, 3 min, +2 sec",
    id: "option4",
    config: {
      mode: "blitz",
      timeMinutes: 15,
      timeInSeconds: 10,
    },
  },
  {
    mode: "Bullet, 1 min",
    id: "option5",
    config: {
      mode: "blitz",
      timeMinutes: 15,
      timeInSeconds: 10,
    },
  },
  {
    mode: "Bullet, 2 min +1 sec",
    id: "option6",
    config: {
      mode: "rapid",
      timeMinutes: 15,
      timeInSeconds: 10,
    },
  },
];

const arraySimplifyGameModes = [
  { mode: "All", id: "option1" },
  { mode: "Rapid", id: "option2" },
  { mode: "Blitz", id: "option3" },
  { mode: "Bullet", id: "option4" },
  { mode: "Arcade", id: "option5" },
];

const arrayColorIPlayed = [
  { mode: "All", id: "option1" },
  { mode: "Whites", id: "option2" },
  { mode: "Blacks", id: "option3" },
];

const arrayResultType = [
  { mode: "All", id: "option1" },
  { mode: "I won", id: "option2" },
  { mode: "Draw", id: "option3" },
  { mode: "I lost", id: "option4" },
];

type DropDownContext = {
  dropDown: Dropdown;
};

const DropDownContext = createContext<DropDownContext | undefined>(undefined);

function useDropDownContext() {
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
  idText: string;
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
    const button = document.getElementById(dropDown.idText);
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
            <span id={dropDown.idText}>{dropDown.text}</span>

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

DropdownButton.GameModesDrop = function GameModesDrop() {
  const { dropDown } = useDropDownContext();

  function selectedOption(
    label: string,
    mode: {
      mode: "rapid" | "blitz" | "bullet";
      timeMinutes: number;
      timeInSeconds: number;
    },
  ) {
    const button = document.getElementById("gameMode");
    for (const key in mode) {
      setGameOptions(mode);
    }
    button!.textContent = label;
  }

  return (
    <>
      {arrayGameModes.map((gameMode) => (
        <span
          key={gameMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={gameMode.id}
          onClick={() => selectedOption(gameMode.mode, gameMode.config)}
        >
          {gameMode.mode}
        </span>
      ))}
    </>
  );
};

DropdownButton.SimplifyGameModesDrop = function SimplifyGameModesDrop() {
  const { dropDown } = useDropDownContext();

  function selectedOption(
    label: string,
    mode: {
      type: "rapid" | "blitz" | "bullet" | "Arcade";
    },
  ) {
    const button = document.getElementById("gameType");
    for (const key in mode) {
      setGameType(mode);
    }
    button!.textContent = label;
  }

  return (
    <div>
      {arraySimplifyGameModes.map((gameMode) => (
        <span
          key={gameMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={gameMode.id}
          //onClick={() => selectedOption(gameMode.mode, gameMode.config)}
        >
          {gameMode.mode}
        </span>
      ))}
    </div>
  );
};

DropdownButton.ColorIPlayed = function ColorIPlayed() {
  const { dropDown } = useDropDownContext();

  function selectedOption(
    label: string,
    mode: {
      mode: "rapid" | "blitz" | "bullet";
      timeMinutes: number;
      timeInSeconds: number;
    },
  ) {
    const button = document.getElementById("colorIPlayed");
    for (const key in mode) {
      setGameOptions(mode);
    }
    button!.textContent = label;
  }

  return (
    <>
      {arrayColorIPlayed.map((gameMode) => (
        <span
          key={gameMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={gameMode.id}
          //onClick={() => selectedOption(gameMode.mode, gameMode.config)}
        >
          {gameMode.mode}
        </span>
      ))}
    </>
  );
};

DropdownButton.ResultType = function ResultType() {
  const { dropDown } = useDropDownContext();

  function selectedOption(
    label: string,
    mode: {
      mode: "rapid" | "blitz" | "bullet";
      timeMinutes: number;
      timeInSeconds: number;
    },
  ) {
    const button = document.getElementById("resultType");
    for (const key in mode) {
      setGameOptions(mode);
    }
    button!.textContent = label;
  }

  return (
    <>
      {arrayResultType.map((gameMode) => (
        <span
          key={gameMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={gameMode.id}
          //onClick={() => selectedOption(gameMode.mode, gameMode.config)}
        >
          {gameMode.mode}
        </span>
      ))}
    </>
  );
};
