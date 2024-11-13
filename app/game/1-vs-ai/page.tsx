"use client";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import { useChessGame } from "../_hooks/useChessGame";
import { useStockfish } from "./_hooks/useStockfish";
import { useCallback, useEffect, useState } from "react";
import { Square } from "chess.js";

export default function BotPage() {
  // TODO: in the future have a form with options after game such as engine level (like elo), side, game mode
  const [isProcessingMove, setIsProcessingMove] = useState(false);

  const gameData = {
    color: "w",
  };

  const { game, position, onDrop, makeMove } = useChessGame("rapid", gameData);

  const handleDrop = useCallback(
    (from: Square, to: Square) => {
      if (game.turn() !== "w") return false;
      const moveResult = onDrop(from, to);
      if (moveResult) {
        setIsProcessingMove(true);
      }
      return moveResult;
    },
    [game, onDrop],
  );

  const { bestMove, isThinking, analyzePosition } = useStockfish(position);

  // Efecto para manejar el movimiento del bot
  useEffect(() => {
    const makeBotMove = async () => {
      if (
        game.turn() === "b" &&
        bestMove &&
        !isThinking &&
        isProcessingMove &&
        !game.isGameOver()
      ) {
        console.log("Making bot move:", bestMove);
        // Pequeña pausa para hacer el movimiento más natural
        await new Promise((resolve) => setTimeout(resolve, 300));

        const [from, to] = [
          bestMove.slice(0, 2) as Square,
          bestMove.slice(2, 4) as Square,
        ];

        makeMove(from, to, "q");
        setIsProcessingMove(false);
      }
    };

    makeBotMove();
  }, [bestMove, isThinking, makeMove, game, isProcessingMove]);

  // Efecto para forzar el análisis después de cada movimiento
  useEffect(() => {
    if (game.turn() === "b" && isProcessingMove) {
      analyzePosition(position, "b");
    }
  }, [position, game, isProcessingMove, analyzePosition]);

  return (
    <div className="p-4 container mx-auto">
      <ChessBoardGame
        position={position}
        onDrop={handleDrop}
        side="white"
        // disabled={isProcessingMove || game.turn() === "b"}
      />
    </div>
  );
}
