"use client";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import { useChessGame } from "../../lib/hooks/useChessGame";
import { useStockfish } from "./_hooks/useStockfish";
import { useEffect, useState } from "react";
import { BLACK, Square, WHITE } from "chess.js";
import EndGameAgainsBotModal from "./_components/EndGameAgainsBotModal";

export default function BotPage() {
  // TODO: in the future have a form with options after game such as engine level (like elo), side, game mode
  const [isProcessingMove, setIsProcessingMove] = useState(false);

  const { game, position, makeMove, endGameData, clearGame } = useChessGame({
    onMoveMade: () => {
      setIsProcessingMove(true);
    },
  });

  const { bestMove, analyzePosition } = useStockfish();

  // triggers the bot to analyze the position when it's the bot's turn
  useEffect(() => {
    if (isProcessingMove) {
      analyzePosition(game.fen(), BLACK);
    }
  }, [game, isProcessingMove, analyzePosition]);

  // trigger bot's moves
  useEffect(() => {
    const makeBotMove = async () => {
      // only proceed if it's the bot's turn and it's not already processing a move
      if (bestMove && isProcessingMove && !game.isGameOver()) {
        console.info("Ejecutando movimiento del bot:", bestMove);
        // small delay to make the bot move more human-like
        await new Promise((resolve) => setTimeout(resolve, 500));

        const [from, to] = [
          bestMove.slice(0, 2) as Square,
          bestMove.slice(2, 4) as Square,
        ];

        makeMove(from, to);
        setIsProcessingMove(false);
      }
    };

    makeBotMove();
  }, [bestMove, game, makeMove, isProcessingMove, ,]);

  return (
    <div className="p-4 container mx-auto">
      <ChessBoardGame
        position={position}
        onDrop={makeMove}
        side="white"
        game={game}
        arePremovesAllowed={true}
      />
      <EndGameAgainsBotModal
        isOpen={endGameData !== null}
        onNewGame={clearGame}
        winner={game.isDraw() ? "Draw" : game.turn() === WHITE ? "Bot" : "You"}
        reason={endGameData?.reason || ""}
      />
    </div>
  );
}
