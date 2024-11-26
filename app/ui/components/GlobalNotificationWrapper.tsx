"use client";

import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";
import Link from "next/link";
import StyledTitle from "./typography/StyledTitle";
import StyledButton from "./typography/StyledButton";
import StyledParagraph from "./typography/StyledParagraph";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GlobalNotificationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket } = useWebSocketConnection();
  const [showNotification, setShowNotification] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [notification, setNotification] = useState<any>(null);
  const router = useRouter();

  const handleNewNotification = useCallback((_data: any) => {
    setShowNotification(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setNotification(_data);
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

  const handleViewClick = () => {
    if (notification.actionLink1) {
      router.push("/notification");
    }
  };

  return (
    console.log("DATA", notification),
    (
      <>
        {showNotification && (
          <div className="lg:scale-85 fixed bottom-0 right-0 h-auto w-auto max-w-sm transform rounded-base bg-dark-2 p-md shadow-xl transition-all duration-300 ease-in-out sm:max-w-sm sm:scale-100 md:max-w-md md:scale-100 lg:max-w-auto xl:max-w-auto xl:scale-100">
            <StyledTitle variant="h3" extraClasses="text-center">
              {notification.title}
            </StyledTitle>
            <Image
              src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${notification.userWhoSend.userAvatarImg.fileName}`}
              alt={`${notification.userWhoSend.nickname}'s avatar`}
              className="mx-auto mb-md w-2xl rounded-full"
              width={52}
              height={52}
            />
            <StyledParagraph extraClasses="text-center">
              {notification.userWhoSend.nickname} {notification.message}
            </StyledParagraph>
            <div className="flex justify-center">
              <StyledButton
                variant="primary"
                extraClasses="text-center mx-sm"
                onClick={handleViewClick}
              >
                View
              </StyledButton>
              <StyledButton
                variant="primary"
                style="outlined"
                onClick={handleClick}
              >
                Close
              </StyledButton>
            </div>
          </div>
        )}
        {children}
      </>
    )
  );
}
