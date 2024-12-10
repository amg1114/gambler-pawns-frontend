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
import ActionButton from "@/app/ui/components/forms/ActionButton";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ChessBoardGame } from "@/app/ui/components/chessBoardGame/ChessBoardGame";
import MovesHistory from "@/app/ui/components/chessBoardGame/MovesHistory";
import EndPuzzleModal from "./_components/EndPuzzleModal";
import CopyButton from "@/app/ui/components/forms/CopyButton";

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
    hasGameEnded,
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

  const [shouldShowSolution, setShouldShowSoultion] = useState(false);

  const handleShowSolution = () => {
    setShouldShowSoultion(true);
    onShowSolution();
  };

  if (loading || !puzzle) return <PageLoadSpinner />;

  return (
    <section className="mx-auto w-full space-y-md py-xl lg:max-w-[430px]">
      <StyledTitle variant="h2" fontFamily="bungee" extraClasses="text-center">
        Puzzle #{puzzle.lichessId}
      </StyledTitle>
      <MovesHistory extraClasses="mt-lg" movesHistory={movesHistory} />
      {shouldShowSolution && (
        <p className="text-center text-lg">{`solution: ${puzzle.solution}`}</p>
      )}
      <div className="mx-auto max-w-screen-board">
        <ChessBoardGame
          side={side}
          game={game}
          onDrop={makeMoveInBoardPuzzles}
          position={position}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-0 bg-secondary py-md text-sm text-white">
        <CopyButton dialogText="Link" onClick={() => handleCopy("link")}>
          <LinkIcon />
          Copy Link
        </CopyButton>
        <CopyButton dialogText="Fen" onClick={() => handleCopy("fen")}>
          <ContentCopyIcon />
          Copy FEN
        </CopyButton>
        <ActionButton onClick={handleShowSolution}>
          <InfoIcon />
          Show Solution
        </ActionButton>
        <ActionButton onClick={handleHint}>
          <LightbulbIcon />
          <span>
            Hint 1<br /> Move
          </span>
        </ActionButton>
        <ActionButton onClick={() => router.push("/puzzles")}>
          <NavigateNextIcon /> Skip Puzzle
        </ActionButton>
      </div>
      {hasGameEnded && <EndPuzzleModal />}
    </section>
  );
}
