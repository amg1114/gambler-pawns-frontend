"use client";
import { azeret_mono } from "@/app/ui/fonts";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import Dropdown from "@/app/game-options/components/drop-down";

// =========  Zod Schema =======
// TODO: refactor this in a separate file
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const gameOptionsSchema = z.object({
  // TODO: validate if is in enum, and refactor selection options as a
  gameMode: z.string().nonempty("Game mode is required"),
  // TODO: validate if is in enum
  bet: z.string().nonempty("Bet amount is required"),
  opponent: z.string().nonempty("Opponent selection is required"),
});
// =========  Zod Schema =======

// =========  custom hook to use React Hook Form with this schema =======
// TODO: refactor this in a separate file
type GameOptionsFormData = z.infer<typeof gameOptionsSchema>;

function useGameOptionsForm() {
  const form = useForm<GameOptionsFormData>({
    resolver: zodResolver(gameOptionsSchema),
    defaultValues: {
      gameMode: "",
      bet: "",
      opponent: "",
    },
  });

  return form;
}
// =========  custom hook to use React Hook Form with this schema =======

export default function GameHistoryPage() {
  return (
    <section className="w-[334px] content-center space-y-lg">
      <StyledTitle variant="h1" extraClasses="text-center">
        Game History
      </StyledTitle>
      <div>
        <p className={`${azeret_mono.className} pb-md font-bold`}>Game Type</p>
        <Dropdown
          dropDown={{
            dropStyles: "outlined",
            text: "All",
            idText: "gameType",
          }}
        >
          <Dropdown.SimplifyGameModesDrop></Dropdown.SimplifyGameModesDrop>
        </Dropdown>
      </div>
      <div>
        <p className={`${azeret_mono.className} pb-md font-bold`}>
          I played as
        </p>
        <Dropdown
          dropDown={{
            dropStyles: "outlined",
            text: "All",
            idText: "colorIPlayed",
          }}
        >
          <Dropdown.ColorIPlayed></Dropdown.ColorIPlayed>
        </Dropdown>
      </div>

      <div>
        <p className={`${azeret_mono.className} pb-md font-bold`}>
          Result Type
        </p>
        <Dropdown
          dropDown={{
            dropStyles: "outlined",
            text: "All",
            idText: "resultType",
          }}
        >
          <Dropdown.ResultType></Dropdown.ResultType>
        </Dropdown>
      </div>
    </section>
  );
}
