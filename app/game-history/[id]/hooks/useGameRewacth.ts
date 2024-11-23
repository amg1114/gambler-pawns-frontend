import { userDataInterface } from "@/app/game/_components/UserInfo";
import { RewatchGame } from "@/app/lib/interfaces/responses/rewatch-res.interface";
import { use, useEffect, useState } from "react";

export function useGameRewatch(
  gameRewatch: RewatchGame | null,
) {
  const [currentPlayer, setCurrentPlayer] = useState<userDataInterface | null>(
    null,
  );
  const [opponentPlayer, setOpponentPlayer] =
    useState<userDataInterface | null>(null);

  useEffect(() => {
    if (gameRewatch) {
      const { whitesPlayer, blacksPlayer, blacksPlayerTime, whitesPlayerTime } =
        gameRewatch;

      setCurrentPlayer({
        userAvatar: whitesPlayer.userAvatarImg.fileName,
        nickname: whitesPlayer.nickname,
        eloRating: gameRewatch.eloWhitesBeforeGame,
        countryCode: whitesPlayer.countryCode,
        timer: whitesPlayerTime ?? 0,
      });

      setOpponentPlayer({
        userAvatar: blacksPlayer.userAvatarImg.fileName,
        nickname: blacksPlayer.nickname,
        eloRating: gameRewatch.eloBlacksBeforeGame,
        countryCode: blacksPlayer.countryCode,
        timer: blacksPlayerTime ?? 0,
      });
    }
  }, [gameRewatch]);

  return { currentPlayer, opponentPlayer };
}
