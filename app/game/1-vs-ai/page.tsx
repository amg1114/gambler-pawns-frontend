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

  // triggers the bot to analyze the position when it's the bot's turn
  useEffect(() => {
    if (game.turn() === "b" && isProcessingMove && !isThinking) {
      analyzePosition(position, "b");
    }
  }, [game, isProcessingMove, position, analyzePosition, isThinking]);

  // trigger bot's moves
  useEffect(() => {
    const makeBotMove = async () => {
      console.warn("Verificando condiciones para mover:", {
        turn: game.turn(),
        bestMove,
        isThinking,
        isProcessingMove,
        isGameOver: game.isGameOver(),
      });

      // only proceed if it's the bot's turn and it's not already processing a move
      if (
        game.turn() === "b" &&
        bestMove &&
        !isThinking &&
        isProcessingMove &&
        !game.isGameOver()
      ) {
        console.log("Ejecutando movimiento del bot:", bestMove);

        // small delay to make the bot move more human-like
        await new Promise((resolve) => setTimeout(resolve, 500));

        const [from, to] = [
          bestMove.slice(0, 2) as Square,
          bestMove.slice(2, 4) as Square,
        ];

        makeMove(from, to, "q");
        setIsProcessingMove(false);
      }
    };

    makeBotMove();
  }, [bestMove, isThinking, game, makeMove, isProcessingMove]);

  return (
    <div className="p-4 container mx-auto">
      <ChessBoardGame position={position} onDrop={handleDrop} side="white" />
    </div>
  );
}
