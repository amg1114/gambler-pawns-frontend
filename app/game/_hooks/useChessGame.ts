import { useCallback, useState } from "react";
import { Chess, Square } from "chess.js";

type GameModeType = "rapid" | "blitz" | "bullet" | "arcade";

interface EndGameDataType {
  winner: string;
  reason: string;
}

interface UseChessGameReturnType {
  position: string;
  gameHistoryMoves: string[];
  onDrop: (sourceSquare: Square, targetSquare: Square) => boolean;
  updateGameFromOpponent: (fen: string, moveHistory: string[]) => void;
  makeMove: (from: Square, to: Square, promotion?: string) => boolean;
  game: Chess;
  endGameData: EndGameDataType | null;
}

/**
 * Custom hook to manage a chess game.
 *
 * @param {GameModeType} mode - The mode of the game.
 * @param {any} gameData - The initial data for the game, including the player's color.
 * @param {function} [makeMoveCallback] - Optional callback function to be called when a move is made.
 * @returns {UseChessGameReturnType} - Returns an object containing the current position, game history moves, onDrop function, updateGameFromOpponent function, and innerMakeMove function, endGameData and game instance.
 */
export function useChessGame(
  mode: GameModeType = "rapid",
  gameData: any,
  makeMoveCallback?: (from: string, to: string, promotion: string) => void,
  handleGameEnd?: () => void,
): UseChessGameReturnType {
  const [game, setGame] = useState(new Chess());
  const [movesHistory, setMovesHistory] = useState<string[]>([]);
  const [endGameData, setEndGameData] = useState<EndGameDataType | null>(null);

  /**
   * Checks if the game has ended and sets the end game data if it has.
   *
   * This function checks various conditions to determine if the game has ended,
   * such as checkmate, insufficient material, stalemate, threefold repetition,
   * and the 50 moves rule. If the game has ended, it sets the end game data
   * with the winner and the reason for the game's end, and calls the handleGameEnd
   * callback if provided.
   *
   * @callback handleGameEnd - Optional callback function to be called when the game ends.
   */
  const checkGameEnd = useCallback(
    (gameCopy: Chess) => {
      console.info("Checking game end", gameCopy.fen());
      if (!gameCopy.isGameOver()) return;
      const winner = gameCopy.turn() === "w" ? "b" : "w";
      let reason = "";

      // TODO: since game object is mutating probably threfold repetition and 50 moves rule are not working
      if (gameCopy.isCheckmate()) {
        reason = "Check Mate";
      } else if (gameCopy.isInsufficientMaterial()) {
        reason = "Insufficient Material";
      } else if (gameCopy.isStalemate()) {
        reason = "Stalemate";
      } else if (gameCopy.isThreefoldRepetition()) {
        reason = "Threefold Repetition";
      } else if (gameCopy.isDraw()) {
        reason = "50 Moves Rule";
      }
      console.info(`Game Ended - Winner: ${winner}, Reason: ${reason}`);
      setEndGameData({ winner, reason });
      handleGameEnd?.();
    },
    [handleGameEnd],
  );

  /**
   * Makes a move in the chess game.
   *
   * @param {string} from - The starting square of the piece to move (e.g., "e2").
   * @param {string} to - The ending square of the piece to move (e.g., "e4").
   * @param {string} promotion - The piece to promote to if a pawn reaches the last rank (e.g., "q" for queen).
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   */
  const makeMove = useCallback(
    (from: Square, to: Square, promotionPiece?: string) => {
      const gameCopy = new Chess(game.fen());

      const moveConfig: any = {
        from,
        to,
        promotionPiece: promotionPiece || "q",
      };

      if (promotionPiece) {
        moveConfig.promotion = promotionPiece.toLowerCase();
      }

      try {
        const move = gameCopy.move(moveConfig);

        if (move) {
          setGame(gameCopy);
          setMovesHistory([...movesHistory, to]);

          if (makeMoveCallback) {
            makeMoveCallback(from, to, promotionPiece || "q"); // Emit move thorugh WebSockets
          }
          checkGameEnd(gameCopy);
          return true;
        }
      } catch {
        console.warn(
          `Invalid move from: ${from}, to: ${to}, promotion: ${moveConfig.promotionPiece}`,
        );
        return false;
      }
      return false;
    },
    [game, makeMoveCallback, movesHistory, checkGameEnd],
  );

  const forceMakeMove = useCallback(
    (from: Square, to: Square, _promotionPiece?: string): boolean => {
      // This is the way we can force "invalid" moves for arcade moves
      // see this thread https://github.com/jhlywa/chess.js/issues/309
      // TODO: how to handlw promotions here

      const gameCopy = new Chess(game.fen());
      gameCopy.put(game.get(from), to);
      gameCopy.remove(from);

      setGame(gameCopy);
      setMovesHistory([...movesHistory, to]);

      setGame(gameCopy);
      checkGameEnd(gameCopy);
      return true;
    },
    [checkGameEnd, game, movesHistory],
  );

  /**
   * Handles piece drop, validates moves, makes move and emits to WebSocket server.
   *
   * @param {Square} sourceSquare - The starting square of the piece to move.
   * @param {Square} targetSquare - The ending square of the piece to move.
   * @param {string} promotionPiece - The piece to promote to if a pawn reaches the last rank.
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   */
  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, promotionPiece?: string) => {
      // Validate turn (color)
      const mySide = gameData.color;
      if (
        (game.turn() === "b" && mySide === "white") ||
        (game.turn() === "w" && mySide === "black")
      ) {
        return false;
      }

      return mode !== "arcade"
        ? makeMove(sourceSquare, targetSquare, promotionPiece)
        : forceMakeMove(sourceSquare, targetSquare, promotionPiece);
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
    endGameData,
  };
}
