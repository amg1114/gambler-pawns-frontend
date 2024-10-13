type GameOptions = {
  mode?: "rapid" | "blitz" | "bullet";
  bet?: number;
  timeMinutes?: number;
  timeInSeconds?: number;
};

type GameOptionsKey = keyof GameOptions;
export const setGameOptions = (option: GameOptions) => {
  try {
    let gameOptions = JSON.parse(localStorage.getItem("gameOptions") || "{}");

    gameOptions = {
      ...gameOptions,
      ...option,
    };

    localStorage.setItem("gameOptions", JSON.stringify(gameOptions));
  } catch (error) {
    console.error("Error setting game options:", error);
  }
};
