import { useCallback, useState } from "react";
import { Chess, Square } from "chess.js";

type GameModeType = "rapid" | "blitz" | "bullet" | "arcade";

interface UseChessGameReturnType {
  position: string;
  gameHistoryMoves: string[];
  onDrop: (sourceSquare: Square, targetSquare: Square) => boolean;
  updateGameFromOpponent: (fen: string, moveHistory: string[]) => void;
  makeMove: (from: string, to: string, promotion: string) => boolean;
  game: Chess;
}

/**
 * Custom hook to manage a chess game.
 *
 * @param {GameModeType} mode - The mode of the game.
 * @param {any} gameData - The initial data for the game, including the player's color.
 * @param {function} [makeMoveCallback] - Optional callback function to be called when a move is made.
 * @returns {UseChessGameReturnType} - Returns an object containing the current position, game history moves, onDrop function, updateGameFromOpponent function, and innerMakeMove function.
 */
export function useChessGame(
  mode: GameModeType = "rapid",
  gameData: any,
  makeMoveCallback?: (from: string, to: string, promotion: string) => void,
): UseChessGameReturnType {
  const [game, setGame] = useState(new Chess());
  const [movesHistory, setMovesHistory] = useState<string[]>([]);

  /**
   * Makes a move in the chess game.
   *
   * @param {string} from - The starting square of the piece to move (e.g., "e2").
   * @param {string} to - The ending square of the piece to move (e.g., "e4").
   * @param {string} promotion - The piece to promote to if a pawn reaches the last rank (e.g., "q" for queen).
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   */
  const makeMove = useCallback(
    (from: string, to: string, promotion: string): boolean => {
      const gameCopy = new Chess(game.fen());
      try {
        const move = gameCopy.move({
          from,
          to,
          promotion,
        });
        if (move) {
          setGame(gameCopy);
          setMovesHistory([...movesHistory, to]);

          if (makeMoveCallback) {
            makeMoveCallback(from, to, "q"); // Emit move thorugh WebSockets
          }

          return true;
        }
      } catch {
        console.warn("Invalid move");
        return false;
      }
      return false;
    },
    [game, makeMoveCallback, movesHistory],
  );

  const forceMakeMove = useCallback(
    (from: Square, to: Square, _promotion: string): boolean => {
      // This is the way we can force "invalid" moves for arcade moves
      // see this thread https://github.com/jhlywa/chess.js/issues/309

      const gameCopy = new Chess(game.fen());
      gameCopy.put(game.get(from), to);
      gameCopy.remove(from);

      setGame(gameCopy);
      setMovesHistory([...movesHistory, to]);

      setGame(gameCopy);
      return true;
    },
    [game, movesHistory],
  );

  /**
   * Handles piece drop, validates moves, makes move and emits to WebSocket server.
   *
   * @param {Square} sourceSquare - The starting square of the piece to move.
   * @param {Square} targetSquare - The ending square of the piece to move.
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   */
  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      // Validate turn (color)
      const mySide = gameData.color;
      if (
        (game.turn() === "b" && mySide === "white") ||
        (game.turn() === "w" && mySide === "black")
      ) {
        return false;
      }

      return mode !== "arcade"
        ? makeMove(sourceSquare, targetSquare, "q")
        : forceMakeMove(sourceSquare, targetSquare, "q");
    },
    [game, gameData, mode, makeMove, forceMakeMove],
  );

  /**
   * Updates the game state from opponent moves.
   *
   * @param {string} fen - The FEN string representing the game state.
   * @param {string[]} moveHistory - The history of moves made in the game.
   */
  const updateGameFromOpponent = useCallback(
    (fen: string, moveHistory: string[]) => {
      const gameCopy = new Chess(fen);
      setMovesHistory(moveHistory);
      setGame(gameCopy);
    },
    [],
  );

  return {
    position: game.fen(),
    gameHistoryMoves: movesHistory,
    onDrop,
    updateGameFromOpponent,
    makeMove,
    game,
  };
}
