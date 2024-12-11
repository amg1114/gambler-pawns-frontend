"use client";
import StatsCard from "./_components/StatsCard";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import Fire from "@/app/ui/icons/fire.svg";
//import Arcade from "../ui/icons/arcade.svg";
import Classic from "@/app/ui/icons/classic.svg";
import { useSession } from "next-auth/react";
import FriendModal from "./_components/FriendModal";
import { useEffect, useState } from "react";
import axios from "@/app/lib/_axios";
import { FriendsHome } from "@/app/lib/interfaces/responses/friendsHome-res.interface";
import FirstTimeModal from "@/app/ui/components/modals/FirstTimeModal";
import StyledLink from "@/app/ui/components/typography/StyledLink";
import { useRouter } from "next/navigation";
import { ChessBoardGame } from "../ui/components/chessBoardGame/ChessBoardGame";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import { useWebSocketConnection } from "@/app/lib/contexts/WebSocketContext";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [friends, setFriends] = useState<FriendsHome[]>([]);
  const [totalFriends, setTotalFriends] = useState<number>(0);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const { socket } = useWebSocketConnection();

  const router = useRouter();

  useEffect(() => {
    if (session && session.data) {
      setFirstTime(false);
    }
  }, [session]);

  useEffect(() => {
    const storedFirstTime = sessionStorage.getItem("firstTime");
    if (storedFirstTime) {
      setFirstTime(JSON.parse(storedFirstTime));
    } else {
      sessionStorage.setItem("firstTime", JSON.stringify(false));
    }
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `/user/${session?.data.userId}/friends`,
        );
        setFriends(response.data.data.friends);
        setTotalFriends(response.data.data.totalFriends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (session) {
      fetchFriends();
    }
  }, [session]);

  if (status === "loading") {
    return <PageLoadSpinner />;
  }

  const handleFirstTime = () => {
    setFirstTime(false);
    sessionStorage.setItem("firstTime", JSON.stringify(false));
  };

  const handlePlay = (reciverId: number) => {
    socket?.emit("notif:friendGameInvite", {
      receiverId: reciverId,
      mode: "rapid",
      timeInMinutes: 10,
      timeIncrementPerMoveSeconds: 2,
    });
    router.push("/game");
  };

  return (
    <div className="mx-auto mt-xl w-auto grid-cols-2 gap-14 max-md:w-10/12 max-[570px]:w-auto lg:grid">
      <div className="w-auto space-y-8 pb-2xl">
        <div className="h-auto w-auto rounded-base bg-dark-2 p-md">
          <StyledTitle
            variant="h2"
            extraClasses="text-left text-slate-500 text-xl"
          >
            Welcome to Gambler Pawns
            {session?.data.nickname ? `, ${session?.data.nickname}` : ""}!
          </StyledTitle>

          <StyledParagraph extraClasses="text-left text-slate-500">
            Enjoy chess with our new features, learn more in&nbsp;
            <StyledLink
              href="/about"
              extraClasses="py-none px-none rounded-none"
            >
              about
            </StyledLink>
            .
          </StyledParagraph>
        </div>
        <ChessBoardGame />
      </div>
      <div className="w-auto space-y-8">
        <StyledTitle variant="h1" extraClasses="text-center space-y-6">
          SELECT GAME MODE
        </StyledTitle>
        <div className="space-y-4">
          <StyledButton
            variant="primary"
            style="filled"
            extraClasses="flex items-center justify-center w-full !h-12"
            onClick={() => router.push("/game-options/classic")}
          >
            Play Online (Rapid, Blitz, Bullet)
          </StyledButton>
          {/* Pagina a la que dirige hecha pero el modo de juego no esta listo 
          <StyledButton
            variant="primary"
            style="outlined"
            extraClasses="flex items-center justify-center w-full !h-12"
            onClick={() => router.push("/game-options/arcade")}
          >
            Arcade
          </StyledButton> */}
          <StyledButton
            variant="primary"
            style="filled"
            extraClasses="w-full !h-12"
            onClick={() => router.push("/game/1-vs-ai")}
          >
            Against AI
          </StyledButton>
          <StyledButton
            variant="primary"
            style="filled"
            extraClasses="w-full !h-12"
            onClick={() => router.push("/puzzles")}
          >
            Puzzles
          </StyledButton>
        </div>
        {session?.data && (
          <section className="space-y-8">
            <div className="h-auto w-auto rounded-base bg-dark-2 p-md">
              <StyledTitle variant="h3" extraClasses="text-left text-base ">
                My stats
              </StyledTitle>
              <div className="grid grid-cols-2 justify-items-center">
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
                {/* <StatsCard
                  title="Arcade"
                  imgSrc={Arcade}
                  imgAlt="Arcade Mode Icon"
                  statValue={session.data.eloArcade}
                  description="XP"
                /> */}
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
                      className="p-2 bg-dark-3 flex items-center rounded-base"
                    >
                      <FriendModal
                        avatar={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${
                          friend.userAvatarImg.fileName
                            ? friend.userAvatarImg.fileName
                            : "1.png"
                        }`}
                        flag={friend.countryCode}
                        name={friend.nickname}
                        desc={friend.aboutText}
                        classic={friend.eloRapid}
                        action={() => handlePlay(friend.userId)}
                      />
                    </div>
                  ))
                ) : (
                  <StyledParagraph>You have no friends.</StyledParagraph>
                )}
                {totalFriends > 5 && (
                  <StyledButton
                    variant="primary"
                    style="outlined"
                    extraClasses="w-16 h-16 text-white rounded-full !text-yellow"
                  >
                    {totalFriends - 5} +{" "}
                  </StyledButton>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
      {firstTime && <FirstTimeModal close={handleFirstTime} />}
    </div>
  );
}
