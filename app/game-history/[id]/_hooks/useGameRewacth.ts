import { userDataInterface } from "@/app/game/_components/UserInfo";
import { formatTimeMs } from "@/app/lib/utils/formatTimeMs";
import { RewatchGame } from "@/app/lib/interfaces/responses/rewatch-res.interface";

export function useGameRewatch() {
  /**
   * Formats the player data for a game rewatch.
   *
   * @param {RewatchGame} game - The game rewatch data.
   * @returns {{ currentPlayer: userDataInterface, opponentPlayer: userDataInterface }} An object containing the formatted data for the current player and the opponent player.
   */
  const formatPlayersData = ({
    whitesPlayer,
    blacksPlayer,
    eloWhitesBeforeGame,
    eloBlacksBeforeGame,
    timeAfterGameEndBlacks,
    timeAfterGameEndWhites,
  }: RewatchGame) => {
    const currentPlayer: userDataInterface = {
      userAvatar: whitesPlayer?.userAvatarImg?.fileName || "1.png",
      nickname: whitesPlayer?.nickname || "Guest",
      eloRating: eloWhitesBeforeGame || 0,
      countryCode: whitesPlayer?.countryCode || "Unknown",
      timer: formatTimeMs(timeAfterGameEndWhites ?? 0),
    };

    const opponentPlayer: userDataInterface = {
      userAvatar: blacksPlayer?.userAvatarImg?.fileName || "1.png",
      nickname: blacksPlayer?.nickname || "Guest",
      eloRating: eloBlacksBeforeGame || 0,
      countryCode: blacksPlayer?.countryCode || "Unknown",
      timer: formatTimeMs(timeAfterGameEndBlacks ?? 0),
    };

    return { currentPlayer, opponentPlayer };
  };

  return { formatPlayersData };
}
