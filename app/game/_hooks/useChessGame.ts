import { useCallback, useState } from "react";
import { Chess, Square } from "chess.js";

type GameModeType = "rapid" | "blitz" | "bullet" | "arcade";

export function useChessGame(
  mode: GameModeType = "rapid",
  gameData: any,
  makeMove: (from: string, to: string, promotion: string) => void,
) {
  const [game, setGame] = useState(new Chess());
  const [movesHistory, setMovesHistory] = useState<string[]>([]);

  /** Handle piece drop, val moves, make move and emit to ws server */
  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      const gameCopy = new Chess(game.fen());

      // Validate turn (color)
      const mySide = gameData.color;

      if (
        (game.turn() === "b" && mySide === "white") ||
        (game.turn() === "w" && mySide === "black")
      ) {
        return false;
      }

      if (mode !== "arcade") {
        // mode with valid moves
        try {
          const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // TODO: change handle default promotion
          });

          if (move) {
            setGame(gameCopy);
            makeMove(sourceSquare, targetSquare, "q"); // Emit move thorugh WebSockets
            return true; // valid move
          }
        } catch {
          console.error("Invalid move");
          return false;
        }
      } else {
        // This is the way we can force "invalid" moves for arcade moves
        // see this thread https://github.com/jhlywa/chess.js/issues/309
        gameCopy.put(game.get(sourceSquare), targetSquare);
        gameCopy.remove(sourceSquare);
        setGame(gameCopy);
        return true;
      }
      return false; // invalid move
    },
    [game, makeMove, mode, gameData],
  );

  /** Update game from opponent moves */
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
  };
}
