import { useState } from "react";
import { Snackbar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ActionButton from "./ActionButton";

export default function CopyButton({
  children,
  dialogText,
  onClick,
}: {
  children: React.ReactNode;
  dialogText: string;
  onClick(e: React.MouseEvent<HTMLButtonElement> | undefined): void;
}) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleCLick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e);

    console.log(dialogText + " was copied.");

    setSnackbarOpen(true);

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
    <>
      <ActionButton onClick={() => handleCLick()}>{children}</ActionButton>
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
    </>
  );
}
