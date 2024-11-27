import { useCallback, useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { lanToFromTo } from "@/app/lib/utils/chessUtils";
import { promotionPiece } from "@/app/lib/hooks/useChessGame";

/**
 * Custom hook to manage chess puzzles.
 *
 * @param {function} makeMove - Function to make a move on the chess board.
 * @returns
 */
export default function useChessPuzzles(
  makeMove: (
    from: Square,
    to: Square,
    promotionPiece?: promotionPiece,
  ) => boolean,
  game: Chess,
) {
  //TODO: use reducer to manage complex state

  /**
   * State to manage the queue of solution moves for the chess puzzle.
   */
  const [movesSolutionQueue, setMovesSolutionQueue] = useState<string[]>([]);

  /**
   * State to track if the user has moved.
   */
  const [isUserMoving, setIsUserMoving] = useState<boolean>(true);

  /**
   * State to track if the solution is being shown.
   */
  const [isShowingSolution, setIsShowingSolution] = useState<boolean>(false);

  /**
   * State to track the current move index when showing the solution.
   */
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);

  const [moveWasWrong, setMoveWasWrong] = useState<boolean>(false);

  /**
   * Helper function to make a move from the solution queue.
   */
  const makeMoveFromQueue = useCallback(() => {
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
      makeMoveFromQueue();
      setCurrentMoveIndex((prev) => prev + 1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [
    isShowingSolution,
    currentMoveIndex,
    makeMoveFromQueue,
    movesSolutionQueue.length,
  ]);

  /**
   * Handles providing a hint by making a move from the solution queue.
   *
   * Calls handleMove twice with a delay to simulate the opponent's response.
   */
  const handleHint = useCallback(() => {
    makeMoveFromQueue();
    setIsUserMoving(false);
  }, [makeMoveFromQueue]);

  // respond to user move
  useEffect(() => {
    if (isUserMoving || movesSolutionQueue.length === 0) return;

    const timeoutId = setTimeout(() => {
      makeMoveFromQueue();
      setIsUserMoving(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isUserMoving, makeMoveFromQueue, movesSolutionQueue.length]);

  const makeMoveInBoardPuzzles = useCallback(
    (from: Square, to: Square, promotionPiece: promotionPiece = "q") => {
      if (movesSolutionQueue.length === 0) return false;

      const correctMove = lanToFromTo(movesSolutionQueue[0]);
      const isWrongMove = from !== correctMove[0] || to !== correctMove[1];
      if (isWrongMove) {
        setMoveWasWrong(true);
        return makeMove(from, to, promotionPiece);
      }

      setIsUserMoving(false);
      const result = makeMove(from, to, promotionPiece);

      setMovesSolutionQueue((prev) => prev.slice(1));
      return result;
    },
    [makeMove, movesSolutionQueue],
  );

  useEffect(() => {
    if (!moveWasWrong) return;

    const timeoutId = setTimeout(() => {
      game.undo();
      setMoveWasWrong(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [game, moveWasWrong]);

  return {
    handleHint,
    onShowSolution,
    setMovesSolutionQueue,
    makeMoveInBoardPuzzles,
  };
}
