import {
  setGameOptions,
  GameOptions,
} from "@/app/game-options/_hooks/game-options.hook";
import { useDropDownContext } from "@/app/ui/components/DropDown/DropDownButton";

const arrayGameModes: {
  text: string;
  id: string;
  config: GameOptions;
}[] = [
  {
    text: "Rapid, 15 min, +10 sec",
    id: "option1",
    config: {
      mode: "rapid",
      timeInMinutes: 15,
      timeIncrementPerMoveSeconds: 10,
    },
  },
  {
    text: "Rapid, 10 min",
    id: "option2",
    config: {
      mode: "rapid",
      timeInMinutes: 10,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    text: "Blitz, 5 min",
    id: "option3",
    config: {
      mode: "blitz",
      timeInMinutes: 5,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    text: "Blitz, 3 min, +2 sec",
    id: "option4",
    config: {
      mode: "blitz",
      timeInMinutes: 3,
      timeIncrementPerMoveSeconds: 2,
    },
  },
  {
    text: "Bullet, 1 min",
    id: "option5",
    config: {
      mode: "bullet",
      timeInMinutes: 1,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    text: "Bullet, 2 min +1 sec",
    id: "option6",
    config: {
      mode: "bullet",
      timeInMinutes: 2,
      timeIncrementPerMoveSeconds: 1,
    },
  },
];

export function GameModesDrop() {
  const { dropDown } = useDropDownContext();

  function selectedOption(label: string, mode: GameOptions) {
    const button = document.getElementById("toggleButton");

    setGameOptions(mode);
    button!.textContent = label;
  }

  return (
    <>
      {arrayGameModes.map((gameMode) => (
        <span
          key={gameMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={gameMode.id}
          onClick={() => selectedOption(gameMode.text, gameMode.config)}
        >
          {gameMode.text}
        </span>
      ))}
    </>
  );
}
