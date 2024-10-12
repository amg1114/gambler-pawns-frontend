"use client";
import { useState, useEffect } from "react";

/*
# Find examples of usage:

## In general:
+ https://github.com/nmrugg/stockfish.js/network/dependents (Review first)
+ https://github.com/lichess-org/stockfish.js/network/dependents
 
---

## Useful
+  https://github.com/emreozogul/chess-analyzer (nexjs project)
+ https://github.com/emreozogul/chess-analyzer/blob/main/components/StockfishAnalysis.tsx
+ https://github.com/dattatreya412/Chess-client/blob/main/src/pages/GameAnalysis.jsx#L21C1-L32C10

## Idk can be useful
+ https://www.jsdelivr.com/package/npm/stockfish.wasm
*/

export const useStockfish = (fen: string) => {
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [evaluation, setEvaluation] = useState<string>("");

  useEffect(() => {
    let stockfish: Worker | null = null;

    if (typeof window === "undefined") {
      return;
    }
    stockfish = new Worker("/public/stockfish-nnue-16.js");

    console.log("Starting engine via web worker");

    // Listen for messages from the engine and sent it back to main thread
    stockfish.onmessage = (event: MessageEvent) => {
      const message = event.data;
      console.log(message);

      if (typeof message === "string") {
        if (message.startsWith("info") && message.includes("score cp")) {
          const scoreMatch = message.match(/score cp (-?\d+)/);
          if (scoreMatch) {
            const score = parseInt(scoreMatch[1]) / 100;
            setEvaluation(score.toFixed(2));
          }
        } else if (message.startsWith("bestmove")) {
          const bestMoveMatch = message.match(/bestmove (\S+)/);
          if (bestMoveMatch) {
            setIsThinking(false);
            setBestMove(bestMoveMatch[1]);
          }
        }
      }

      stockfish.postMessage("uci");
      stockfish.postMessage("isready");
      stockfish.postMessage(`position fen ${fen}`);
      stockfish.postMessage("go depth 15");
    };
    return () => {
      if (stockfish) {
        stockfish.postMessage("quit");
        stockfish.terminate();
      }
    };
  }, [fen]);

  return {
    bestMove,
    isThinking,
    evaluation,
  };
};
