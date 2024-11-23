"use client";

import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GlobalNotification({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket } = useWebSocketConnection();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("notif.new", (_data: any) => {
      setShowNotification(true);
    });
  }, [socket]);

  return (
    <>
      {showNotification && (
        <Link href="/notification">
          <div className="p-2 fixed bottom-0 left-0 right-0 bg-dark-2 text-light">
            <div className="container mx-auto">
              <p className="text-center">new notification</p>
            </div>
          </div>
        </Link>
      )}
      {children}
    </>
  );
}
