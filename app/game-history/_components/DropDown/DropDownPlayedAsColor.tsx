import { useDropDownContext } from "@/app/ui/components/DropDown/DropDownButton";

const arrayPlayedAsColor = [
  { mode: "All", id: "option1" },
  { mode: "White", id: "option2" },
  { mode: "Black", id: "option3" },
];

export function PlayedAsColor() {
  const { dropDown } = useDropDownContext();

  function selectedOption(label: string, mode: string) {
    const button = document.getElementById("playedAsColor");
    button!.textContent = label;
  }

  return (
    <>
      {arrayPlayedAsColor.map((colorMode) => (
        <span
          key={colorMode.id}
          className="block cursor-pointer py-sm pl-md hover:bg-dark-1"
          id={colorMode.id}
          onClick={() => selectedOption(colorMode.mode, colorMode.mode)}
        >
          {colorMode.mode}
        </span>
      ))}
    </>
  );
}
