import { Session } from "next-auth";

/** Gen random Id for guest players */
export function generatePlayerIdForGuest() {
  return `guest_${Date.now() + Math.floor(Math.random() * 1000)}`;
}

export function getEloRatingByMode(
  mode: "rapid" | "blitz" | "bullet" | "arcade",
  sessionData: Session | null,
): number {
  if (!sessionData) return 1200;

  const eloByMode = {
    rapid: sessionData.data.eloRapid,
    blitz: sessionData.data.eloBlitz,
    bullet: sessionData.data.eloBullet,
    arcade: sessionData.data.eloArcade,
  };

  return eloByMode[mode];
}
