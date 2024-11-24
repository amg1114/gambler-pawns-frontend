"use client";

import { useCallback } from "react";
import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";
import { useRouter } from "next/navigation";
import useOnlineChessGameConnection from "@/app/lib/hooks/useOnlineChessGameConnection";

export const notificationTypes = {
  WANTS_TO_PLAY: "Wants to play with you",
  ACCEPTED_TO_PLAY: "Accepted to play with you",
  WANTS_TO_JOIN_CLUB: "Wants to join club",
  MADE_A_POST: "Made a post",
  REQUEST_TO_BE_FRIEND: "Request to be your friend",
  ACCEPTED_FRIEND_REQUEST: "Accepted your friend request",
  ADMIN_OF_CLUB: "You are admin of a club now",
  SYSTEM_NOTIFICATION: "System Notification",
} as const;

export const EVENTS = {
  WANTS_TO_PLAY: {
    ACTION_1: "notif:acceptFriendGameInvite",
    ACTION_2: "notif:rejectFriendGameInvite",
  },
  REQUEST_TO_BE_FRIEND: {
    ACTION_1: "notif:acceptFriendRequest",
    ACTION_2: "notif:rejectFriendRequest",
  },
};

/**
 * Custom hook to manage WebSocket events for notifications.
 *
 * @param {number} id - The ID of the notification.
 * @param {string} actionLink1 - The action link for the first action.
 * @returns {object} - An object containing functions to accept or reject friendship requests.
 */
export default function useNotificationsWebSockets(
  id: number,
  actionLink1: string | null,
  actionLink2: string | null,
) {
  const { socket } = useWebSocketConnection();
  const router = useRouter();

  /** Hook call for handle game:start event */
  useOnlineChessGameConnection();

  /** Emits event to accept friendship. */
  const emitWebsocketAcceptFriendship = useCallback(() => {
    if (!socket) return;

    socket.emit(EVENTS.REQUEST_TO_BE_FRIEND.ACTION_1, {
      notificationId: id,
    });
  }, [socket, id]);

  /** Emits evet to reject friendship.*/
  const emitWebsocketRejectFriendship = useCallback(() => {
    if (!socket) return;

    socket.emit(EVENTS.REQUEST_TO_BE_FRIEND.ACTION_2, {
      notificationId: id,
    });
  }, [socket, id]);

  /** Emits event to accept game invite. */
  const emitWebSocketAcceptGameInvite = useCallback(() => {
    if (!socket) return;

    socket.emit(EVENTS.WANTS_TO_PLAY.ACTION_1, {
      notificationId: id,
    });
  }, [socket, id]);

  /** Emits event to reject game invite. */
  const emitWebSocketRejectGameInvite = useCallback(() => {
    if (!socket) return;

    socket.emit(EVENTS.WANTS_TO_PLAY.ACTION_2, {
      notificationId: id,
    });
  }, [socket, id]);

  /** Handles the action based on the provided Action Link 1. */
  const handleClickAction = useCallback(() => {
    if (actionLink1 === EVENTS.REQUEST_TO_BE_FRIEND.ACTION_1) {
      emitWebsocketAcceptFriendship();
      router.push("/friends");
    } else if (actionLink2 === EVENTS.REQUEST_TO_BE_FRIEND.ACTION_2) {
      emitWebsocketRejectFriendship();
      router.refresh();
    } else if (actionLink1 === EVENTS.WANTS_TO_PLAY.ACTION_1) {
      emitWebSocketAcceptGameInvite();
    } else if (actionLink2 === EVENTS.WANTS_TO_PLAY.ACTION_2) {
      emitWebSocketRejectGameInvite();
    }
  }, [
    actionLink1,
    actionLink2,
    emitWebsocketAcceptFriendship,
    emitWebsocketRejectFriendship,
    emitWebSocketAcceptGameInvite,
    emitWebSocketRejectGameInvite,
    router,
  ]);

  return {
    handleClickAction,
  };
}
