import { generatePlayerIdForGuest } from "@/app/lib/utils/players.utils";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export type GameOptions = {
  mode: "rapid" | "blitz" | "bullet";
  bet?: number;
  timeIncrementPerMoveSeconds: number;
  timeInMinutes: number;
  playerId: string;
};

export const useGameOptions = () => {
  const { data: session } = useSession();

  const setGameOptions = useCallback(
    (option: Partial<GameOptions>) => {
      let gameOptions = JSON.parse(
        sessionStorage.getItem("joinGameDataFormRequest") || "{}",
      );

      gameOptions = {
        ...gameOptions,
        ...option,
        playerId:
          session?.data?.userId?.toString() || generatePlayerIdForGuest(),
      };

      sessionStorage.setItem(
        "joinGameDataFormRequest",
        JSON.stringify(gameOptions),
      );
    },
    [session],
  );

  const getGameOptions = useCallback((): GameOptions | null => {
    const gameOptions = sessionStorage.getItem("joinGameDataFormRequest");

    if (gameOptions) {
      return JSON.parse(gameOptions);
    } else {
      return null;
    }
  }, []);

  const clearGameOptions = useCallback(() => {
    sessionStorage.removeItem("joinGameDataFormRequest");
  }, []);

  return {
    setGameOptions,
    getGameOptions,
    clearGameOptions,
  };
};
