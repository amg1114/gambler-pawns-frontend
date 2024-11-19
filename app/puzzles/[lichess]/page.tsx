"use client";

// libs
import axios from "@/app/lib/_axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Puzzle,
  PuzzleResponse,
} from "@/app/lib/interfaces/responses/puzzle-res.interface";

import { useChessGame } from "@/app/lib/hooks/useChessGame";

// components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import ActionButton from "./components/ActionButton";

import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import { Square, WHITE } from "chess.js";

export default function PuzzlePage({
  params,
}: {
  params: { lichess: string };
}) {
  // TODO: crear un useFetch hook para peticiones get
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { loadGameFromFen, position, game, makeMove, movesHistory } =
    useChessGame({});

  // TODO: crear un indice en la bd sobre lihessId

  useEffect(() => {
    if (params.lichess) {
      axios
        .get<PuzzleResponse>(`/puzzle/${params.lichess}`)
        .then((response) => {
          const puzzle = response.data.data;
          console.log(puzzle);
          setMovesSolutionQueue(puzzle.solution.split(" "));
          setPuzzle(puzzle);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          router.push("/404");
        });
    }
  }, [params.lichess, router]);

  useEffect(() => {
    if (puzzle) {
      loadGameFromFen(puzzle.fen);
    }
  }, [puzzle, loadGameFromFen]);

  // TODO: podría haber un custom hook para la cola de movimientos
  // TODO: el callback que obtiene el side dado un fen se podria meter en un utility o un hook
  const side = useMemo(
    () => (puzzle?.fen.split(" ")[1] === WHITE ? "white" : "black"),
    [puzzle],
  );

  const handleCopy = (value: "link" | "fen") => {
    if (value === "link") {
      navigator.clipboard.writeText(window.location.href);
      return;
    }
    navigator.clipboard.writeText(puzzle!.fen);
  };

  const [movesSolutionQueue, setMovesSolutionQueue] = useState<string[]>([]);

  const handleMove = useCallback(() => {
    // if is empty puzzle is solved
    // handle this case
    if (movesSolutionQueue.length < 2) return;

    const [move1, ...rest] = movesSolutionQueue;

    const [from, to] = [
      move1.slice(0, 2) as unknown as Square,
      move1.slice(2, 4) as unknown as Square,
    ];
    console.log("from", from, "to", to);
    makeMove(from, to);

    setMovesSolutionQueue(rest);
  }, [makeMove, movesSolutionQueue]);
  // TODO: opponent response

  const handleHint = useCallback(() => {
    handleMove();
    // TODO: opponent response
    setTimeout(() => {
      handleMove();
    }, 100);
  }, [handleMove]);

  if (loading || !puzzle) return <PageLoadSpinner />;

  return (
    <section className="mx-auto w-full space-y-md py-xl lg:max-w-[430px]">
      <StyledTitle variant="h2" fontFamily="bungee" extraClasses="text-center">
        Puzzle #{puzzle.lichessId}
      </StyledTitle>
      {/* TODO: llamar al comonente del historial de movimientos */}
      <div className="text-whites mb-md bg-secondary text-center">
        (...) 4.KNg5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+
      </div>
      <p>{puzzle.solution}</p>
      <ChessBoardGame
        side={side}
        game={game}
        onDrop={makeMove}
        position={position}
      />
      <div className="flex justify-center gap-8 bg-secondary py-md text-white">
        <ActionButton
          label={
            <>
              Copy <br />
              Link
            </>
          }
          icon={<LinkIcon className="h-8 w-8" />}
          onClick={() => handleCopy("link")}
        />
        <ActionButton
          label={
            <>
              Copy <br />
              Fen
            </>
          }
          icon={<ContentCopyIcon className="h-8 w-8" />}
          onClick={() => handleCopy("fen")}
        />
        <ActionButton
          label={
            <>
              Show <br />
              Solution
            </>
          }
          icon={<InfoIcon className="h-8 w-8" />}
          onClick={() => {}}
        />
        <ActionButton
          label={
            <>
              Hint 1 <br />
              Move
            </>
          }
          icon={<LightbulbIcon className="h-8 w-8" />}
          onClick={handleHint}
        />
        <ActionButton
          label={
            <>
              Skip <br />
              Puzzle
            </>
          }
          icon={<NavigateNextIcon className="h-8 w-8" />}
          onClick={() => router.push("/puzzles")}
        />
      </div>
    </section>
  );
}
