import { useDropDownContext } from "@/app/ui/components/DropDown/DropDownButton";

const arraySimplifyGameModes = [
  { mode: "All", id: "option1" },
  { mode: "Rapid", id: "option2" },
  { mode: "Blitz", id: "option3" },
  { mode: "Bullet", id: "option4" },
  { mode: "Arcade", id: "option5" },
];

export function SimplifyGameModesDrop() {
  const { dropDown } = useDropDownContext();

  function selectedOption(
    label: string,
    mode: {
      type: "rapid" | "blitz" | "bullet" | "arcade";
    },
  ) {
    const button = document.getElementById("gameType");
    // TODO: solucionar esto estaba dando problemas
    // setGameType(mode);
    button!.textContent = label;
  }

  return (
    <div>
      {arraySimplifyGameModes.map((gameMode) => (
        <span
          key={gameMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={gameMode.id}
          onClick={
            () => {}
            //selectedOption(gameMode.mode, { type: gameMode.mode.toLowerCase() })
          }
        >
          {gameMode.mode}
        </span>
      ))}
    </div>
  );
}
