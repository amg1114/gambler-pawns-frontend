"use client";

import axios from "@/app/lib/_axios";
import Image from "next/image";
import { nunito } from "@/app/ui/fonts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import { on } from "events";

interface userAvatarImg {
  fileName: string;
  userAvatarImgId: number;
}
interface User {
  isFriend: boolean;
  userId: number;
  nickname: string;
  userAvatarImg: userAvatarImg;
}
interface Users {
  data: User[];
}

//TODO: Create a backend endpoint to handle friend requests
const getFriendRequestsFromStorage = (): number[] => {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("friendRequests");
      return stored ? JSON.parse(stored) : [];
    }
  } catch (error) {
    console.error("Error reading friend requests from storage:", error);
  }
  return [];
};

const saveFriendRequestsToStorage = (requests: number[]) => {
  localStorage.setItem("friendRequests", JSON.stringify(requests));
};

export default function SearchUsers({
  onFriendshipChange,
}: {
  onFriendshipChange?: () => void;
}) {
  const { data: session } = useSession();
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState<Users>({ data: [] });
  const [currentPage, _setCurrentPage] = useState(1);
  const [friendRequested, setFriendRequested] = useState<number[]>(
    getFriendRequestsFromStorage(),
  );
  const { socket } = useWebSocketConnection();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const handleAddFriend = (userId: number) => {
    socket?.emit("notif:friendRequest", {
      receiverId: userId,
    });
    setFriendRequested((prev) => {
      const newRequests = [...prev, userId];
      saveFriendRequestsToStorage(newRequests);
      return newRequests;
    });
  };

  useEffect(() => {
    // Función para actualizar el estado desde localStorage
    const updateFriendRequestsFromStorage = () => {
      setFriendRequested(getFriendRequestsFromStorage());
    };

    // Escuchar cambios en el localStorage
    window.addEventListener("storage", updateFriendRequestsFromStorage);

    // También actualizar cuando cambie onFriendshipChange
    if (onFriendshipChange) {
      updateFriendRequestsFromStorage();
    }

    return () => {
      window.removeEventListener("storage", updateFriendRequestsFromStorage);
    };
  }, [onFriendshipChange]);

  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get(`/user/search?query=${searchUser}`, {
          headers: { Authorization: `Bearer ${session?.data.token}` },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching friends:", error);
        });
    };

    if (session) {
      fetchUsers();
    }
  }, [session, searchUser, currentPage, onFriendshipChange]);

  console.log(users);
  return (
    <div className="space-y-md">
      <div className="w-full">
        <StyledInput
          type="text"
          name="nickname"
          id="nickname"
          placeholder="find a new friend"
          onInput={handleSearch}
        />
      </div>

      {users.data && users.data.length > 0 ? (
        <div className="w-full space-y-md">
          {users.data.map((user, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between rounded-base bg-secondary p-sm pr-md"
            >
              <div className="flex items-center space-x-sm pl-sm">
                <Image
                  src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${user.userAvatarImg.fileName}`}
                  alt="Profile Icon"
                  width={52}
                  height={52}
                  className="h-14 w-14"
                />
                <span className={`${nunito.className} text-lg font-light`}>
                  {user.nickname}
                </span>
              </div>

              {!user.isFriend && (
                <>
                  {friendRequested?.includes(user.userId) ? (
                    <StyledButton
                      style="outlined"
                      extraClasses="py-xs justify-end px-sm opacity-50 pointer-events-none"
                      disabled
                    >
                      Request Sent
                    </StyledButton>
                  ) : (
                    <StyledButton
                      style="outlined"
                      extraClasses="py-xs justify-end px-sm"
                      onClick={() => handleAddFriend(user.userId)}
                    >
                      Add Friend
                    </StyledButton>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <StyledTitle variant="h1" extraClasses="text-center">
          No Users Found
        </StyledTitle>
      )}
    </div>
  );
}
