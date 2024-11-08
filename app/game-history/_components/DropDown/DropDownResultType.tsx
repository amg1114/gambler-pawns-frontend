import { useDropDownContext } from "@/app/ui/components/DropDown/DropDownButton";

const arrayResultType = [
  { mode: "All", id: "option1" },
  { mode: "I won", id: "option2" },
  { mode: "Draw", id: "option3" },
  { mode: "I lost", id: "option4" },
];

export function ResultType() {
  const { dropDown } = useDropDownContext();

  function selectedOption(label: string, mode: string) {
    const button = document.getElementById("resultType");
    button!.textContent = label;
  }

  return (
    <>
      {arrayResultType.map((gameMode) => (
        <span
          key={gameMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={gameMode.id}
          onClick={() => selectedOption(gameMode.mode, gameMode.mode)}
        >
          {gameMode.mode}
        </span>
      ))}
    </>
  );
}
