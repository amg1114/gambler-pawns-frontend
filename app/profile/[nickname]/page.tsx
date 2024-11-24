"use client";

// Libs
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "@/app/lib/_axios";
import { User } from "@/app/lib/interfaces/models/user.interface";
import { UserRes } from "@/app/lib/interfaces/responses/user-res.interface";

// Components
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import UserAvatar from "@/app/ui/components/user/UserAvatar";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import ProfileOptionRow from "../_components/ProfileOptionRow";

// Icons
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import { useSession } from "next-auth/react";
import StyledLink from "@/app/ui/components/typography/StyledLink";

export default function UserProfilePage({
  params,
}: {
  params: { nickname: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    if (params.nickname) {
      axios
        .get<UserRes>(`/user/${params.nickname}`)
        .then((res) => {
          setLoading(false);
          if (res.data.statusCode === 404) {
            throw new Error("User not found");
          }
          setUser(res.data.data);
        })
        .catch((err) => {
          router.push("/404");
        });
    }
  }, [params.nickname]);

  useEffect(() => {
    if (session?.data?.nickname === user?.nickname) {
      setIsSelf(true);
    }
  }, [session, user]);

  return (
    <>
      {!loading && user ? (
        <>
          <section className="space-y-xl">
            <header className="flex flex-col flex-wrap items-center gap-md px-md py-xl pb-md lg:bg-secondary lg:py-md">
              <div className="flex items-center">
                <figure className="relative mr-md aspect-square w-24 lg:w-28">
                  <UserAvatar filename={user.userAvatarImg.fileName} />
                </figure>
                <div>
                  <StyledTitle
                    fontFamily="bungee"
                    extraClasses="flex items-center !mb-sm"
                  >
                    {user.nickname}
                    <span
                      className={`fi fi-${user.countryCode.toLowerCase()} ml-md text-xl`}
                    ></span>
                    {!isSelf && (
                      <StyledButton
                        extraClasses="ml-md text-sm !px-sm !py-none aspect-square"
                        variant="primary"
                      >
                        <PersonAddRoundedIcon className="!text-lg" />
                      </StyledButton>
                    )}
                  </StyledTitle>
                  <StyledParagraph extraClasses="!mb-none">
                    {user.aboutText || "Hey there! I'm a Gambler pawn ..."}
                  </StyledParagraph>
                </div>
              </div>
            </header>

            <section>
              <nav className="mx-auto w-full space-y-lg px-md lg:max-w-96 lg:px-none">
                <ProfileOptionRow href="/profile">
                  <HistoryRoundedIcon />
                  Game History
                </ProfileOptionRow>
                <ProfileOptionRow href={`/profile/${user.nickname}`}>
                  <ShowChartRoundedIcon /> User statistics
                </ProfileOptionRow>
                <ProfileOptionRow href={`/profile/${user.nickname}`}>
                  <SupervisedUserCircleRoundedIcon /> Friends
                </ProfileOptionRow>

                {!isSelf && (
                  <ProfileOptionRow href={`/profile/${user.nickname}`}>
                    <GroupAddRoundedIcon /> Invite to my Club
                  </ProfileOptionRow>
                )}

                {isSelf && (
                  <StyledLink
                    style="outlined"
                    href="/profile/edit"
                    extraClasses="flex items-center !p-md gap-md !w-full text-left"
                  >
                    <AccountCircleRoundedIcon /> Edit Profile
                  </StyledLink>
                )}
              </nav>
            </section>
          </section>
        </>
      ) : (
        <PageLoadSpinner />
      )}
    </>
  );
}
