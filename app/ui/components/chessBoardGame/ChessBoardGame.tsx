import { useCallback, useMemo, useState } from "react";
import { Square } from "react-chessboard/dist/chessboard/types";
import { Chessboard } from "react-chessboard";

interface ChessBoardGameProps {
  bgDarkSquaresColor?: string;
  bgLightSquaresColor?: string;
  side?: "white" | "black";
  position?: string; // FEN
  onDrop?: (sourceSquare: Square, targetSquare: Square) => boolean;
}

export function ChessBoardGame({
  bgDarkSquaresColor = "#427119",
  bgLightSquaresColor = "#edeed1",
  side = "white",
  position,
  onDrop,
}: ChessBoardGameProps) {
  /** Represents the currently selected piece. */
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  /** Represents the currently selected square. */
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  /**
   * Handles the click event on a square.
   *
   * This function is called when a square on the chessboard is clicked. If a piece is present
   * on the clicked square, it sets the selected piece and square. If no piece is present and
   * a piece is already selected, it calls the `onDrop` function with the selected square and
   * the clicked square, and then clears the selected piece and square.
   *
   * @param {Square} square - The clicked square.
   * @param {string | undefined} piece - The piece on the clicked square, if any.
   */
  const handleSquareClick = useCallback(
    (square: Square, piece: string | undefined) => {
      if (piece) {
        setSelectedPiece(piece);
        setSelectedSquare(square);
      } else if (selectedPiece && selectedSquare) {
        onDrop?.(selectedSquare, square);
        setSelectedPiece(null);
        setSelectedSquare(null);
      }
    },
    [onDrop, selectedPiece, selectedSquare],
  );

  // TODO: obtener datos sobre las piezas de un contexto, para usar el set de piezas seleccionado por el usuario
  /**
   * Custom chess pieces components.
   *
   * This constant uses `useMemo` to create custom chess piece components based on the selected chess set and image format.
   * The components are memoized to avoid unnecessary re-renders.
   *
   * @type {Object.<string, React.FC<{ squareWidth: number }>>}
   */
  const customPieces: { [key: string]: React.FC<{ squareWidth: number }> } =
    useMemo(() => {
      const chessSet = "defaultChessSet";
      const imgPieceFormat = "svg";
      const pieces = [
        "wP",
        "wN",
        "wB",
        "wR",
        "wQ",
        "wK",
        "bP",
        "bN",
        "bB",
        "bR",
        "bQ",
        "bK",
      ];
      const pieceComponents: {
        [key: string]: React.FC<{ squareWidth: number }>;
      } = {};
      pieces.forEach((piece) => {
        pieceComponents[piece] = ({ squareWidth }) => (
          <div
            style={{
              width: squareWidth,
              height: squareWidth,
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/../../productAssets/${chessSet}/pieces/${piece}.${imgPieceFormat})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "80%",
            }}
          />
        );
      });
      return pieceComponents;
    }, []);

  return (
    <div className="mx-auto max-w-screen-board">
      <Chessboard
        id="StyledBoard"
        boardOrientation={side}
        position={position}
        customBoardStyle={{
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        customDarkSquareStyle={{
          backgroundColor: bgDarkSquaresColor,
        }}
        customLightSquareStyle={{
          backgroundColor: bgLightSquaresColor,
        }}
        customPieces={customPieces}
        onPieceDrop={onDrop}
        onSquareClick={handleSquareClick}
      />
    </div>
  );
}
