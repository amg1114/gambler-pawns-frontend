import { GameOptions } from "@/app/game-options/_hooks/useGameOptions";

export const arraySimplifyGameModes = [
  { id: "All", option: "All" },
  { id: "rapid", option: "Rapid" },
  { id: "blitz", option: "Blitz" },
  { id: "bullet", option: "Bullet" },
  { id: "arcade", option: "Arcade" },
];

export const arrayPlayedAsColor = [
  { id: "All", option: "All" },
  { id: "w", option: "White" },
  { id: "b", option: "Black" },
];

export const arrayResultType = [
  { id: "All", option: "All" },
  { id: "win", option: "I won" },
  { id: "draw", option: "Draw" },
  { id: "loss", option: "I lost" },
];

export const arrayGameModes: {
  id: string;
  option: string;
  config: GameOptions;
}[] = [
  {
    id: "option1",
    option: "Rapid, 15 min, +10 sec",
    config: {
      mode: "rapid",
      timeInMinutes: 15,
      timeIncrementPerMoveSeconds: 10,
    },
  },
  {
    id: "option2",
    option: "Rapid, 10 min",
    config: {
      mode: "rapid",
      timeInMinutes: 10,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    id: "option3",
    option: "Blitz, 5 min",
    config: {
      mode: "blitz",
      timeInMinutes: 5,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    id: "option4",
    option: "Blitz, 3 min, +2 sec",
    config: {
      mode: "blitz",
      timeInMinutes: 3,
      timeIncrementPerMoveSeconds: 2,
    },
  },
  {
    id: "option5",
    option: "Bullet, 1 min",
    config: {
      mode: "bullet",
      timeInMinutes: 1,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    id: "option6",
    option: "Bullet, 2 min +1 sec",
    config: {
      mode: "bullet",
      timeInMinutes: 2,
      timeIncrementPerMoveSeconds: 1,
    },
  },
];
