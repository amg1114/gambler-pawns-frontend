// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import SearchUsers from "./_components/search-users";
import MyFriends from "./_components/my-friends";

export default function FriendsPage() {
  return (
    <div className="mt-lg grid w-[850px] grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <StyledTitle variant="h1" extraClasses="text-center">
          Search Users
        </StyledTitle>
        <SearchUsers />
      </div>
      <div>
        <StyledTitle variant="h1" extraClasses="text-center">
          My Friends
        </StyledTitle>
        <MyFriends />
      </div>
    </div>
  );
}
