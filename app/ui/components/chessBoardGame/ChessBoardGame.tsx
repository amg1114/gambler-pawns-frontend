import { useCallback, useMemo, useState } from "react";
import { Square } from "react-chessboard/dist/chessboard/types";
import { Chessboard } from "react-chessboard";

interface ChessBoardGameProps {
  bgDarkSquaresColor?: string;
  bgLightSquaresColor?: string;
  side?: "white" | "black";
  position?: string; // FEN
  onDrop?: (sourceSquare: Square, targetSquare: Square) => boolean;
  arePremovesAllowed?: boolean;
}

export function ChessBoardGame({
  bgDarkSquaresColor = "#427119",
  bgLightSquaresColor = "#edeed1",
  side = "white",
  position,
  onDrop,
  arePremovesAllowed,
}: ChessBoardGameProps) {
  /** Represents the currently selected piece. */
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  /** Represents the currently selected square. */
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  /** Represents the square that was right-clicked. */
  const [rightClickedSquares, setRightClickedSquares] = useState<Square[]>([]);

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
      setRightClickedSquares([]);

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

  const handleRightClick = useCallback(
    (square: Square) => {
      setRightClickedSquares([...rightClickedSquares, square]);
    },
    [setRightClickedSquares, rightClickedSquares],
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

  /**
   * Custom square styles.
   *
   * This constant uses `useMemo` to create custom styles for the squares based on the selected piece,
   * the king in check, and the king in checkmate. The styles are memoized to avoid unnecessary re-renders.
   */
  const customSquareStyles = useMemo(() => {
    const styles: { [key: string]: React.CSSProperties } = {};

    if (selectedSquare) {
      styles[selectedSquare] = {
        backgroundColor: "rgba(244, 246, 130, 0.6)",
      };
    }

    rightClickedSquares.forEach((square) => {
      styles[square] = {
        backgroundColor: "rgba(255, 0, 0, 0.6)",
      };
    });

    return styles;
  }, [selectedSquare, rightClickedSquares]);

  /*
  | customDropSquareStyle         | object: { boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)' }                                                                                                                                                                                                                 | inline CSS styling
  | Custom drop square style object (Square being hovered over with dragged piece). 
  */
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
        onSquareRightClick={handleRightClick}
        onSquareClick={handleSquareClick}
        customSquareStyles={customSquareStyles}
        arePremovesAllowed={arePremovesAllowed}
      />
    </div>
  );
}
