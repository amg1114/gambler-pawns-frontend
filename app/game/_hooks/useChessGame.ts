import { useState } from "react";
import { Chess, Square } from "chess.js"; // Importar la librería chess.js

type Mode = "valid" | "invalid" | "rapid" | "arcade"; // Dos modos: movimientos válidos e inválidos

export function useChessGame(
    mode: Mode = "rapid",
    makeMove: (from: string, to: string) => void,
) {
    const [game, setGame] = useState(new Chess());

    const onDrop = (sourceSquare: Square, targetSquare: Square) => {
        const gameCopy = new Chess(game.fen());

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

                    return true; // Movimiento válido
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
        return false;
    };

    return {
        position: game.fen(), // return current position in FEN format
        onDrop, // function to handle the drop of a piece
    };
}

/*
        if (mode === "valid" || mode === "rapid") {
            // Modo con validaciones de movimiento de ajedrez
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // Promoción por defecto a reina
            });

            if (move) {
                setGame(gameCopy);
                makeMove(sourceSquare, targetSquare); // Emite el movimiento a través de WebSockets

                // Validar si el juego ha terminado
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
                } else if (gameCopy.isFiftyMoves()) {
                    alert("50-move rule! The game is over.");
                }

                return true; // Movimiento válido
            }
        } else {
            // Modo arcade: permite movimientos inválidos
            gameCopy.put(game.get(sourceSquare), targetSquare);
            gameCopy.remove(sourceSquare);
            setGame(gameCopy);
            return true; // Movimiento forzado
        }

        return false; // Movimiento no permitido
    };

    // Obtener de quién es el turno (blancas o negras)
    const currentTurn = game.turn() === 'w' ? 'white' : 'black';

    return {
        position: game.fen(), // Devuelve la posición actual en formato FEN
        onDrop, // Función para manejar el drop de una pieza
        currentTurn, // Turno actual
    };
}


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
            try {
                const move = gameCopy.move({
                    from: sourceSquare,
                    to: targetSquare,
                    promotion: "q", // Promoción por defecto
                });

                if (move) {
                    setGame(gameCopy);
                    makeMove(sourceSquare, targetSquare); // Emitir el movimiento

                    // Comprobar estado del juego
                    if (gameCopy.isCheckmate()) {
                        alert("¡Jaque mate! El juego ha terminado.");
                    } else if (gameCopy.isDraw()) {
                        alert("¡Es un empate!");
                    } else if (gameCopy.isStalemate()) {
                        alert("¡Tablas por rey ahogado!");
                    } else if (gameCopy.isThreefoldRepetition()) {
                        alert("¡Empate por repetición!");
                    } else if (gameCopy.isInsufficientMaterial()) {
                        alert("¡Empate por material insuficiente!");
                    }
                }
            } catch (error) {
                console.error("Movimiento inválido", error);
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
        return false;
    };

    return {
        position: game.fen(),
        onDrop,
        currentTurn: game.turn() === "w" ? "white" : "black", // Obtener turno actual
    };
}

*/
