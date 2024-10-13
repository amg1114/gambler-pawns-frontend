import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import { setGameOptions } from "@/app/lib/hooks/game-options.hook";
export default function BetOption(id: string) {
  const handleBetSelection = (id: string) => {
    setGameOptions({ bet: +id });
  };

  return (
    <div className="px-sm">
      <label htmlFor={"bet" + id} className="cursor-pointer">
        <input
          id={"bet" + id}
          className="peer/bet hidden"
          type="radio"
          name="status"
          defaultChecked={id === "0"}
          onClick={() => handleBetSelection(id)}
        />
        <div className="h-6 rounded-base bg-green-board px-md text-light ring-2 ring-transparent peer-checked/bet:bg-green-hover peer-checked/bet:ring-accent peer-checked:ring-offset-2">
          <div className="flex justify-center">
            <StyledParagraph extraClasses="font-bold">${id}</StyledParagraph>
          </div>
        </div>
      </label>
    </div>
  );
}
