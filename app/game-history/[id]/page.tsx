"use client";

// libs
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Move } from "chess.js";

import axios from "@/app/lib/_axios";
import { useChessGame } from "@/app/lib/hooks/useChessGame";

import {
  RewatchGameRes,
  RewatchGame,
} from "@/app/lib/interfaces/responses/rewatch-res.interface";

// components
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import RewatchControls from "./_components/RewatchControls";
import UserInfo, { userDataInterface } from "@/app/game/_components/UserInfo";
import { useGameRewatch } from "./_hooks/useGameRewacth";
import MovesHistory from "@/app/ui/components/chessBoardGame/MovesHistory";

export default function GameHistoryPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { position, game, makeMove, movesHistory, loadGameFromPgn } =
    useChessGame();
  const { formatPlayersData } = useGameRewatch();

  const [gameRewatch, setGameRewatch] = useState<RewatchGame | null>(null);
  const [gameMovesIndex, setGameMovesIndex] = useState<number | null>(null);
  const [gameMoves, setGameMoves] = useState<Move[]>([]);

  const [currentPlayer, setCurrentPlayer] = useState<userDataInterface | null>(
    null,
  );
  const [opponentPlayer, setOpponentPlayer] =
    useState<userDataInterface | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get<RewatchGameRes>(
          `/game/rewatch/${params.id}`,
        );
        const { currentPlayer, opponentPlayer } = formatPlayersData(
          res.data.data,
        );

        setCurrentPlayer(currentPlayer);
        setOpponentPlayer(opponentPlayer);
        setGameRewatch(res.data.data);
        loadGameFromPgn(res.data.data.pgn);
      } catch (err) {
        console.error(err);
        router.push("/404");
      }
    };

    fetchGame();
  }, [formatPlayersData, loadGameFromPgn, params.id, router]);

  useEffect(() => {
    if (gameMoves.length == 0) {
      setGameMoves(game.history({ verbose: true }));
      setGameMovesIndex(movesHistory.length - 1);
    }
  }, [game, gameMoves.length, movesHistory.length]);

  const handleIndexChange = (index: number) => {
    if (index == gameMovesIndex) return;
    if ((gameMovesIndex && index < gameMovesIndex) || index == -1) {
      game.undo();
    } else {
      const { from, to } = gameMoves[index];
      makeMove(from, to);
    }
    setGameMovesIndex(index);
  };

  if (!gameRewatch) return <PageLoadSpinner />;

  return (
    <section className="mx-auto mt-xl w-full max-w-[910px]">
      <div className="flex flex-wrap gap-xl">
        <div className="w-full shrink-0 md:max-w-screen-board">
          <div className="mb-lg">
            <UserInfo
              isLoading={false}
              userData={opponentPlayer!}
              isCurrentPlayer={false}
            />
          </div>
          <div className="mx-auto max-w-screen-board">
            <ChessBoardGame game={game} position={position} onDrop={makeMove} />
          </div>

          <div className="mt-lg">
            <UserInfo
              isLoading={false}
              userData={currentPlayer!}
              isCurrentPlayer={true}
            />
          </div>
        </div>
        <div className="flex-1">
          <MovesHistory movesHistory={movesHistory} extraClasses="mb-md" />

          <RewatchControls
            pgn={gameRewatch?.pgn || ""}
            gameMovesIndex={gameMovesIndex!}
            gameMoves={gameMoves}
            changeIndex={handleIndexChange}
          />
        </div>
      </div>
    </section>
  );
}
