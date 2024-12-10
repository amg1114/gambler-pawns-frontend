"use client";
import StyledTitle from "../ui/components/typography/StyledTitle";
import NotifyCard from "./_components/NotifyCard";
import axios from "@/app/lib/_axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Notification,
  UpdateNotifyResponse,
} from "../lib/interfaces/responses/notify-res-interface";
import { formatDistanceToNow } from "date-fns";

export default function NotifyPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.data?.token) {
      const token = session.data.token.replace(/^"|"$/g, "");
      axios
        .get<UpdateNotifyResponse>("/notification/get-all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setNotifications(response.data.data);
          } else {
            console.error("Unexpected response data format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [session]);

  const readNotifications = notifications.filter((n) => n.isRead);
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  return (
    <div className="mt-xl w-auto grid-cols-2 gap-14 lg:grid">
      {/* Sección de notificaciones no leídas */}
      <div>
        <StyledTitle variant="h1" extraClasses="mx-auto text-center">
          New
        </StyledTitle>
        {unreadNotifications.map((notification) => (
          <NotifyCard
            key={notification.notificationId}
            id={notification.notificationId}
            playerName={
              notification.userWhoSend.nickname ?? "System Notification"
            }
            gameDescription={notification.message}
            playerAvatar={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${
              notification.userWhoSend.userAvatarImg.fileName
                ? notification.userWhoSend.userAvatarImg.fileName
                : "1.png"
            }`}
            timeAgo={formatDistanceToNow(new Date(notification.timeStamp), {
              addSuffix: true,
            })} // Formateo de fecha
            type={notification.type}
            actionText1={notification.actionText1}
            actionText2={notification.actionText2}
            actionLink1={notification.actionLink1}
            actionLink2={notification.actionLink2}
          />
        ))}
      </div>
      {/* Sección de notificaciones leídas */}
      <div>
        <StyledTitle variant="h1" extraClasses="mx-auto text-center">
          Read
        </StyledTitle>
        {readNotifications.map((notification) => (
          <NotifyCard
            key={notification.notificationId}
            id={notification.notificationId}
            playerName={
              notification.userWhoSend.nickname ?? "System Notification"
            }
            playerAvatar={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${
              notification.userWhoSend.userAvatarImg.fileName
                ? notification.userWhoSend.userAvatarImg.fileName
                : "1.png"
            }`}
            gameDescription={notification.message}
            timeAgo={formatDistanceToNow(new Date(notification.timeStamp), {
              addSuffix: true,
            })} // Formateo de fecha
            type={notification.type}
            actionText1={notification.actionText1}
            actionText2={notification.actionText2}
            actionLink1={notification.actionLink1}
            actionLink2={notification.actionLink2}
          />
        ))}
      </div>
    </div>
  );
}
