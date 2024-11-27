"use client";

// libs
import axios from "@/app/lib/_axios";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";

import {
  Puzzle,
  PuzzleResponse,
} from "@/app/lib/interfaces/responses/puzzle-res.interface";

import { useChessGame } from "@/app/lib/hooks/useChessGame";
import { getTurnFromFen } from "@/app/lib/utils/chessUtils";
import useChessPuzzles from "./_hooks/useChessPuzzles";

// components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import ActionButton from "./_components/ActionButton";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";

export default function PuzzlePage({
  params,
}: {
  params: { lichess: string };
}) {
  const router = useRouter();

  const { loadGameFromFen, position, game, makeMove, movesHistory } =
    useChessGame();

  const {
    setMovesSolutionQueue,
    handleHint,
    onShowSolution,
    makeMoveInBoardPuzzles,
  } = useChessPuzzles(makeMove, game);

  // fetch data
  // TODO: crear un indice en la bd sobre lihessId
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (params.lichess) {
      axios
        .get<PuzzleResponse>(`/puzzle/${params.lichess}`)
        .then((response) => {
          const puzzle = response.data.data;
          setPuzzle(puzzle);
          setMovesSolutionQueue(puzzle.solution.split(" "));
          loadGameFromFen(puzzle.fen);

          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          router.push("/404");
        });
    }
  }, [loadGameFromFen, params.lichess, router, setMovesSolutionQueue]);

  // set side
  const side = useMemo(
    () => (puzzle ? getTurnFromFen(puzzle.fen) : "white"),
    [puzzle],
  );

  const handleCopy = (value: "link" | "fen") => {
    if (value === "link") {
      navigator.clipboard.writeText(window.location.href);
      return;
    }
    navigator.clipboard.writeText(puzzle!.fen);
  };

  if (loading || !puzzle) return <PageLoadSpinner />;

  return (
    <section className="mx-auto w-full space-y-md py-xl lg:max-w-[430px]">
      <StyledTitle variant="h2" fontFamily="bungee" extraClasses="text-center">
        Puzzle #{puzzle.lichessId}
      </StyledTitle>
      {/* TODO: llamar al comonente del historial de movimientos */}
      {movesHistory.length > 0 && (
        <div className="text-whites mb-md bg-secondary text-center">
          (...) 4.KNg5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+
        </div>
      )}
      <p>{puzzle.solution}</p>
      <ChessBoardGame
        side={side}
        game={game}
        onDrop={makeMoveInBoardPuzzles}
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
          onClick={onShowSolution}
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
