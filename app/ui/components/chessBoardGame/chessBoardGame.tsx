import { useMemo } from "react";
import { Chessboard } from "react-chessboard";

interface ChessBoardGameProps {
    bgDarkSquaresColor?: string;
    bgLightSquaresColor?: string;
    side?: "white" | "black";
    position?: string; // FEN
}

export function ChessBoardGame({
    bgDarkSquaresColor = "#427119",
    bgLightSquaresColor = "#edeed1",
    side = "white",
    position,
}: ChessBoardGameProps) {
    // TODO: obtener formato de las piezas del contexto
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
                            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/../../productAssets/defaultChessSet/pieces/${piece}.${imgPieceFormat})`,
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
        <div>
            <Chessboard
                id="StyledBoard"
                boardOrientation={side}
                position={position}
                // onPieceDrop={onDrop}
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
            />
        </div>
    );
}
