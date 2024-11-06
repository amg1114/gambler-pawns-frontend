type GameType = {
  type?: "rapid" | "blitz" | "bullet" | "Arcade";
};

export const setGameType = (option: GameType) => {
  let gameType = JSON.parse(localStorage.getItem("gameType") || "{}");

  gameType = {
    ...gameType,
    ...option,
  };

  localStorage.setItem("gameOptions", JSON.stringify(gameType));
};

export const getGameType = (): GameType | null => {
  const gameType = localStorage.getItem("gameOptions");

  if (gameType) {
    return JSON.parse(gameType);
  } else {
    return null;
  }
};

export const clearGameType = () => {
  localStorage.removeItem("gameType");
};
