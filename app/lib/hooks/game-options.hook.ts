type GameOptions = {
  mode?: "rapid" | "blitz" | "bullet";
  bet?: number;
  timeMinutes?: number;
  timeInSeconds?: number;
};

export const setGameOptions = (option: GameOptions) => {
  let gameOptions = JSON.parse(localStorage.getItem("gameOptions") || "{}");

  gameOptions = {
    ...gameOptions,
    ...option,
  };

  localStorage.setItem("gameOptions", JSON.stringify(gameOptions));
};

export const getGameOptions = (): GameOptions | null => {
  const gameOptions = localStorage.getItem("gameOptions");

  if (gameOptions) {
    return JSON.parse(gameOptions);
  } else {
    return null;
  }
};

export const clearGameOptions = () => {
  localStorage.removeItem("gameOptions");
};
