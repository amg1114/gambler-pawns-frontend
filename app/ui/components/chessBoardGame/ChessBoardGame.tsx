import { useCallback, useEffect, useMemo, useState } from "react";
import { Square } from "react-chessboard/dist/chessboard/types";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const STYLE_COLORS = {
  LIGTH_SQUARES: "#edeed1",
  DARK_SQUARES: "#427119",
  SQUARE_TO_DROP: "rgba(243, 255, 79, 0.75)",
  SELECTED_SQUARE: "rgba(251, 255, 12, 0.6)",
  RIGHT_CLICKED_SQUARE: "rgba(255, 0, 0, 0.6)",
  CHECK_SQUARE: "rgba(255, 0, 0, 0.6)",
  WINNER_SQUARE: "rgba(0, 255, 0, 0.6)",
};

const getPiecePosition = (
  game: Chess,
  piece: { type: string; color: string },
): Square[] => {
  const squares: Square[] = [];
  game.board().map((row) => {
    row.map((p) => {
      if (p?.color === piece.color && p?.type === piece.type) {
        squares.push(p.square);
      }
    });
  });
  return squares;
};

interface ChessBoardGameProps {
  bgDarkSquaresColor?: string;
  bgLightSquaresColor?: string;
  side?: "white" | "black";
  position?: string; // FEN
  onDrop?: (sourceSquare: Square, targetSquare: Square) => boolean;
  arePremovesAllowed?: boolean;
  game?: Chess;
}

export function ChessBoardGame({
  bgDarkSquaresColor = STYLE_COLORS.DARK_SQUARES,
  bgLightSquaresColor = STYLE_COLORS.LIGTH_SQUARES,
  side = "white",
  position,
  onDrop,
  arePremovesAllowed,
  game,
}: ChessBoardGameProps) {
  /** Represents the currently selected piece. */
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

  /** Represents the currently selected square. */
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  /** Represents the square selected after a move (source square). */
  const [squareSelectedAfterMove, setSquareSelectedAfterMove] =
    useState<Square | null>(null);

  /** Represents the square selected before a move (target square). */
  const [squareSlectedBeforeMove, setSquareSelectedBeforeMove] =
    useState<Square | null>(null);

  /** Represents the square of the king in check. */
  const [kingInCheck, setKingInCheck] = useState<Square | null>(null);

  /** Represents the square of the winning king in checkmate. */
  const [winnerKing, setWinnerKing] = useState<Square | null>(null);

  /** Represents the square of the losing king in checkmate. */
  const [loserKing, setLoserKing] = useState<Square | null>(null);

  // Update check and mate status of the king after each move
  useEffect(() => {
    if (!game) return;
    const currentColor = game.turn();

    if (game.isCheck()) {
      setKingInCheck(
        getPiecePosition(game, { type: "k", color: currentColor })[0],
      );
    } else {
      setKingInCheck(null);
    }

    if (game.isCheckmate()) {
      const winner = currentColor === "w" ? "b" : "w";

      setWinnerKing(getPiecePosition(game, { type: "k", color: winner })[0]);
      setLoserKing(
        getPiecePosition(game, { type: "k", color: currentColor })[0],
      );
    }
  }, [game]);

  /**
   * Handles the drop event of a piece on the chessboard.
   *
   * This function is called when a piece is dropped on the chessboard. It calls the `onDrop`
   * function passed as a prop with the source and target squares. If the move is valid, it updates
   * the state to reflect the squares involved in the move.
   *
   * @param {Square} sourceSquare - The square from which the piece is moved.
   * @param {Square} targetSquare - The square to which the piece is moved.
   * @returns {boolean} - Returns true if the move is valid, otherwise false.
   */
  const innerOnDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      const result = onDrop?.(sourceSquare, targetSquare);

      if (result) {
        setSelectedSquare(null);
        setSquareSelectedAfterMove(sourceSquare);
        setSquareSelectedBeforeMove(targetSquare);
      }
      return result ?? false;
    },
    [onDrop],
  );

  /** Represents the squares that were right-clicked. */
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
      console.log("handleSquareClick", piece, selectedPiece);

      const isTryingToCaptureOpponentPieces =
        selectedPiece && piece && piece[0] !== selectedPiece[0];

      if (piece && !isTryingToCaptureOpponentPieces) {
        setSelectedPiece(piece);
        setSelectedSquare(square);
      } else if (selectedPiece && selectedSquare) {
        innerOnDrop(selectedSquare, square);
        setSelectedPiece(null);
        setSelectedSquare(null);
      }
    },
    [selectedPiece, selectedSquare, innerOnDrop],
  );

  /**
   * Handles the right-click event on a square.
   *
   * This function is called when a square on the chessboard is right-clicked. If the square
   * is already in the `rightClickedSquares` array, it removes the square from the array.
   * Otherwise, it adds the square to the array.
   *
   * @param {Square} square - The right-clicked square.
   */
  const handleRightClick = useCallback(
    (square: Square) => {
      setRightClickedSquares((prevSquares) => {
        if (prevSquares.includes(square)) {
          // if the square is already right clicked, remove it
          return prevSquares.filter((s) => s !== square);
        } else {
          // if not add it
          return [...prevSquares, square];
        }
      });
    },
    [setRightClickedSquares],
  );

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
      // TODO: obtener datos sobre las piezas de un contexto, para usar el set de piezas seleccionado por el usuario
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

    // selected squares
    if (selectedSquare) {
      styles[selectedSquare] = {
        backgroundColor: STYLE_COLORS.SELECTED_SQUARE,
      };
    }
    if (squareSelectedAfterMove) {
      styles[squareSelectedAfterMove] = {
        backgroundColor: STYLE_COLORS.SELECTED_SQUARE,
      };
    }
    if (squareSlectedBeforeMove) {
      styles[squareSlectedBeforeMove] = {
        backgroundColor: STYLE_COLORS.SELECTED_SQUARE,
      };
    }

    rightClickedSquares.forEach((square) => {
      styles[square] = {
        backgroundColor: STYLE_COLORS.RIGHT_CLICKED_SQUARE,
      };
    });

    // check / mate squares
    if (kingInCheck) {
      styles[kingInCheck] = {
        backgroundColor: STYLE_COLORS.CHECK_SQUARE,
      };
    }
    if (winnerKing) {
      styles[winnerKing] = {
        backgroundColor: STYLE_COLORS.WINNER_SQUARE,
      };
    }

    if (loserKing) {
      styles[loserKing] = {
        backgroundColor: STYLE_COLORS.CHECK_SQUARE,
      };
    }

    return styles;
  }, [
    selectedSquare,
    squareSelectedAfterMove,
    squareSlectedBeforeMove,
    rightClickedSquares,
    kingInCheck,
    winnerKing,
    loserKing,
  ]);

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
        onPieceDrop={innerOnDrop}
        customDropSquareStyle={{
          boxShadow: `inset 0 0 2px 6px ${STYLE_COLORS.SQUARE_TO_DROP}`,
        }}
        customSquareStyles={customSquareStyles}
        onSquareRightClick={handleRightClick}
        onSquareClick={handleSquareClick}
        arePremovesAllowed={arePremovesAllowed}
      />
    </div>
  );
}
