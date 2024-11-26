"use client";

import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";

export default function GlobalNotificationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket } = useWebSocketConnection();
  const [showNotification, setShowNotification] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNewNotification = useCallback((_data: any) => {
    setShowNotification(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowNotification(false);
    }, 20000); // 20 seconds
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("notif.new", handleNewNotification);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      socket.off("notif.new", handleNewNotification);
    };
  }, [socket, handleNewNotification]);

  const handleClick = () => {
    setShowNotification(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <>
      {showNotification && (
        <Link href="/notification">
          <div
            className="p-2 fixed bottom-0 left-0 right-0 bg-dark-2 text-light"
            onClick={handleClick}
          >
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
