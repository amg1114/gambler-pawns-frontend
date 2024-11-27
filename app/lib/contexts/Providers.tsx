"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { WebSocketProvider } from "./WebSocketContext";
import GlobalNotificationWrapper from "@/app/ui/components/notifications/GlobalNotificationWrapper";
import { NotificationContextProvider } from "./NotificationContext";
import { GameContextProvider } from "./GameDataContext";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <WebSocketProvider>
        <NotificationContextProvider>
          <GameContextProvider>
            <GlobalNotificationWrapper>{children}</GlobalNotificationWrapper>
          </GameContextProvider>
        </NotificationContextProvider>
      </WebSocketProvider>
    </SessionProvider>
  );
};

export default Providers;
