import { useCallback, useState } from "react";
import { Chess, Square } from "chess.js";

type GameModeType = "rapid" | "blitz" | "bullet" | "arcade";

export function useChessGame(
  mode: GameModeType = "rapid",
  makeMove: (from: string, to: string) => void,
) {
  const [game, setGame] = useState(new Chess());
  const [movesHistory, setMovesHistory] = useState<string[]>([]);

  /** Handle piece drop, val moves, make move and emit to ws server */
  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      const gameCopy = new Chess(game.fen());

      // Validate turn (color)
      const mySide = JSON.parse(
        localStorage.getItem("gameData") as string,
      ).color;

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
            makeMove(sourceSquare, targetSquare); // Emit move thorugh WebSockets

            // Check if the game has ended
            if (gameCopy.isCheckmate()) {
              alert("Checkmate! The game is over.");
            }
            // check draw cases
            // TODO: revisar si en el backend se estan chekeando estos casos
            else if (gameCopy.isDraw()) {
              alert("It's a draw! The game is over.");
            } else if (gameCopy.isStalemate()) {
              alert("Stalemate! The game is over.");
            } else if (gameCopy.isThreefoldRepetition()) {
              alert("Threefold repetition! The game is over.");
            } else if (gameCopy.isInsufficientMaterial()) {
              alert("Insufficient material! The game is over.");
            }

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
    [game, makeMove, mode],
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
