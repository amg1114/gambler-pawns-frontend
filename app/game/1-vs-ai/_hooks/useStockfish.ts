"use client";
import { useState, useEffect, useCallback } from "react";

export const useStockfish = (fen: string) => {
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [evaluation, setEvaluation] = useState<string>("");
  const [engineReady, setEngineReady] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);

  // Inicialización del worker
  useEffect(() => {
    if (typeof window === "undefined") return;

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

    stockfish.onmessage = (event: MessageEvent) => {
      const message = event.data;

      if (typeof message === "string") {
        if (message.includes("uciok")) {
          stockfish.postMessage("isready");
        } else if (message.includes("readyok")) {
          setEngineReady(true);
          setIsThinking(false);
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

    stockfish.postMessage("uci");

    return () => {
      if (stockfish) {
        stockfish.postMessage("quit");
        stockfish.terminate();
      }
    };
  }, []);

  // Función para analizar una nueva posición
  const analyzePosition = useCallback(
    (fen: string, side: "w" | "b") => {
      if (!worker || !engineReady) return;

      setBestMove(null);
      setIsThinking(true);

      worker.postMessage("stop"); // Detener análisis anterior
      worker.postMessage("position fen " + fen);

      // Configurar el motor para jugar desde la perspectiva correcta
      worker.postMessage(
        side === "b"
          ? "setoption name UCI_Side value black"
          : "setoption name UCI_Side value white",
      );
      worker.postMessage("go depth 10");
    },
    [worker, engineReady],
  );

  // Efecto para analizar la posición cuando cambia el FEN
  useEffect(() => {
    if (fen) {
      analyzePosition(fen, "b"); // Siempre analizamos desde la perspectiva de las negras
    }
  }, [fen, analyzePosition]);

  return {
    bestMove,
    isThinking,
    evaluation,
    engineReady,
    analyzePosition,
  };
};
