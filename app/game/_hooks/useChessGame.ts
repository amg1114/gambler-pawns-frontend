import { useState } from "react";
import { Chess, Square } from "chess.js";

type Mode = "valid" | "invalid" | "rapid" | "arcade"; // TODO: refactor here with game modes

export function useChessGame(
  mode: Mode = "rapid",
  makeMove: (from: string, to: string) => void,
) {
  const [game, setGame] = useState(new Chess());

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    const gameCopy = new Chess(game.fen());

    // Validate turn (color)
    const mySide = JSON.parse(localStorage.getItem("gameData") as string).color;
    console.log(
      "gameData",
      JSON.parse(localStorage.getItem("gameData") as string),
    );
    console.log("mySide", mySide, "and turn ", game.turn());
    if (
      (game.turn() === "b" && mySide === "white") ||
      (game.turn() === "w" && mySide === "black")
    )
      return false;

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
          } else if (gameCopy.isDraw()) {
            alert("It's a draw! The game is over.");
          } else if (gameCopy.isStalemate()) {
            alert("Stalemate! The game is over.");
          } else if (gameCopy.isThreefoldRepetition()) {
            alert("Threefold repetition! The game is over.");
          } else if (gameCopy.isInsufficientMaterial()) {
            alert("Insufficient material! The game is over.");
          }
          // TODO: implement fifty moves rule

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
  };

  const updateGameFromOpponent = (fen: string) => {
    const gameCopy = new Chess(fen);
    setGame(gameCopy);
  };

  return {
    position: game.fen(), // return current position in FEN format
    onDrop, // function to handle the drop of a piece
    updateGameFromOpponent, // function to update the game from opponent moves
  };
}
