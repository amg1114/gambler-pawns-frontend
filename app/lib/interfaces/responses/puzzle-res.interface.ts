export interface PuzzleResponse {
  status: boolean;
  statusCode: number;
  path: string;
  data: Puzzle;
  timestamp: Date;
}

export interface Puzzle {
  puzzleId: number;
  lichessId: string;
  fen: string;
  solution: string;
  rating: number;
  popularity: number;
}
