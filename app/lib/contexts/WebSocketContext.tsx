import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { generatePlayerIdForGuest } from "../utils/players.utils";

interface WebSocketContextType {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

/**
 * WebSocketProvider component that provides a WebSocket connection to its children.
 *
 * @param {React.ReactNode} children - The children components that will have access to the WebSocket connection.
 * @returns {JSX.Element} The provider component that wraps the children with WebSocket context.
 */
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //socket connection
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    let playerId = session?.user?.id;

    // if user is guest, generate playerId for guest and store it in localStorage
    if (!playerId) {
      // Check if playerId exists in localStorage
      playerId = localStorage.getItem("guestPlayerId") || undefined;

      if (!playerId) {
        // Generate a new playerId for guest and store it in localStorage
        playerId = generatePlayerIdForGuest();
        localStorage.setItem("guestPlayerId", playerId);
      }
    }

    const options = {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: session ? session.data.token.replace(/^"|"$/g, "") : "",
        playerId,
      },
    };

    const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL, {
      ...options,
    });

    socketInstance.io.on("reconnect", (attempt) => {
      console.log("Reconnected on attempt:", attempt);
      socketInstance.emit("user:reconnected", {});
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [session]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

/**
 * Custom hook to access the WebSocket context.
 *
 * @returns {WebSocketContextType} The WebSocket context value, including the socket instance.
 * @throws {Error} If used outside of a WebSocketProvider.
 */
export const useWebSocketConnection = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
