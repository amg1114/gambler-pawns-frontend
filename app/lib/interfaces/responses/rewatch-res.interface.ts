import { User } from "../models/user.interface";

export interface RewatchGameRes {
  status: boolean;
  statusCode: number;
  path: string;
  data: RewatchGame;
  timestamp: Date;
}

export interface RewatchGame {
  gameId: number;
  gameTimestamp: Date;
  pgn: string;
  winner: null;
  whitesPlayerTime: null;
  blacksPlayerTime: null;
  eloWhitesBeforeGame: number;
  eloWhitesAfterGame: null;
  eloBlacksBeforeGame: number;
  eloBlacksAfterGame: null;
  timeAfterGameEndWhites: number;
  timeAfterGameEndBlacks: number;
  gameMode: string;
  resultType: null;
  typePairing: string;
  whitesPlayer: User;
  blacksPlayer: User;
}
