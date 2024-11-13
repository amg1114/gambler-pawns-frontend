import { GameOptions } from "@/app/game-options/_hooks/game-options.hook";

export const arraySimplifyGameModes = [
  { id: "option1", option: "All" },
  { id: "option2", option: "Rapid" },
  { id: "option3", option: "Blitz" },
  { id: "option4", option: "Bullet" },
  { id: "option5", option: "Arcade" },
];

export const arrayPlayedAsColor = [
  { id: "option1", option: "All" },
  { id: "option2", option: "White" },
  { id: "option3", option: "Black" },
];

export const arrayResultType = [
  { id: "option1", option: "All" },
  { id: "option2", option: "I won" },
  { id: "option3", option: "Draw" },
  { id: "option4", option: "I lost" },
];

export const arrayGameModes: {
  text: string;
  id: string;
  config: GameOptions;
}[] = [
  {
    text: "Rapid, 15 min, +10 sec",
    id: "option1",
    config: {
      mode: "rapid",
      timeInMinutes: 15,
      timeIncrementPerMoveSeconds: 10,
    },
  },
  {
    text: "Rapid, 10 min",
    id: "option2",
    config: {
      mode: "rapid",
      timeInMinutes: 10,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    text: "Blitz, 5 min",
    id: "option3",
    config: {
      mode: "blitz",
      timeInMinutes: 5,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    text: "Blitz, 3 min, +2 sec",
    id: "option4",
    config: {
      mode: "blitz",
      timeInMinutes: 3,
      timeIncrementPerMoveSeconds: 2,
    },
  },
  {
    text: "Bullet, 1 min",
    id: "option5",
    config: {
      mode: "bullet",
      timeInMinutes: 1,
      timeIncrementPerMoveSeconds: 0,
    },
  },
  {
    text: "Bullet, 2 min +1 sec",
    id: "option6",
    config: {
      mode: "bullet",
      timeInMinutes: 2,
      timeIncrementPerMoveSeconds: 1,
    },
  },
];
