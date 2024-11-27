import { useLayoutEffect, useState } from "react";
import { formatTimeMs } from "../../../lib/utils/formatTimeMs";
import { GameData } from "@/app/lib/interfaces/responses/gameData.interface";

interface PlayerInfo {
  timer: string;
  nickname: string;
  eloRating: number;
  countryCode: string;
  userAvatar: string;
}

interface UseChessPlayersInfoReturnType {
  currentPlayerInfo: PlayerInfo;
  opponentPlayerInfo: PlayerInfo;
}

/**
 * Custom hook to manage chess players' information.
 *
 * @param {GameData} gameData - The game data containing information about the players.
 * @param {number} playerOneTime - The current time for player one.
 * @param {number} playerTwoTime - The current time for player two.
 * @returns {UseChessPlayersInfoReturnType} - An object containing the current player's info, opponent's info, and the side (color) the player is playing as.
 */
export function useChessPlayersInfo(
  gameData: GameData | null,
  playerOneTime: number,
  playerTwoTime: number,
): UseChessPlayersInfoReturnType {
  // player's info
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState<any>({});
  const [opponentPlayerInfo, setOpponentPlayerInfo] = useState<any>({});

  // load player's info when game data is loaded
  useLayoutEffect(() => {
    if (!gameData) return;

    const { color, playerBlack, playerWhite } = gameData;

    const getPlayerData = (player: any, timer: number) => ({
      timer: formatTimeMs(timer),
      nickname: player.userInfo.nickname,
      eloRating: player.elo,
      countryCode: player.userInfo.countryCode,
      userAvatar: player.userInfo.userAvatarImg.fileName,
    });

    const blackData = getPlayerData(playerBlack, playerTwoTime);
    const whiteData = getPlayerData(playerWhite, playerOneTime);

    if (color === "white") {
      setCurrentPlayerInfo(whiteData);
      setOpponentPlayerInfo(blackData);
    } else {
      setCurrentPlayerInfo(blackData);
      setOpponentPlayerInfo(whiteData);
    }
  }, [playerOneTime, playerTwoTime, gameData]);

  return { currentPlayerInfo, opponentPlayerInfo };
}
