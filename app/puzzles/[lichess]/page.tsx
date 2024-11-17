"use client";

// libs
import axios from "@/app/lib/_axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Puzzle,
  PuzzleResponse,
} from "@/app/lib/interfaces/responses/puzzle-res.interface";

// components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import ActionButton from "./components/ActionButton";

import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PuzzlePage({
  params,
}: {
  params: { lichess: string };
}) {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (params.lichess) {
      axios
        .get<PuzzleResponse>(`/puzzle/${params.lichess}`)
        .then((response) => {
          const puzzle = response.data.data;
          console.log(puzzle);
          setPuzzle(puzzle);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          router.push("/404");
        });
    }
  }, [params.lichess]);

  const handleCopy = (value: "link" | "fen") => {
    if (value === "link") {
      navigator.clipboard.writeText(window.location.href);
      return;
    }
    navigator.clipboard.writeText(puzzle!.fen);
  };

  return (
    <>
      {loading && puzzle == null ? (
        <PageLoadSpinner />
      ) : puzzle ? (
        <section className="mx-auto w-full py-xl lg:max-w-[430px]">
          <StyledTitle
            variant="h2"
            fontFamily="bungee"
            extraClasses="text-center"
          >
            Puzzle #{puzzle.lichessId}
          </StyledTitle>
          <div className="text-whites mb-md bg-secondary text-center">
            (...) 4.KNg5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+
          </div>
          <div className="mx-auto mb-xl aspect-square h-96 w-96 bg-primary"></div>
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
              onClick={() => {}}
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
      ) : (
        <PageLoadSpinner />
      )}
    </>
  );
}
