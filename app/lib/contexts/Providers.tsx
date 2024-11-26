"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { WebSocketProvider } from "./WebSocketContext";
import GlobalNotificationWrapper from "@/app/ui/components/notifications/GlobalNotificationWrapper";
import { NotificationContextProvider } from "./NotificationContext";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <WebSocketProvider>
        <NotificationContextProvider>
          <GlobalNotificationWrapper>{children}</GlobalNotificationWrapper>
        </NotificationContextProvider>
      </WebSocketProvider>
    </SessionProvider>
  );
};

export default Providers;
