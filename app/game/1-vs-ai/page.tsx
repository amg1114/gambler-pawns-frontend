"use client";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import { useChessGame } from "../../lib/hooks/useChessGame";
import { useStockfish } from "./_hooks/useStockfish";
import { useEffect, useState } from "react";
import { BLACK, Square, WHITE } from "chess.js";
import EndGameAgainsBotModal from "./_components/EndGameAgainsBotModal";
import { lanToFromTo } from "@/app/lib/utils/chessUtils";
import UserInfo from "../_components/UserInfo";
import { useSession } from "next-auth/react";

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

        const [from, to] = lanToFromTo(bestMove);

        makeMove(from, to);
        setIsProcessingMove(false);
      }
    };

    makeBotMove();
  }, [bestMove, game, makeMove, isProcessingMove, ,]);

  const { data: userData } = useSession();

  return (
    <div className="mx-auto max-w-screen-board">
      <div className="my-lg">
        <UserInfo
          isCurrentPlayer={false}
          isLoading={false}
          userData={{
            nickname: "AI Ultra Killer Bot",
            eloRating: 6666,
            countryCode: "RU",
            userAvatar: "23.png",
            timer: Infinity,
          }}
        />
      </div>

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
      <div className="my-lg">
        <UserInfo
          isCurrentPlayer
          isLoading={false}
          userData={{
            nickname: userData?.data.nickname || "Guest",
            eloRating: userData?.data.eloRapid || 1200,
            countryCode: userData?.data.countryCode || "us",
            userAvatar: userData?.data.userAvatarImg.fileName || "1.png",
            timer: Infinity,
          }}
        />
      </div>

      <div className="my-md w-full bg-secondary p-sm text-center">
        GO! Survive the AI Ultra Killer
      </div>
    </div>
  );
}
