import { useCallback, useEffect, useState } from "react";
import { Square } from "chess.js";
import { lanToFromTo } from "@/app/lib/utils/chessUtils";

/**
 * Custom hook to manage chess puzzles.
 *
 * @param {function} makeMove - Function to make a move on the chess board.
 * @returns
 */
export default function useChessPuzzles(
  makeMove: (from: Square, to: Square) => void,
) {
  /**
   * State to manage the queue of solution moves for the chess puzzle.
   */
  const [movesSolutionQueue, setMovesSolutionQueue] = useState<string[]>([]);

  /**
   * State to manage the pending moves for the chess puzzle.
   *
   * This state holds the moves that are pending to be made as part of the hint functionality.
   * When handleHint is called, the first two moves from the solution queue are set as pending moves.
   */
  const [pendingMoves, setPendingMoves] = useState<string[]>([]);

  /**
   * Handles showing the solution by making all moves from the solution queue.
   *
   * Executes all moves in the solution queue with a delay between each move.
   */
  const onShowSolution = useCallback(() => {
    if (movesSolutionQueue.length === 0) return;

    const executeMoves = async () => {
      for (const move of movesSolutionQueue) {
        const [from, to] = lanToFromTo(move);
        makeMove(from, to);

        // Delay between moves
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Clear the solution queue after showing all moves
      setMovesSolutionQueue([]);
    };

    executeMoves();
  }, [movesSolutionQueue, makeMove]);

  /**
   * Handles providing a hint by making a move from the solution queue.
   *
   * Calls handleMove twice with a delay to simulate the opponent's response.
   */
  const handleHint = useCallback(() => {
    if (movesSolutionQueue.length < 4) return;

    setPendingMoves(movesSolutionQueue.slice(0, 2));
  }, [movesSolutionQueue]);

  // handle onHint
  useEffect(() => {
    if (pendingMoves.length >= 2) {
      const [move1, move2] = pendingMoves.slice(0, 2);
      const [from, to] = lanToFromTo(move1);
      const [from2, to2] = lanToFromTo(move2);

      makeMove(from, to);

      // timeout to simulate the opponent's move
      const timeoutId = setTimeout(() => {
        makeMove(from2, to2);

        // update states
        setMovesSolutionQueue((prev) => prev.slice(2));
        setPendingMoves((prev) => prev.slice(2));
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [pendingMoves, makeMove]);

  return {
    handleHint,
    onShowSolution,
    setMovesSolutionQueue,
  };
}
