"use client";
import { ChessAnalizer } from "./_components/ChessAnalizer";

export default function BotPage() {
  return (
    <div className="p-4 container mx-auto">
      <ChessAnalizer fen={"4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1"} />
    </div>
  );
}
