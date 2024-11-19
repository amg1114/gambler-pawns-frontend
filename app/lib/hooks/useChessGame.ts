import { useCallback, useState } from "react";
import { BLACK, Chess, QUEEN, Square, WHITE } from "chess.js";

// aux types
export type promotionPiece = "q" | "r" | "b" | "n";

interface EndGameDataType {
  winner: string;
  reason: string;
}

interface MoveConfig {
  from: Square;
  to: Square;
  promotion: promotionPiece;
}

interface MoveHandlerOptions {
  playAs: "w" | "b";
  allowInvalidMoves: boolean;
}

// hook props
interface UseChessGameProps {
  onMoveMade?: (from: string, to: string, promotion: string) => void;
  onGameEnd?: () => void;
  moveHandlerOptions?: MoveHandlerOptions;
}

// hook return type
interface UseChessGameReturnType {
  position: string;
  movesHistory: string[];
  getTurn: "w" | "b";
  clearGame: () => void;
  makeMove: (
    from: Square,
    to: Square,
    promotionPiece?: promotionPiece,
  ) => boolean;
  makeMoveWithoutTurnValidation: (
    from: Square,
    to: Square,
    promotionPiece?: promotionPiece,
  ) => boolean;
  game: Chess;
  endGameData: EndGameDataType | null;
  loadGameFromFen: (fen: string) => void;
  loadGameFromPgn: (pgn: string) => void;
}

/**
 * Custom hook to manage a chess game.
 *
 * @param {UseChessGameProps} props - The properties for the hook.
 * @param {function} [props.onMoveMade] - Optional callback function to be called when a move is made (e.g to emit move by websockets).
 * @param {function} [props.onGameEnd] - Optional callback function to be called when the game ends.
 * @param {MoveHandlerOptions} [props.moveHandlerOptions={ playAs: "w", allowInvalidMoves: false }] - Options for handling moves, including the color the player is playing as and whether to allow invalid moves.
 * @returns {UseChessGameReturnType} - Returns an object containing the current position, game history moves, makeMove function, onDropBoard function, game instance, endGameData, loadGameFromFen function, and loadGameFromPgn function.
 */
export function useChessGame({
  onMoveMade,
  onGameEnd,
  moveHandlerOptions = { playAs: WHITE, allowInvalidMoves: false },
}: UseChessGameProps): UseChessGameReturnType {
  /**
   * The current state of the chess game.
   *
   * This state holds an instance of the Chess game, which is used to manage the game state,
   * including the board position, move history, and game rules.
   */
  const [game, setGame] = useState<Chess>(new Chess());

  /**
   * The end game data.
   *
   * This state holds the data related to the end of the game, including the winner and the reason
   * for the game's end. It is set when the game ends.
   */
  const [endGameData, setEndGameData] = useState<EndGameDataType | null>(null);

  /**
   * Loads the game state from a FEN string.
   *
   * @param {string} fen - The FEN string representing the game state.
   */
  const loadGameFromFen = useCallback((fen: string) => {
    const gameCopy = new Chess(fen);
    setGame(gameCopy);
  }, []);

  /**
   * Loads the game state from a PGN string.
   *
   * @param {string} pgn - The PGN string representing the game state.
   */
  const loadGameFromPgn = useCallback((pgn: string) => {
    const gameCopy = new Chess();
    gameCopy.loadPgn(pgn);
    setGame(gameCopy);
  }, []);

  const clearGame = useCallback(() => {
    setGame(new Chess());
    setEndGameData(null);
  }, []);

  /**
   * Checks if the game has ended and sets the end game data if it has.
   *
   * @param {Chess} gameCopy - The current game state.
   */
  const checkGameEnd = useCallback(
    (gameCopy: Chess) => {
      if (!gameCopy.isGameOver()) return;

      const winner = gameCopy.turn() === WHITE ? BLACK : WHITE;
      let reason = "";

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

      // call onGameEnd callback if provided
      if (onGameEnd) onGameEnd();
    },
    [onGameEnd],
  );

  /**
   * Makes a valid move in the chess game.
   *
   * @param {MoveConfig} moveConfig - The configuration for the move.
   * @param {Chess} gameCopy - The current game state.
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   */
  const makeValidMove = useCallback(
    (moveConfig: MoveConfig, gameCopy: Chess) => {
      try {
        gameCopy.move(moveConfig);
        return true;
      } catch {
        console.warn(`Invalid move ${JSON.stringify(moveConfig)}`);
        return false;
      }
    },
    [],
  );

  /**
   * Makes a forced move in the chess game.
   *
   * @param {MoveConfig} moveConfig - The configuration for the move.
   * @param {Chess} gameCopy - The current game state.
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   */
  const makeForcedMove = useCallback(
    (moveConfig: MoveConfig, gameCopy: Chess) => {
      // see this thread https://github.com/jhlywa/chess.js/issues/309
      const pieceFrom = gameCopy.get(moveConfig.from);

      gameCopy.put(pieceFrom, moveConfig.to);
      gameCopy.remove(moveConfig.from);
      return true;
    },
    [],
  );

  /**
   * Executes a move in the chess game.
   *
   * @param {Square} from - The starting square of the piece to move.
   * @param {Square} to - The ending square of the piece to move.
   * @param {promotionPiece} promotionPiece - The piece to promote to if a pawn reaches the last rank.
   * @param {boolean} validateTurn - Whether to validate the player's turn.
   * @param {boolean} allowInvalidMoves - Whether to allow invalid moves.
   * @returns {boolean} - Returns true if the move was made, otherwise false.
   */
  const executeMove = useCallback(
    (
      from: Square,
      to: Square,
      promotionPiece: promotionPiece,
      validateTurn: boolean,
      allowInvalidMoves: boolean,
    ): boolean => {
      if (validateTurn && game.turn() !== moveHandlerOptions.playAs)
        return false;

      const gameCopy = new Chess();
      gameCopy.loadPgn(game.pgn());

      const moveConfig: MoveConfig = {
        from,
        to,
        promotion: promotionPiece,
      };

      const moveMade = !allowInvalidMoves
        ? makeValidMove(moveConfig, gameCopy)
        : makeForcedMove(moveConfig, gameCopy);

      if (!moveMade) return false;

      setGame(gameCopy);
      checkGameEnd(gameCopy);

      // call onMoveMade callback if provided
      if (onMoveMade) onMoveMade(from, to, promotionPiece);

      return moveMade;
    },
    [
      game,
      moveHandlerOptions,
      makeValidMove,
      makeForcedMove,
      checkGameEnd,
      onMoveMade,
    ],
  );

  /**
   * Makes a valid move in the chess game.
   *
   * @param {MoveConfig} moveConfig - The configuration for the move.
   * @param {Chess} gameCopy - A copy of the current game state.
   * @returns {boolean} - Returns true if the move is valid and was made, otherwise false.
   */
  const makeMove = useCallback(
    (from: Square, to: Square, promotionPiece: promotionPiece = QUEEN) => {
      return executeMove(
        from,
        to,
        promotionPiece,
        true,
        moveHandlerOptions.allowInvalidMoves,
      );
    },
    [moveHandlerOptions, executeMove],
  );

  /**
   * Makes a move in the chess game without turn validation (you can make moves for the Opponent).
   *
   * @param {Square} from - The starting square of the piece to move.
   * @param {Square} to - The ending square of the piece to move.
   * @param {promotionPiece} [promotionPiece=QUEEN] - The piece to promote to if a pawn reaches the last rank.
   * @returns {boolean} - Returns true if the move was made, otherwise false.
   */
  const makeMoveWithoutTurnValidation = useCallback(
    (from: Square, to: Square, promotionPiece: promotionPiece = QUEEN) => {
      return executeMove(from, to, promotionPiece, false, false);
    },
    [executeMove],
  );

  return {
    position: game.fen(),
    movesHistory: game.history(),
    getTurn: game.turn(),
    clearGame,
    makeMove,
    makeMoveWithoutTurnValidation,
    game,
    endGameData,
    loadGameFromFen,
    loadGameFromPgn,
  };
}
