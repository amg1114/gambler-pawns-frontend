import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWebSocketConnection } from "./WebSocketContext";
import { Notification } from "../interfaces/responses/notify-res-interface";

interface NotificationContextType {
  newNotification: Notification | null;
  markLastNewNotificationAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

/**
 * NotificationContextProvider component that provides notification context to its children.
 *
 * @param {React.ReactNode} children - The children components that will have access to the notification context.
 * @returns {JSX.Element} The provider component that wraps the children with notification context.
 */
export const NotificationContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [newNotification, setNewNotification] = useState<Notification | null>(
    null,
  );
  const { socket } = useWebSocketConnection();

  /**
   * Handles new notifications received from the WebSocket.
   *
   * @param {any} data - The notification data received from the WebSocket.
   */
  const handleNewNotification = useCallback((data: Notification) => {
    setNewNotification(data);
  }, []);

  // listen for new notifications from the websocket
  useEffect(() => {
    if (!socket) return;

    socket.on("notif.new", handleNewNotification);

    return () => {
      socket.off("notif.new", handleNewNotification);
    };
  }, [socket, handleNewNotification]);

  /**
   * Mark last notification as read.
   */
  const markLastNewNotificationAsRead = useCallback(() => {
    setNewNotification(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        newNotification,
        markLastNewNotificationAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Custom hook to access the notification context.
 *
 * @returns {NotificationContextType} The notification context value, including the new notification and the function to mark it as read.
 * @throws {Error} If used outside of a NotificationContextProvider.
 */
export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      "useNotificationContext must be used within a NotificationContextProvider",
    );
  }
  return context;
};
