import { useState } from "react";
import { Move } from "chess.js";

import { Snackbar } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function RewatchControls({
  pgn,
  gameMovesIndex,
  gameMoves,
  changeIndex,
}: {
  pgn: string;
  gameMovesIndex: number;
  gameMoves: Move[];
  changeIndex: (index: number) => void;
}) {
  const [dialogText, setDialogText] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleCopy = (value: "link" | "pgn") => {
    setDialogText(value);
    setSnackbarOpen(true);

    if (value === "link") {
      navigator.clipboard.writeText(window.location.href);
    } else {
      navigator.clipboard.writeText(pgn);
    }

    if (snackbarOpen) {
      setSnackbarOpen(false);
      setTimeout(() => {
        setSnackbarOpen(true);
      }, 0);
    }

    const timeout = setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);

    return () => clearTimeout(timeout);
  };

  return (
    <div className="flex w-full flex-wrap justify-center bg-secondary p-md">
      <div className="flex w-full gap-md">
        <ActionButton
          onClick={() =>
            changeIndex(gameMovesIndex == -1 ? -1 : gameMovesIndex - 1)
          }
        >
          <NavigateBeforeIcon />
          Back
        </ActionButton>
        <div className="flex-1">
          <input
            className="mb-6 rounded-lg range-sm h-1 w-full cursor-pointer appearance-none bg-gray-2 dark:bg-gray"
            type="range"
            name="gameIndex"
            id="gameIndex"
            min={0}
            max={gameMoves.length}
            step={1}
            value={gameMovesIndex == null ? 0 : gameMovesIndex + 1}
            onChange={(e) => changeIndex(+e.target.value - 1)}
          />
        </div>
        <ActionButton
          onClick={() =>
            changeIndex(
              gameMovesIndex === gameMoves.length - 1
                ? gameMoves.length - 1
                : gameMovesIndex + 1,
            )
          }
        >
          <NavigateNextIcon />
          Forward
        </ActionButton>
      </div>
      <ActionButton onClick={() => handleCopy("link")}>
        <LinkIcon />
        Copy Link
      </ActionButton>
      <ActionButton>
        <ContentCopyIcon onClick={() => handleCopy("pgn")} />
        Copy PGN
      </ActionButton>
      <Snackbar
        open={snackbarOpen}
        message={
          <span className="gam-sm flex items-center">
            <CheckCircleIcon className="mr-sm text-success" />
            {dialogText.charAt(0).toUpperCase() + dialogText.slice(1)} was
            copied.
          </span>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
}

function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center rounded-base px-sm transition-colors hover:bg-primary hover:text-dark-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
