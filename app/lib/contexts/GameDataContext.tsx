import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  readFromSessionStorage,
  writeToSessionStorage,
} from "../utils/sessionStorageUtils";
import { useWebSocketConnection } from "../contexts/WebSocketContext";
import { GameData } from "../interfaces/responses/gameData.interface";

interface GameContextType {
  gameData: GameData | null;
  setGameData: (data: GameData) => void;
}

// TODO: refactorizar componentes para que usen el gameData del contexto y no de sessionStorage
const GameContext = createContext<GameContextType | null>(null);

/**
 * GameContextProvider component that provides game context to its children.
 *
 * @param {React.ReactNode} children - The children components that will have access to the game context.
 * @returns {JSX.Element} The provider component that wraps the children with game context.
 */
export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameData, setGameData] = useState<GameData | null>(
    readFromSessionStorage("gameData"),
  );
  const router = useRouter();
  const { socket } = useWebSocketConnection();

  /**
   * Handles the game started event.
   *
   * This function is called when the "game:started" event is received from the WebSocket.
   * It writes the game data to session storage and redirects the user to the game page.
   *
   * @param {GameData} data - The game data received from the WebSocket.
   */
  const handleGameStarted = useCallback(
    (data: GameData) => {
      writeToSessionStorage("gameData", data);
      setGameData(data);
      router.replace(`/game/${data.gameId}`);
    },
    [router],
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("game:started", handleGameStarted);
    // cleanup socket listeners when component unmounts
    return () => {
      socket.off("game:started", handleGameStarted);
    };
  }, [socket, handleGameStarted]);

  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      {children}
    </GameContext.Provider>
  );
};

/**
 * Custom hook to access the game context.
 *
 * @returns {GameContextType} The game context value, including the game data and the function to set it.
 * @throws {Error} If used outside of a GameContextProvider.
 */
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
