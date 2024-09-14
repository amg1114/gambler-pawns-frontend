// Libs
import "/node_modules/flag-icons/css/flag-icons.min.css";

// Components
import Link from "next/link";

import StyledTitle from "../ui/components/typography/StyledTitle";
import ProfileOptionRow from "./components/ProfileOptionRow";

// Icons
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import StyledButton from "../ui/components/typography/StyledButton";

export default function ProfilePage() {
    return (
        <section className="space-y-xl">
            <header className="flex flex-wrap items-center px-md py-xl pb-md lg:justify-center lg:bg-secondary lg:py-md">
                <figure className="relative mr-md aspect-square w-24 lg:w-28">
                    {/* <img src="/images/avatar.jpg" alt="Avatar" className="w-24 h-24 rounded-full" /> */}
                    <span className="block aspect-square w-full rounded-full bg-dark-2"></span>
                    <button className="absolute bottom-0 left-2 aspect-square rounded-full bg-gray-2 p-xs text-sm">
                        <DriveFileRenameOutlineRoundedIcon className="text-t-secondary" />
                    </button>
                </figure>
                <div>
                    <StyledTitle
                        fontFamily="bungee"
                        extraClasses="flex items-center !mb-sm"
                    >
                        John Doe
                        <span className="fi fi-ps ml-md text-xl"></span>
                    </StyledTitle>
                    <StyledTitle variant="h3" extraClasses="!mb-none">
                        @Nickname
                    </StyledTitle>
                </div>
            </header>

            <section>
                <nav className="mx-auto w-full space-y-lg px-md lg:max-w-96 lg:px-none">
                    <ProfileOptionRow href="/profile">
                        <AccountCircleRoundedIcon /> Account Details
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
                    <StyledButton extraClasses="w-full" style="outlined">
                        Log out
                    </StyledButton>

                    <Link
                        href="/profile"
                        className="block w-full rounded-base border-2 border-transparent px-md py-sm text-center text-error transition-colors hover:border-error"
                    >
                        Delete account
                    </Link>
                </nav>
            </section>
        </section>
    );
}
