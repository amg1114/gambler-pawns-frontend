"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { WebSocketProvider } from "./WebSocketContext";
import GlobalNotification from "@/app/ui/components/GlobalNotificationWrapper";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <WebSocketProvider>
        <GlobalNotification>{children}</GlobalNotification>
      </WebSocketProvider>
    </SessionProvider>
  );
};

export default Providers;
