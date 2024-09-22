import { useState } from "react";
import { Chess, Square } from "chess.js"; // Importar la librería chess.js

type Mode = "valid" | "invalid"; // Dos modos: movimientos válidos e inválidos

export function useChessGame(mode: Mode = "valid") {
    const [game, setGame] = useState(new Chess()); // Estado del juego

    // Función para manejar un movimiento
    const onDrop = (sourceSquare: Square, targetSquare: Square) => {
        const gameCopy = new Chess(game.fen());

        if (mode === "valid") {
            // Modo de movimientos válidos
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // Promoción por defecto
            });
            if (move) {
                setGame(gameCopy); // Solo si el movimiento es válido actualizamos el juego
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
        return false; // Movimiento no permitido
    };

    return {
        position: game.fen(), // Devuelve la posición actual en formato FEN
        onDrop, // Función para manejar el drop
    };
}
