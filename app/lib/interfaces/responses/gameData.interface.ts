export interface GameData {
  color: "white" | "black";
  gameId: string;
  timeInMinutes: number;
  timeIncrementPerMoveSeconds: number;
  playerWhite: PlayerData;
  playerBlack: PlayerData;
  mode: "bullet" | "blitz" | "rapid" | "arcade";
}

interface PlayerData {
  isGuest: boolean;
  elo: number;
  userInfo: {
    userId: string;
    nickname: string;
    aboutText: string;
    countryCode: string;
    userAvatarImg: string;
  };
}
