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
  const [hasUserMoved, setHasUserMoved] = useState<boolean>(true);
  const [isShowingSolution, setIsShowingSolution] = useState<boolean>(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);

  /**
   * Makes a move from the solution queue.
   */
  const makePuzzleMove = useCallback(() => {
    if (movesSolutionQueue.length === 0) return;

    const [from, to] = lanToFromTo(movesSolutionQueue[0]);
    makeMove(from, to);

    setMovesSolutionQueue((prev) => prev.slice(1));
  }, [movesSolutionQueue, makeMove]);

  /**
   * Handles showing the solution by processing all moves in the queue.
   */
  const onShowSolution = useCallback(() => {
    if (movesSolutionQueue.length === 0) return;

    setCurrentMoveIndex(0);
    setIsShowingSolution(true);
  }, [movesSolutionQueue]);

  /**
   * Effect to execute moves in the solution queue when showing the solution.
   */
  useEffect(() => {
    if (!isShowingSolution) return;
    if (currentMoveIndex >= movesSolutionQueue.length) {
      setIsShowingSolution(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      makePuzzleMove();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [
    isShowingSolution,
    currentMoveIndex,
    makePuzzleMove,
    movesSolutionQueue.length,
  ]);

  /**
   * Handles providing a hint by making a move from the solution queue.
   *
   * Calls handleMove twice with a delay to simulate the opponent's response.
   */
  const handleHint = useCallback(() => {
    makePuzzleMove();
    setHasUserMoved(false);
  }, [makePuzzleMove]);

  // respond to user move
  useEffect(() => {
    if (hasUserMoved || movesSolutionQueue.length === 0) return;

    const timeoutId = setTimeout(() => {
      makePuzzleMove();

      setHasUserMoved(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [hasUserMoved, makePuzzleMove, movesSolutionQueue.length]);

  return {
    handleHint,
    onShowSolution,
    setMovesSolutionQueue,
  };
}
