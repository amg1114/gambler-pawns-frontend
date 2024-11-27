"use client";

import { useNotificationContext } from "@/app/lib/contexts/NotificationContext";
import NewNotification from "./NewNotification";

export default function GlobalNotificationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { newNotification, markLastNewNotificationAsRead } =
    useNotificationContext();

  return (
    <>
      {newNotification && (
        <NewNotification
          newNotification={newNotification}
          onNotificationRead={markLastNewNotificationAsRead}
        />
      )}
      {children}
    </>
  );
}
