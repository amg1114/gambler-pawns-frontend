import { useCallback, useEffect, useMemo, useState } from "react";
import { Square } from "react-chessboard/dist/chessboard/types";
import { Chessboard } from "react-chessboard";
import { BLACK, Chess, KING, QUEEN, ROOK, WHITE } from "chess.js";
import { promotionPiece } from "@/app/lib/hooks/useChessGame";

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
  onDrop?: (
    sourceSquare: Square,
    targetSquare: Square,
    promotionPiece: promotionPiece,
  ) => boolean;
  arePremovesAllowed?: boolean;
  game?: Chess;
  setPromotionPiece?: (piece: string) => void;
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
  const [squareSelectedBeforeMove, setSquareSelectedBeforeMove] =
    useState<Square | null>(null);

  /** Represents the square of the king in check. */
  const [kingInCheck, setKingInCheck] = useState<Square | null>(null);

  /** Represents the square of the winning king in checkmate. */
  const [winnerKing, setWinnerKing] = useState<Square | null>(null);

  /** Represents the square of the losing king in checkmate. */
  const [loserKing, setLoserKing] = useState<Square | null>(null);

  /** Represents the squares that have been right-clicked. */
  const [rightClickedSquares, setRightClickedSquares] = useState<Square[]>([]);

  /** Represents the promotion information. */
  const [promotionInfo, setPromotionInfo] = useState<{
    from: Square;
    to: Square;
  } | null>(null);

  /** Wether to manually show promotion dialog to the user */
  const [showPromotionDialogManually, setShowPromotionDialogManually] =
    useState(false);

  // Update check and mate status of the king after each move
  useEffect(() => {
    if (!game) return;
    const currentColor = game.turn();

    if (game.isCheck()) {
      setKingInCheck(
        getPiecePosition(game, { type: KING, color: currentColor })[0],
      );
    } else {
      setKingInCheck(null);
    }

    if (game.isCheckmate()) {
      const winner = currentColor === WHITE ? BLACK : WHITE;

      setWinnerKing(getPiecePosition(game, { type: KING, color: winner })[0]);
      setLoserKing(
        getPiecePosition(game, { type: KING, color: currentColor })[0],
      );
    }
  }, [game]);

  /**
   * Checks if the move is a king-side castling.
   * @returns {boolean} - Returns true if the move is a valid king-side castling, otherwise false.
   */
  const isKingSideCastling = useCallback(
    (
      sourceSquare: Square,
      targetSquare: Square,
      color: "w" | "b",
      game: Chess,
    ) => {
      return (
        sourceSquare === (color === WHITE ? "e1" : "e8") &&
        targetSquare === (color === WHITE ? "h1" : "h8") &&
        game.getCastlingRights(color).k
      );
    },
    [],
  );

  /**
   * Checks if the move is a queen-side castling.
   * @returns {boolean} - Returns true if the move is a valid queen-side castling, otherwise false.
   */
  const isQueenSideCastling = useCallback(
    (
      sourceSquare: Square,
      targetSquare: Square,
      color: "w" | "b",
      game: Chess,
    ) => {
      return (
        sourceSquare === (color === WHITE ? "e1" : "e8") &&
        targetSquare === (color === WHITE ? "a1" : "a8") &&
        game.getCastlingRights(color).q
      );
    },
    [],
  );

  /**
   * Handles the castling move.
   *
   * This function checks if the move is a king-side or queen-side castling and performs the castling move.
   * @returns {boolean} - Returns true if the castling move is valid and performed, otherwise false.
   */
  const handleCastling = useCallback(
    (
      sourceSquare: Square,
      targetSquare: Square,
      color: "w" | "b",
      onDrop: (
        sourceSquare: Square,
        targetSquare: Square,
        promotionPiece: promotionPiece,
      ) => boolean,
      game: Chess,
    ): boolean => {
      if (isKingSideCastling(sourceSquare, targetSquare, color, game)) {
        return onDrop(sourceSquare, color === WHITE ? "g1" : "g8", QUEEN);
      } else if (isQueenSideCastling(sourceSquare, targetSquare, color, game)) {
        return onDrop(sourceSquare, color === WHITE ? "c1" : "c8", QUEEN);
      }
      return false;
    },
    [isKingSideCastling, isQueenSideCastling],
  );

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
    (sourceSquare: Square, targetSquare: Square, promotionPiece?: string) => {
      if (!game || !onDrop) return false;

      // check if turn is valid
      const isInvalidTurn =
        (game.turn() === WHITE && side === "black") ||
        (game.turn() === BLACK && side === "white");

      if (isInvalidTurn) return false;

      const sourcePiece = game.get(sourceSquare);
      const targetPiece = game.get(targetSquare);

      let result = false;

      // check if the move is a castling move
      const sourceAndTargePresent = !!sourcePiece && !!targetPiece;
      const sourceAndTargetSameColor = sourcePiece.color === targetPiece.color;
      const sourceIsKing = sourcePiece.type === KING;
      const targetIsRook = targetPiece.type === ROOK;

      const isTryingToCastle =
        sourceAndTargePresent &&
        sourceAndTargetSameColor &&
        sourceIsKing &&
        targetIsRook;

      if (isTryingToCastle) {
        result = handleCastling(
          sourceSquare,
          targetSquare,
          sourcePiece.color,
          onDrop,
          game,
        );
      } else {
        result = onDrop(
          sourceSquare,
          targetSquare,
          (promotionPiece?.[1].toLowerCase() as promotionPiece) || QUEEN,
        );
      }

      if (result) {
        setSelectedSquare(null);
        setSquareSelectedAfterMove(sourceSquare);
        setSquareSelectedBeforeMove(targetSquare);
      }

      return result;
    },
    [game, handleCastling, onDrop, side],
  );

  /**
   * Handles the selection of a promotion piece.
   *
   * This function is called when a promotion piece is selected. It uses the promotion information
   * stored in the state to make the move with the selected promotion piece. runs after the move is made
   * and after `handlePromotionCheck` runs to check if the move results in a promotion.
   *
   * @param {string} [pieceSelectedToPromote] - The piece selected for promotion (e.g., "q" for queen).
   * @returns {boolean} - Returns true if the move is valid and performed, otherwise false.
   */
  const handlePromotionPieceSelect = useCallback(
    (pieceSelectedToPromote?: string) => {
      if (!promotionInfo) return false;
      // TODO: validation not working, check why
      // if the promotion piece is not selected, dont move
      if (!!pieceSelectedToPromote) return false;
      console.log(`piece selected to promote: ${pieceSelectedToPromote}`);

      const { from, to } = promotionInfo;

      const result = innerOnDrop(from, to, pieceSelectedToPromote);

      setPromotionInfo(null);
      setShowPromotionDialogManually(false);
      return result;
    },
    [promotionInfo, innerOnDrop],
  );

  /**
   * Checks if a move results in a promotion.
   *
   * This function is called to check if a move results in a promotion. If it does, it stores the promotion
   * information in the state and returns true to indicate that a promotion is needed. this function is called
   * after the move is made and before `handlePromotionPieceSelect` runs to handle the promotion piece selection.
   *
   * @param {Square} sourceSquare - The square from which the piece is moved.
   * @param {Square} targetSquare - The square to which the piece is moved.
   * @param {string} piece - The piece being moved (e.g., "wP" for white pawn).
   * @returns {boolean} - Returns true if the move results in a promotion, otherwise false.
   */
  const handlePromotionCheck = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: string) => {
      const isTryingToPromote =
        (piece === "wP" &&
          sourceSquare[1] === "7" &&
          targetSquare[1] === "8") ||
        (piece === "bP" &&
          sourceSquare[1] === "2" &&
          targetSquare[1] === "1" &&
          Math.abs(sourceSquare.charCodeAt(0) - targetSquare.charCodeAt(0)) <=
            1);

      if (!isTryingToPromote) return false;
      // TODO: validar que el cuadro de promocion no salga cuando no tiene el turno

      // save promotion info
      setPromotionInfo({
        from: sourceSquare,
        to: targetSquare,
      });
      return true;
    },
    [],
  );

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

      const isTryingToCaptureOpponentPieces =
        selectedPiece && piece && piece[0] !== selectedPiece[0];

      const isTryingToCastle =
        selectedPiece &&
        piece &&
        piece[0] === selectedPiece[0] &&
        (piece[1] === "R" || piece[1] === "K");

      const isChangingSelectedPiece =
        piece && !isTryingToCaptureOpponentPieces && !isTryingToCastle;

      const isTryingToMakeMove =
        selectedPiece && selectedSquare && !isChangingSelectedPiece;

      // is changing the selected piece
      if (isChangingSelectedPiece) {
        setSelectedPiece(piece);
        setSelectedSquare(square);
      } else if (isTryingToMakeMove) {
        // check if the current move is a promotion
        const isPromotionMove = handlePromotionCheck(
          selectedSquare,
          square,
          selectedPiece,
        );

        if (isPromotionMove) {
          // dont move, show promotion dialog
          setShowPromotionDialogManually(true);
          return;
        }

        innerOnDrop(selectedSquare, square);
        setSelectedPiece(null);
        setSelectedSquare(null);
      } else {
        // TODO: handle premoves with right click
        // add premoves to queue
        // color premoves
      }
    },
    [selectedPiece, selectedSquare, handlePromotionCheck, innerOnDrop],
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
              cursor: "grab",
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
    if (squareSelectedBeforeMove) {
      styles[squareSelectedBeforeMove] = {
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
    squareSelectedBeforeMove,
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
        onPromotionPieceSelect={handlePromotionPieceSelect}
        onPromotionCheck={handlePromotionCheck}
        showPromotionDialog={showPromotionDialogManually}
      />
    </div>
  );
}
