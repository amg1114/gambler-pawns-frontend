import Image from "next/image";
import { nunito } from "@/app/ui/fonts";

// Importing components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import SearchUsers from "./_components/search-users";

export default function FriendsPage() {
  return (
    <div className="mt-lg">
      <section className="grid w-[715px] grid-cols-1 gap-12 lg:grid-cols-2">
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
          <div className="flex items-center justify-between bg-secondary p-sm">
            <div className="flex items-center space-x-sm pl-sm">
              <Image
                src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/7.png`}
                alt="Profile Icon"
                width={52}
                height={52}
                className="h-14 w-14"
              />
              <span className={`${nunito.className} text-lg font-light`}>
                Nombre
              </span>
            </div>
            <div className="justify-end space-x-sm pr-sm">
              <StyledButton extraClasses="py-">Play</StyledButton>
              <StyledButton style="outlined" extraClasses="py-xs">
                Delete
              </StyledButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
