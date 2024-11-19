"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { WebSocketProvider } from "./WebSocketContext";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <WebSocketProvider>{children}</WebSocketProvider>
    </SessionProvider>
  );
};

export default Providers;
