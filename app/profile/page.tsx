"use client";

// Libs
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
// Components
import Link from "next/link";

import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import GameAlert from "@/app/ui/components/modals/GameAlert";

import ProfileOptionRow from "./_components/ProfileOptionRow";
import { ProfileAvatarSelect } from "./_components/ProfileAvatarSelect";

// Icons
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import UserAvatar from "../ui/components/user/UserAvatar";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [showProfileAvatarSelect, setShowProfileAvatarSelect] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (!session) {
      return;
    }
  }, [session]);

  if (status === "loading") {
    return <PageLoadSpinner />;
  }

  return (
    <>
      <section className="space-y-xl">
        <header className="flex flex-col flex-wrap items-center gap-md px-md py-xl pb-md lg:bg-secondary lg:py-md">
          <figure className="relative mr-md aspect-square w-24 lg:w-28">
            <UserAvatar filename={session?.data.userAvatarImg.fileName} />
            <button
              className="absolute bottom-0 left-2 aspect-square rounded-full bg-gray-2 p-xs text-sm"
              onClick={() => setShowProfileAvatarSelect(true)}
            >
              <DriveFileRenameOutlineRoundedIcon className="text-t-secondary" />
            </button>
          </figure>
          <div>
            <StyledTitle
              fontFamily="bungee"
              extraClasses="flex items-center !mb-sm"
            >
              {session?.data.nickname}
              <span
                className={`fi fi-${session?.data.countryCode.toLowerCase()} ml-md text-xl`}
              ></span>
            </StyledTitle>
          </div>
        </header>

        <section>
          <nav className="mx-auto w-full space-y-lg px-md lg:max-w-96 lg:px-none">
            <ProfileOptionRow href="/profile/edit">
              <AccountCircleRoundedIcon /> Edit Profile
            </ProfileOptionRow>
            <ProfileOptionRow href="/profile">
              <HistoryRoundedIcon />
              Game History
            </ProfileOptionRow>
            <ProfileOptionRow href="/profile">
              <ShowChartRoundedIcon /> User statistics
            </ProfileOptionRow>
            <ProfileOptionRow href="/profile">
              <SupervisedUserCircleRoundedIcon /> My friends
            </ProfileOptionRow>
            <ProfileOptionRow href="/profile">
              <DriveFileRenameOutlineRoundedIcon /> Customize
            </ProfileOptionRow>
          </nav>
        </section>

        <section>
          <nav className="mx-auto w-full space-y-md px-md lg:max-w-96 lg:px-none">
            <StyledButton
              extraClasses="w-full"
              style="outlined"
              onClick={() => signOut()}
            >
              Log out
            </StyledButton>

            <Link
              href="/profile"
              className="block w-full rounded-base border-2 border-transparent px-md py-sm text-center text-error transition-colors hover:border-error"
              onClick={() => setShowConfirmDialog(true)}
            >
              Delete account
            </Link>
          </nav>
        </section>
      </section>

      {showProfileAvatarSelect && session?.data ? (
        <ProfileAvatarSelect
          onClose={() => setShowProfileAvatarSelect(false)}
          userId={session?.data.userId}
          currentAvatar={session?.data.userAvatarImg.fileName}
        />
      ) : (
        <></>
      )}

      {showConfirmDialog ? (
        <GameAlert close={() => setShowConfirmDialog(false)} size="large">
          <StyledTitle variant="h4" extraClasses="text-center !mb-lg">
            Are you sure you want to delete your account?
          </StyledTitle>
          <p className="text-slate-500 text-center">
            This action is irreversible and all your data will be lost.
          </p>
          <div className="mt-xl flex justify-center gap-md">
            <StyledButton onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </StyledButton>
            <StyledButton style="outlined">Delete</StyledButton>
          </div>
        </GameAlert>
      ) : (
        <></>
      )}
    </>
  );
}
