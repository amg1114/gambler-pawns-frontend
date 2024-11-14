"use client";
import { useState, useLayoutEffect, useCallback } from "react";

interface UseStockFishReturnType {
  bestMove: string | null;
  isThinking: boolean;
  evaluation: string;
  engineReady: boolean;
  analyzePosition: (fen: string, side: "w" | "b") => void;
}

/**
 * Custom hook to interact with the Stockfish chess engine.
 *
 * @returns {UseStockFishReturnType} - Returns an object containing the best move, thinking status, evaluation, engine readiness, and a function to analyze the position.
 */
export const useStockfish = (): UseStockFishReturnType => {
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [evaluation, setEvaluation] = useState<string>("");
  const [engineReady, setEngineReady] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);

  // stockfish lifecycle: create worker, initialize, analyze, terminate
  useLayoutEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const supportsCORS = "SharedArrayBuffer" in window;

    let stockfishPath = "";
    if (isMobile) {
      stockfishPath = supportsCORS
        ? "/engines/stockfish-nnue-16-no-simd.js"
        : "/engines/stockfish-nnue-16-single.js";
    } else {
      stockfishPath = supportsCORS
        ? "/engines/stockfish-nnue-16.js"
        : "/engines/stockfish-nnue-16-single.js";
    }

    const stockfish = new Worker(stockfishPath);
    setWorker(stockfish);

    /**
     * Handles messages from the Stockfish worker.
     *
     * @param {MessageEvent} event - The message event from the Stockfish worker.
     */
    stockfish.onmessage = (event: MessageEvent) => {
      const message = event.data;

      if (typeof message === "string") {
        if (message.includes("uciok")) {
          stockfish.postMessage("isready");
        } else if (message.includes("readyok")) {
          setEngineReady(true);
          setIsThinking(false);
        } else if (message.startsWith("info") && message.includes("score cp")) {
          // only process the evaluation if it corresponds to the current analysis

          const scoreMatch = message.match(/score cp (-?\d+)/);
          if (scoreMatch) {
            const score = parseInt(scoreMatch[1]) / 100;
            setEvaluation(score.toFixed(2));
          }
        } else if (message.startsWith("bestmove")) {
          // only process the best move if it corresponds to the current analysis

          const bestMoveMatch = message.match(/bestmove (\S+)/);
          if (bestMoveMatch) {
            setIsThinking(false);
            setBestMove(bestMoveMatch[1]);
          }
        }
      }
    };

    /**
     * Handles errors from the Stockfish worker.
     *
     * @param {ErrorEvent} error - The error event from the Stockfish worker.
     */
    stockfish.onerror = (error: ErrorEvent) => {
      console.error("Error from Stockfish worker:", error);
    };

    stockfish.postMessage("uci");

    return () => {
      if (stockfish) {
        stockfish.postMessage("quit");
        stockfish.terminate();
      }
    };
  }, []);

  /**
   * Analyzes the given position using Stockfish.
   *
   * @param {string} fen - The FEN string representing the position to analyze.
   * @param {"w" | "b"} side - The side to analyze for ("w" for white, "b" for black).
   */
  const analyzePosition = useCallback(
    (fen: string, side: "w" | "b") => {
      if (!worker || !engineReady) {
        console.info("Worker or engine not ready");
        return;
      }

      console.info("Starting analysis for position:", fen);

      // clean up previous analysis
      setBestMove(null);
      setIsThinking(true);

      // stop any previous analysis
      worker.postMessage("stop");

      // start new analysis
      worker.postMessage("position fen " + fen);
      worker.postMessage(
        side === "b"
          ? "setoption name UCI_Side value black"
          : "setoption name UCI_Side value white",
      );
      worker.postMessage("go depth 10");
    },
    [worker, engineReady],
  );

  return {
    bestMove,
    isThinking,
    evaluation,
    engineReady,
    analyzePosition,
  };
};
