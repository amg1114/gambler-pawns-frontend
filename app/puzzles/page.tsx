"use client";

import axios from "@/app/lib/_axios";
import { useLayoutEffect } from "react";
import { PuzzleResponse } from "../lib/interfaces/responses/puzzle-res.interface";
import { useRouter } from "next/navigation";
import PageLoadSpinner from "../ui/components/PageLoadSpinner";

export default function Page() {
  const router = useRouter();

  useLayoutEffect(() => {
    axios.get<PuzzleResponse>("/puzzle/random").then((response) => {
      const puzzle = response.data.data;

      router.push(`/puzzles/${puzzle.lichessId}`);
    });
  }, [router]);

  return <PageLoadSpinner />;
}
