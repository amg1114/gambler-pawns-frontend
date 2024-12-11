import { useCallback } from "react";

export type GameOptions = {
  mode: "rapid" | "blitz" | "bullet";
  bet?: number;
  timeIncrementPerMoveSeconds: number;
  timeInMinutes: number;
};

export const useGameOptions = () => {
  const setGameOptions = useCallback((option: Partial<GameOptions>) => {
    let gameOptions = JSON.parse(
      sessionStorage.getItem("joinGameDataFormRequest") || "{}",
    );

    gameOptions = {
      ...gameOptions,
      ...option,
    };

    sessionStorage.setItem(
      "joinGameDataFormRequest",
      JSON.stringify(gameOptions),
    );
  }, []);

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
