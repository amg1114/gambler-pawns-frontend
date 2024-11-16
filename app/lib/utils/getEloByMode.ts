// TODO: currently not used, but could be useful in the future

import { Session } from "next-auth";
type Mode = "rapid" | "blitz" | "bullet" | "arcade";

/**
 * Retrieves the Elo rating for a given game mode from the session data.
 * if not session data is available, it returns 1200 as default value.
 */
export default function getEloByMode(mode: Mode, session: Session) {
  const eloByModeObjectLookup = {
    rapid: session?.data?.eloRapid,
    blitz: session?.data?.eloBlitz,
    bullet: session?.data?.eloBullet,
    arcade: session?.data?.eloArcade,
  };

  return eloByModeObjectLookup[mode] ?? 1200;
}
