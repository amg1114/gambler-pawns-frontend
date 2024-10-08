import { useMemo } from "react";
import { Square } from "react-chessboard/dist/chessboard/types";
import { Chessboard } from "react-chessboard";
import StyledTitle from "../typography/StyledTitle";

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
  // TODO: obtener datos sobre las piezas de un contexto
  const chessSet = "defaultChessSet";
  const imgPieceFormat = "svg";
  const customPieces: { [key: string]: React.FC<{ squareWidth: number }> } =
    useMemo(() => {
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
      <StyledTitle variant="h2" fontFamily="bungee" extraClasses="text-center">
        Chess Board
      </StyledTitle>
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
      />
    </div>
  );
}
