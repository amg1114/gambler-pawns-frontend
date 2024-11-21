import { Square, WHITE } from "chess.js";

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
