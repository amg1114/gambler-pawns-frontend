import { userDataInterface } from "@/app/game/_components/UserInfo";
import { formatTimeMs } from "@/app/lib/utils/formatTimeMs";
import { RewatchGame } from "@/app/lib/interfaces/responses/rewatch-res.interface";
import { useCallback } from "react";
import { useSession } from "next-auth/react";

export function useGameRewatch() {
  const { data: session } = useSession();

  /**
   * Formats the player data.
   *
   * @param {any} player - The player data.
   * @param {number} eloBeforeGame - The player's elo before the game.
   * @param {number} timeAfterGameEnd - The player's time after the game ended.
   * @returns {userDataInterface} The formatted player data.
   */
  const formatPlayerData = (
    player: any,
    eloBeforeGame: number,
    timeAfterGameEnd: number,
  ): userDataInterface => ({
    userAvatar: player?.userAvatarImg?.fileName || "1.png",
    nickname: player?.nickname || "Guest",
    eloRating: eloBeforeGame || 0,
    countryCode: player?.countryCode || "Unknown",
    timer: formatTimeMs(timeAfterGameEnd ?? 0),
  });

  /**
   * Formats the player data for a game rewatch.
   *
   * @param {RewatchGame} game - The game rewatch data.
   * @returns {{ currentPlayer: userDataInterface, opponentPlayer: userDataInterface, currentPlayerSide: "white" | "black" }} An object containing the formatted data for the current player and the opponent player.
   */
  const formatPlayersData = useCallback(
    ({
      whitesPlayer,
      blacksPlayer,
      eloWhitesBeforeGame,
      eloBlacksBeforeGame,
      timeAfterGameEndBlacks,
      timeAfterGameEndWhites,
    }: RewatchGame) => {
      const isCurrentPlayerWhite =
        session?.user?.id === whitesPlayer?.userId.toString();

      const currentPlayer = isCurrentPlayerWhite
        ? formatPlayerData(
            whitesPlayer,
            eloWhitesBeforeGame,
            timeAfterGameEndWhites,
          )
        : formatPlayerData(
            blacksPlayer,
            eloBlacksBeforeGame,
            timeAfterGameEndBlacks,
          );

      const opponentPlayer = isCurrentPlayerWhite
        ? formatPlayerData(
            blacksPlayer,
            eloBlacksBeforeGame,
            timeAfterGameEndBlacks,
          )
        : formatPlayerData(
            whitesPlayer,
            eloWhitesBeforeGame,
            timeAfterGameEndWhites,
          );

      const currentPlayerSide = isCurrentPlayerWhite ? "white" : "black";

      return { currentPlayer, opponentPlayer, currentPlayerSide };
    },
    [session],
  );

  return { formatPlayersData };
}
