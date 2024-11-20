"use client";
import StyledTitle from "../ui/components/typography/StyledTitle";
import NotifyCard from "./components/NotifyCard";

export default function NotifyPage() {
  return (
    <>
      <div className="mt-xl w-auto grid-cols-2 gap-14 lg:grid">
        <div>
          <StyledTitle variant="h1" extraClasses="mx-auto text-center">
            LEIDAS
          </StyledTitle>
          <NotifyCard
            playerName="Jhon Doe"
            gameDescription="Chess"
            timeAgo="2 hours ago"
          />
        </div>
        <div>
          <StyledTitle variant="h1" extraClasses="mx-auto text-center">
            NO LEIDAS
          </StyledTitle>
        </div>
      </div>
    </>
  );
}
