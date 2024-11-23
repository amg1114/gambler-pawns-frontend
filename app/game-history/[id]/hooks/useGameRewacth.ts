import { userDataInterface } from "@/app/game/_components/UserInfo";
import { formatTimeMs } from "@/app/game/_utils/formatTimeMs";
import { User } from "@/app/lib/interfaces/models/user.interface";
import { RewatchGame } from "@/app/lib/interfaces/responses/rewatch-res.interface";
import { use, useEffect, useState } from "react";

export function useGameRewatch() {
/**
 * Formats the player data for a game rewatch.
 *
 * @param {RewatchGame} game - The game rewatch data.
 * @param {Player} game.whitesPlayer - The player data for the white pieces.
 * @param {Player} game.blacksPlayer - The player data for the black pieces.
 * @param {number} game.eloWhitesBeforeGame - The ELO rating of the white player before the game.
 * @param {number} game.eloBlacksBeforeGame - The ELO rating of the black player before the game.
 * @param {number} [game.timeAfterGameEndBlacks] - The remaining time for the black player after the game ended.
 * @param {number} [game.timeAfterGameEndWhites] - The remaining time for the white player after the game ended.
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
      userAvatar: whitesPlayer.userAvatarImg.fileName,
      nickname: whitesPlayer.nickname,
      eloRating: eloWhitesBeforeGame,
      countryCode: whitesPlayer.countryCode,
      timer: formatTimeMs(timeAfterGameEndWhites ?? 0),
    };

    const opponentPlayer: userDataInterface = {
      userAvatar: blacksPlayer.userAvatarImg.fileName,
      nickname: blacksPlayer.nickname,
      eloRating: eloBlacksBeforeGame,
      countryCode: blacksPlayer.countryCode,
      timer: formatTimeMs(timeAfterGameEndBlacks ?? 0),
    };

    return { currentPlayer, opponentPlayer };
  };

  return { formatPlayersData }

}
