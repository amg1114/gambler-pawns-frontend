"use client";

import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Snackbar } from "@mui/material";

interface CopyLinkButtonProps {
  value: string;
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
      className="h-[50px] w-full items-center rounded-base bg-primary text-center text-xl font-extrabold text-dark-1 transition-colors hover:bg-secondary hover:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const CopyLinkButton = ({ value }: CopyLinkButtonProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>("");

  const handleCopy = () => {
    setDialogText("link");
    setSnackbarOpen(true);
    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);
  };

  return (
    <>
      <ActionButton onClick={handleCopy}>
        <div className="flex w-full items-center justify-between px-md">
          <span className="ml-auto mr-none text-center">
            Click to copy link
          </span>
          <ContentCopyIcon className="ml-auto h-[34px] w-[34px]" />
        </div>
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
    </>
  );
};

export default CopyLinkButton;
