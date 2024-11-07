export type GameOptions = {
  mode: "rapid" | "blitz" | "bullet";
  bet?: number;
  timeIncrementPerMoveSeconds: number;
  timeInMinutes: number;
};

export const setGameOptions = (option: Partial<GameOptions>) => {
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
};

export const getGameOptions = (): GameOptions | null => {
  const gameOptions = sessionStorage.getItem("joinGameDataFormRequest");

  if (gameOptions) {
    return JSON.parse(gameOptions);
  } else {
    return null;
  }
};

export const clearGameOptions = () => {
  sessionStorage.removeItem("joinGameDataFormRequest");
};
