import { useState, useCallback } from "react";

interface GameTimes {
  playerOneTime: number;
  playerTwoTime: number;
}

interface UseGameTimersReturnType {
  playerOneTime: number;
  playerTwoTime: number;
  handleTimerUpdate: (newTimes: GameTimes) => void;
}

/**
 * Custom hook to manage game timers for two players.
 *
 * @param {number} initialTime - The initial time for both players in milliseconds.
 * @returns {UseGameTimersReturnType} - An object containing the current times for both players and a function to update the timers.
 */
export function useGameTimers(initialTime: number): UseGameTimersReturnType {
  /**
   * The current times for both players.
   */
  const [times, setTimes] = useState<GameTimes>({
    playerOneTime: initialTime,
    playerTwoTime: initialTime,
  });

  /**
   * Updates the timers for both players.
   *
   * @param {Object} newTimes - An object containing the new times for both players.
   * @param {number} newTimes.playerOneTime - The new time for player one.
   * @param {number} newTimes.playerTwoTime - The new time for player two.
   */
  const handleTimerUpdate = useCallback((newTimes: GameTimes) => {
    setTimes(newTimes);
  }, []);

  return { ...times, handleTimerUpdate };
}
