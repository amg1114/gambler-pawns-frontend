import { useState } from "react";
import { Chess, Square } from "chess.js"; // Importar la librería chess.js

type Mode = "valid" | "invalid" | "rapid"; // Dos modos: movimientos válidos e inválidos

export function useChessGame(
    mode: Mode = "rapid",
    makeMove: (from: string, to: string) => void,
) {
    const [game, setGame] = useState(new Chess());

    const onDrop = (sourceSquare: Square, targetSquare: Square) => {
        const gameCopy = new Chess(game.fen());

        if (mode === "rapid") {
            // mode with valid moves
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // Promoción por defecto
            });
            if (move) {
                setGame(gameCopy);
                makeMove(sourceSquare, targetSquare); // Emite el movimiento a través de WebSockets
                return true;
            }
        } else {
            // This is the way we can force "invalid" moves for arcade moves
            // see this thread https://github.com/jhlywa/chess.js/issues/309
            gameCopy.put(game.get(sourceSquare), targetSquare);
            gameCopy.remove(sourceSquare);
            setGame(gameCopy);
            return true;
        }
        return false;
    };

    return {
        position: game.fen(), // return current position in FEN format
        onDrop, // function to handle the drop of a piece
    };
}
