"use client";

import Image from "next/image";
import { nunito } from "@/app/ui/fonts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/app/lib/_axios";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";
import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";

interface userAvatarImg {
  fileName: string;
  userAvatarImgId: number;
}

export interface Friends {
  userId: number;
  nickname: string;
  userAvatarImg: userAvatarImg;
  aboutText: string;
  eloRapid: number;
  eloArcade: number;
}

export default function MyFriends({
  onFriendshipChange,
}: {
  onFriendshipChange?: () => void;
}) {
  const { data: session } = useSession();
  const [friends, setFriends] = useState<Friends[]>([]);
  const [currentPage, _setCurrentPage] = useState(1);
  const { socket } = useWebSocketConnection();
  const router = useRouter();

  const handlePlay = (reciverId: number) => {
    socket?.emit("notif:friendGameInvite", {
      receiverId: reciverId,
      mode: "rapid",
      timeInMinutes: 10,
      timeIncrementPerMoveSeconds: 2,
    });
    router.push("/game");
  };

  const handleDelete = (friendId: number) => {
    axios
      .post(
        `/user/remove-friend`,
        { friendId: friendId },
        {
          headers: { Authorization: `Bearer ${session?.data.token}` },
        },
      )
      .then((response) => {
        console.log("Friend deleted:", response);

        const storedRequests = localStorage.getItem("friendRequests");
        if (storedRequests) {
          const requests = JSON.parse(storedRequests);
          const updatedRequests = requests.filter(
            (id: number) => id !== friendId,
          );
          localStorage.setItem(
            "friendRequests",
            JSON.stringify(updatedRequests),
          );
        }

        setFriends(friends.filter((friend) => friend.userId !== friendId));
        onFriendshipChange?.(); // Llamar a la función de recarga
      })
      .catch((error) => {
        console.error("Error deleting friend:", error);
      });
  };

  useEffect(() => {
    const fetchFriends = async () => {
      await axios
        .get(`/user/${session?.data.userId}/friends`)
        .then((response) => {
          setFriends(response.data.data.friendsList);
        })
        .catch((error) => {
          console.error("Error fetching friends:", error);
        });
    };

    if (session) {
      fetchFriends();
    }
  }, [session, currentPage]);
  console.log(friends);
  return (
    <div>
      {friends && friends.length ? (
        <div className="space-y-md">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between rounded-base bg-secondary p-sm pr-md"
            >
              <div className="flex items-center space-x-sm pl-sm">
                <Image
                  src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${friend.userAvatarImg.fileName}`}
                  alt="Profile Icon"
                  width={52}
                  height={52}
                  className="h-14 w-14"
                />
                <span className={`${nunito.className} text-lg font-light`}>
                  {friend.nickname}
                </span>
              </div>
              <div className="flex justify-end space-x-sm">
                <StyledButton
                  style="filled"
                  extraClasses="p-sm"
                  onClick={() => handlePlay(friend.userId)}
                >
                  Play
                </StyledButton>
                <StyledButton
                  style="outlined"
                  extraClasses="pd-sm"
                  onClick={() => handleDelete(friend.userId)}
                >
                  Delete
                </StyledButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No friends found.</p>
      )}
    </div>
  );
}
