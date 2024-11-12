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
+ https://github.com/Neorex80/ReactGames/blob/main/game-zone/src/Games/chess/Stockfish.js (react, muy bueno)
+ https://github.com/Vanshpanchal/Chess-Notation-Viewer (interesesante para la pagina de rewatch)
+ https://github.com/m6un/chess-analyzer/blob/main/src/app/api/uploadPgn.js interesting for evaluation
+ https://github.com/pllehrman/chess/tree/main/frontend/public/stockfish (ejemplo importando stockfish distintas versiones)
+ -> https://github.com/pllehrman/chess/blob/main/frontend/src/components/game/utilities/computerLogic.jsx excelente como implementa la logica de stockfish
+ https://github.com/DarshanIITB/chess-frontend/blob/main/src/Components/Ai.ts (intersante implementación algo minimax con chess.js)
+ https://github.com/mjanic/chessproject-nextjs/blob/stockfish-webworker/app/Board.tsx (interesante como combina la api rest de lichess con stockfish.js and feature to avoid blocking the main thread)
+ https://github.com/emreozogul/chess-analyzer/blob/main/components/StockfishAnalysis.tsx
+ https://github.com/dattatreya412/Chess-client/blob/main/src/pages/GameAnalysis.jsx#L21C1-L32C10


## Descripción de los comandos uci que acepta stockfish
+ https://github.com/official-stockfish/Stockfish/wiki/UCI-&-Commands

## Idk can be useful
+ https://www.jsdelivr.com/package/npm/stockfish.wasm
*/

export const useStockfish = (fen: string) => {
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [evaluation, setEvaluation] = useState<string>("");
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    let stockfish: Worker | null = null;

    if (typeof window === "undefined") {
      return;
    }

    stockfish = new Worker("/stockfish-nnue-16.js");
    console.log("Starting engine via web worker");

    // when engine sends a message
    stockfish.onmessage = (event: MessageEvent) => {
      const message = event.data;
      console.log("Received from Stockfish:", message);

      if (typeof message === "string") {
        if (message.includes("uciok")) {
          console.log("UCI OK received");
          stockfish?.postMessage("isready");
        } else if (message.includes("readyok")) {
          console.log("Engine is ready");
          setEngineReady(true);
          setIsThinking(true);
          stockfish?.postMessage(`position fen ${fen}`);
          stockfish?.postMessage("go depth 15");
        } else if (message.startsWith("info") && message.includes("score cp")) {
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
    };

    stockfish.onerror = (error) => {
      console.error("Error from Stockfish worker:", error);
    };

    // Initialize the engine
    stockfish.postMessage("uci");

    return () => {
      if (stockfish) {
        stockfish.postMessage("quit");
        stockfish.terminate();
      }
    };
  }, [fen]);

  useEffect(() => {
    if (engineReady) {
      console.log("Engine is ready, analyzing position");
      // You can add additional logic here if needed
    }
  }, [engineReady]);

  return {
    bestMove,
    isThinking,
    evaluation,
    engineReady,
  };
};
