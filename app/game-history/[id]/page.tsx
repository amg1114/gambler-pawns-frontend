"use client";

// libs
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "@/app/lib/_axios";
import { useChessGame } from "@/app/lib/hooks/useChessGame";
import { lanToFromTo } from "@/app/lib/utils/chessUtils";

import {
  RewatchGameRes,
  RewatchGame,
} from "@/app/lib/interfaces/responses/rewatch-res.interface";

// components
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import RewatchControls from "./components/RewatchControls";

export default function GameHistoryPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { position, game, makeMove, movesHistory, loadGameFromPgn } =
    useChessGame();

  const [gameRewatch, setGameRewatch] = useState<RewatchGame | null>(null);
  const [gameMovesIndex, setGameMovesIndex] = useState<number | null>(null);
  const [gameMoves, setGameMoves] = useState<string[]>([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get<RewatchGameRes>(
          `/game/rewatch/${params.id}`,
        );
        setGameRewatch(res.data.data);
        loadGameFromPgn(res.data.data.pgn);
      } catch (err) {
        console.log(err);
        router.push("/404");
      }
    };

    fetchGame();
  }, [params.id, router]);

  useEffect(() => {
    if (gameMoves.length == 0) {
      setGameMoves(movesHistory);
      setGameMovesIndex(movesHistory.length - 1);
    }
  }, [game]);

  const handleIndexChange = (index: number) => {
    if (index == gameMovesIndex) return;
    if (gameMovesIndex && index < gameMovesIndex) {
      game.undo();
    } else {
      const [from, to] = lanToFromTo(gameMoves[index]);
      makeMove(from, to);
    }
    setGameMovesIndex(index);
  };

  if (!game) return <PageLoadSpinner />;

  return (
    <section className="mx-auto mt-xl w-full max-w-[910px]">
      <div className="flex gap-xl">
        <div className="w-full max-w-screen-board shrink-0">
          <StyledTitle>Rewatch game #{params.id}</StyledTitle>
          <ChessBoardGame game={game} position={position} onDrop={makeMove} />
        </div>
        <div className="flex-1">
          {movesHistory.length > 0 && (
            <div className="text-whites mb-md bg-secondary text-center">
              (...) 4.KNg5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+
            </div>
          )}
          <RewatchControls
            pgn={gameRewatch?.pgn || ""}
            gameMovesIndex={gameMovesIndex}
            gameMoves={gameMoves}
            changeIndex={handleIndexChange}
          />
        </div>
      </div>
    </section>
  );
}
