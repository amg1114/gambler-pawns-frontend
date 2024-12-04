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

  // const [hasPuzzleEnded, setHasPuzzleEnded] = useState<boolean>(false);

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
    console.log(
      "showing solution",
      movesSolutionQueue,
      "index",
      currentMoveIndex,
    );
    if (!isShowingSolution) return;
    if (movesSolutionQueue.length === 0) return;

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
    movesSolutionQueue,
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

  /**
   * Makes a move in the chess puzzle board.
   *
   * This function checks if the move is correct based on the solution queue.
   * If the move is correct, it updates the state and makes the move on the board.
   * If the move is incorrect, it sets the moveWasWrong state and makes the move on the board.
   *
   * @param {Square} from - The starting square of the move.
   * @param {Square} to - The ending square of the move.
   * @param {promotionPiece} [promotionPiece="q"] - The piece to promote to, if applicable.
   * @returns {boolean} - Returns true if the move was made successfully, false otherwise.
   */
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

  // undo user move if was wrong
  useEffect(() => {
    if (!moveWasWrong) return;

    const timeoutId = setTimeout(() => {
      game.undo();
      setMoveWasWrong(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [game, moveWasWrong]);

  // check if puzzle has ended
  // useEffect(() => {
  //   if (movesSolutionQueue.length === 0) {
  //     setHasPuzzleEnded(true);
  //   }
  // }, [game, movesSolutionQueue]);

  return {
    handleHint,
    onShowSolution,
    setMovesSolutionQueue,
    makeMoveInBoardPuzzles,
    hasGameEnded: movesSolutionQueue.length === 0,
  };
}
