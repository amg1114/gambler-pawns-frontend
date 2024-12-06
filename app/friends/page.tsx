"use client";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import SearchUsers from "./_components/search-users";
import MyFriends from "./_components/my-friends";
import { useState } from "react";

export default function FriendsPage() {
  const [friendshipChangeCounter, setFriendshipChangeCounter] = useState(0);

  const handleFriendshipChange = () => {
    setFriendshipChangeCounter((prev) => prev + 1);
  };

  return (
    <div className="mt-lg grid w-[850px] grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <StyledTitle variant="h1" extraClasses="text-center">
          Search Users
        </StyledTitle>
        <SearchUsers onFriendshipChange={handleFriendshipChange} />
      </div>
      <div>
        <StyledTitle variant="h1" extraClasses="text-center">
          My Friends
        </StyledTitle>
        <MyFriends onFriendshipChange={handleFriendshipChange} />
      </div>
    </div>
  );
}
