type GameOptions = {
  mode?: "rapid" | "blitz" | "bullet";
  bet?: number;
  timeMinutes?: number;
  timeInSeconds?: number;
};

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

export const getGameOptions = (): GameOptions => {
  try {
    return JSON.parse(localStorage.getItem("gameOptions") || "{}");
  } catch (error) {
    console.error("Error getting game options:", error);
    return {};
  }
};

export const clearGameOptions = () => {
  try {
    localStorage.removeItem("gameOptions");
  } catch (error) {
    console.error("Error clearing game options:", error);
  }
};