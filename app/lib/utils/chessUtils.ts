import { Chess, Square, WHITE } from "chess.js";

type Side = "white" | "black";

/**
 * Extracts the turn from a FEN string.
 *
 * @param {string} fen - The FEN string representing the game state.
 * @returns {Side} - Returns "white" if it's white's turn, otherwise "black".
 */
export const getTurnFromFen = (fen: string): Side => {
  return fen.split(" ")[1] === WHITE ? "white" : "black";
};

type FromTo = [Square, Square];

/**
 * Converts a LAN (Long Algebraic Notation) string to a FromTo tuple.
 *
 * @param {string} lan - The LAN string representing a move (e.g., "e2e4").
 * @returns {FromTo} - A tuple containing the starting square and the ending square.
 */
export const lanToFromTo = (lan: string): FromTo => {
  return [lan.slice(0, 2), lan.slice(2, 4)] as FromTo;
};

/**
 * Gets the positions of all pieces of a given type and color on the chessboard.
 *
 * @param {Chess} game - The Chess.js game instance.
 * @param {object} piece - The piece to find positions for.
 * @param {string} piece.type - The type of the piece (e.g., 'p', 'r', 'n', 'b', 'q', 'k').
 * @param {string} piece.color - The color of the piece ('w' for white, 'b' for black).
 * @returns {Square[]} - An array of squares where the pieces are located.
 */
export const getPiecePosition = (
  game: Chess,
  piece: { type: string; color: string },
): Square[] => {
  const squares: Square[] = [];
  game.board().map((row) => {
    row.map((p) => {
      if (p?.color === piece.color && p?.type === piece.type) {
        squares.push(p.square);
      }
    });
  });
  return squares;
};
