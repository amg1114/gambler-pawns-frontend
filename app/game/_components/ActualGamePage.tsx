"use client";

import { useSearchParams } from "next/navigation";
import { ChessBoardGame } from "../../ui/components/chessBoardGame/chessBoardGame";
import { useGameConnection } from "../_hooks/useGameConnection";
import { useChessWebSocket } from "../_hooks/useChessWebSocket";
import { useChessGame } from "../_hooks/useChessGame";
import { useState } from "react";
import { formatTimeMs } from "../utils/formatTimeMs";

export default function ActualGamePage({ id }: { id: string | undefined }) {
  // get searchParams from URL
  const searchParams = useSearchParams();
  const gameMode = searchParams.get("mode");
  const playerId = searchParams.get("playerId");
  const bet = +(searchParams.get("bet") as string);
  const eloRating = 1200; // TODO: get this from token next-auth
  const timeMinutes = 5;
  const timeIncSeconds = 2;
  let gameId = undefined;

  // else get gameId from URL
  if (!searchParams.get("mode") && id !== "") {
    gameId = id;
  }

  // Hook to manage conection and reconnection
  const { socket, loading } = useGameConnection({
    gameId: gameId as string | undefined,
    playerId: playerId as string,
    gameMode: gameMode as string,
    bet,
    eloRating,
    timeMinutes,
    timeIncSeconds,
  });

  // Estado para almacenar el tiempo de los relojes
  const [playerOneTime, setPlayerOneTime] = useState(timeMinutes * 60 * 1000); // 5 minutos en ms
  const [playerTwoTime, setPlayerTwoTime] = useState(timeMinutes * 60 * 1000); // 5 minutos en ms

  // Manejar actualización del reloj
  const handleTimerUpdate = (times: {
    playerOneTime: number;
    playerTwoTime: number;
  }) => {
    setPlayerOneTime(times.playerOneTime);
    setPlayerTwoTime(times.playerTwoTime);
  };

  //Hook to validate and handle moves
  const chessGame = useChessGame("rapid", (from, to) => {
    // handling move
    makeMove(from, to);
  });

  // Hook to manage in-game events
  const { makeMove } = useChessWebSocket(
    socket,
    playerId as string,
    chessGame.updateGameFromOpponent,
    handleTimerUpdate,
  );

  // muy importante esta condición, si se cambia comienza dar errores inesperados
  // TODO: dentro del if loading, mostrar el skeleton
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-xl py-xl">
      <div>
        <div>Player 1 Time: {formatTimeMs(playerOneTime)}</div>
        <div>Player 2 Time: {formatTimeMs(playerTwoTime)}</div>
      </div>
      <ChessBoardGame
        // show local position of opponent's one
        position={chessGame.position}
        onDrop={chessGame.onDrop}
        side={JSON.parse(localStorage.getItem("gameData") as string).color}
      />
    </section>
  );
}
