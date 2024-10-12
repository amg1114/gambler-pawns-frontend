"use client";

import { useStockfish } from "../_hooks/useStockfish";

interface ChessAnalysisProps {
  fen: string;
}

export const ChessAnalizer: React.FC<ChessAnalysisProps> = ({ fen }) => {
  const { bestMove, isThinking } = useStockfish(fen);

  return (
    <div>
      <h2>Chess Analysis</h2>
      <p>Current FEN: {fen}</p>
      {isThinking ? (
        <p>Thinking...</p>
      ) : (
        <p>Best move: {bestMove || "Not calculated yet"}</p>
      )}
    </div>
  );
};
