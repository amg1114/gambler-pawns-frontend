"use client";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import { useChessGame } from "../_hooks/useChessGame";
import { useStockfish } from "./_hooks/useStockfish";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Square } from "chess.js";
import EndGameAgainsBotModal from "./_components/EndGameAgainsBotModal";

export default function BotPage() {
  // TODO: in the future have a form with options after game such as engine level (like elo), side, game mode
  const [isProcessingMove, setIsProcessingMove] = useState(false);

  const gameData = useMemo(() => ({ color: "w" }), []);

  const { game, position, onDrop, makeMove, endGameData } = useChessGame(
    "rapid",
    gameData,
  );

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

  const { bestMove, analyzePosition } = useStockfish();

  // triggers the bot to analyze the position when it's the bot's turn
  useEffect(() => {
    if (game.turn() === "b" && isProcessingMove) {
      analyzePosition(game.fen(), "b");
    }
  }, [game, isProcessingMove, analyzePosition]);

  // trigger bot's moves
  useEffect(() => {
    const makeBotMove = async () => {
      // only proceed if it's the bot's turn and it's not already processing a move
      if (
        game.turn() === "b" &&
        bestMove &&
        isProcessingMove &&
        !game.isGameOver()
      ) {
        console.info("Ejecutando movimiento del bot:", bestMove);
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
  }, [bestMove, game, makeMove, isProcessingMove]);

  return (
    <div className="p-4 container mx-auto">
      <ChessBoardGame position={position} onDrop={handleDrop} side="white" />
      <EndGameAgainsBotModal
        isOpen={endGameData !== null}
        winner={game.isDraw() ? "Draw" : game.turn() === "w" ? "Bot" : "You"}
        reason={endGameData?.reason || ""}
      />
    </div>
  );
}
