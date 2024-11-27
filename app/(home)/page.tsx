"use client";
import StatsCard from "./Components/StatsCard";
import Image from "next/image";
import Board from "../ui/icons/board.svg";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "../ui/components/typography/StyledParagraph";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import Fire from "../ui/icons/fire.svg";
import Arcade from "../ui/icons/arcade.svg";
import Classic from "../ui/icons/classic.svg";
import { useSession } from "next-auth/react";
import FriendModal from "./Components/FriendModal";
import { useEffect, useState } from "react";
import axios from "@/app/lib/_axios";
import aguacate from "../ui/icons/aguacate.png";
import { FriendsHome } from "../lib/interfaces/responses/friendsHome-res.interface";
import FirstTimeModal from "@/app/ui/components/modals/FirstTimeModal";
import StyledLink from "../ui/components/typography/StyledLink";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [friends, setFriends] = useState<FriendsHome[]>([]);
  const [totalFriends, setTotalFriends] = useState<number>(0);
  const [firstTime, setFirstTime] = useState<boolean>(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session || !session.data) {
      setFirstTime(true);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `/user/${session?.data.userId}/friends`,
        );
        setFriends(response.data.data.friendsList); // Ajusta la estructura según tu API
        setTotalFriends(response.data.data.totalFriends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (session) {
      fetchFriends();
    }
  }, [session]);

  return (
    <div className="mt-xl w-auto grid-cols-2 gap-14 lg:grid">
      <div className="w-auto space-y-8">
        <div className="h-auto w-auto rounded-base bg-dark-2 p-md">
          <StyledTitle
            variant="h2"
            extraClasses="text-left text-slate-500 text-xl"
          >
            Welcome to gambler pawns {session?.data.nickname}
          </StyledTitle>
          <StyledParagraph extraClasses="text-left text-slate-500 ">
            Enjoy chess with our new features, learn more in about
          </StyledParagraph>
        </div>
        <Image src={Board} alt="" className="w-full" />
      </div>
      <div className="w-auto space-y-8">
        <StyledTitle variant="h1" extraClasses="text-center space-y-6">
          SELECT GAME MODE
        </StyledTitle>
        <div className="space-y-4">
          <StyledLink
            variant="primary"
            style="outlined"
            extraClasses="flex items-center justify-center w-full !text-light !h-12"
            href="/game-options/classic"
          >
            Single Player
          </StyledLink>
          <StyledLink
            variant="primary"
            style="filled"
            extraClasses="flex items-center justify-center w-full !text-dark-1 !h-12"
            href="/game-options/arcade"
          >
            Arcade
          </StyledLink>
          <StyledButton
            variant="primary"
            style="outlined"
            extraClasses="w-full !text-light !h-12"
          >
            Against AI
          </StyledButton>
          <StyledButton
            variant="primary"
            style="outlined"
            extraClasses="w-full !text-light !h-12"
          >
            Puzzles
          </StyledButton>
        </div>
        {session?.data ? (
          <section className="space-y-8">
            <div className="h-auto w-auto rounded-base bg-dark-2 p-md">
              <StyledTitle variant="h3" extraClasses="text-left text-base ">
                My stats
              </StyledTitle>
              <div className="grid grid-cols-3 justify-items-center">
                <StatsCard
                  title="Streak"
                  imgSrc={Fire}
                  imgAlt="Fire Streak Icon"
                  statValue={session.data.streakDays}
                  description="Days"
                />
                <StatsCard
                  title="Classic"
                  imgSrc={Classic}
                  imgAlt="Classic Mode Icon"
                  statValue={session.data.eloRapid}
                  description=""
                />
                <StatsCard
                  title="Arcade"
                  imgSrc={Arcade}
                  imgAlt="Arcade Mode Icon"
                  statValue={session.data.eloArcade}
                  description="XP"
                />
              </div>
            </div>

            <div className="h-auto w-auto rounded-base bg-dark-2 p-md">
              <StyledTitle variant="h2" extraClasses="text-left text-lg">
                Friends
              </StyledTitle>
              <div className="grid grid-flow-col">
                {friends.length ? (
                  friends.map((friend, index) => (
                    <div
                      key={index}
                      className="p-2 bg-dark-3 rounded-md flex items-center space-x-4"
                    >
                      <FriendModal
                        avatar={aguacate}
                        profileAvatar={aguacate}
                        flag={aguacate}
                        name={friend.nickname}
                        desc={friend.aboutText}
                        classic={friend.eloRapid}
                        arcade={friend.eloArcade}
                      />
                    </div>
                  ))
                ) : (
                  <StyledParagraph>You have no friends</StyledParagraph>
                )}
                {totalFriends > 5 ? (
                  <StyledButton
                    variant="primary"
                    style="outlined"
                    extraClasses="w-16 h-16 text-white rounded-full !text-yellow"
                  >
                    {totalFriends - 5} +{" "}
                  </StyledButton>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
        ) : (
          <></>
        )}
      </div>
      {firstTime ? (
        <FirstTimeModal close={() => setFirstTime(false)}> </FirstTimeModal>
      ) : (
        <></>
      )}
    </div>
  );
}
