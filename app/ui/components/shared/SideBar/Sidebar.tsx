import { useRouter } from "next/navigation";
import { Session } from "next-auth";

// Importing icons
import ChessTile from "@/app/ui/icons/chess-tile.svg";
import aboutIcon from "@/app/ui/icons/aboutIcon.svg";
import clubIcon from "@/app/ui/icons/group.svg";
import homeIcon from "@/app/ui/icons/home.svg";
// import store from "@/app/ui/icons/store.svg";
// import ranking from "@/app/ui/icons/ranking.svg";
import aiIcon from "@/app/ui/icons/helmet.svg";
import puzzlesIcon from "@/app/ui/icons/puzzle.svg";
// import arcadeIcon from "@/app/ui/icons/pacman.svg";
import historyIcon from "@/app/ui/icons/history-icon.svg";

// components
import Image from "next/image";
import Link from "next/link";
import { nunito } from "@/app/ui/fonts";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import UserInfoSideBar from "./UserInfoSideBar";


// 
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from '@mui/icons-material/Close';
import useSidebarToggle from "../_hooks/useSidebarToggle";
import { useState } from "react";

const gameOptions = [
  {
    name: "Classic",
    link: "/game-options/classic",
    image: ChessTile,
  },
  // {
  //   name: "Arcade",
  //   link: "/game-options/arcade",
  //   image: arcadeIcon,
  // },
  {
    name: "1 VS AI",
    link: "game/1-vs-ai",
    image: aiIcon,
  },
  {
    name: "Puzzles",
    link: "/puzzles",
    image: puzzlesIcon,
  },
];



export default function Sidebar({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useSidebarToggle(isSidebarOpen, setIsSidebarOpen);
  const sideBarOptions = [
    {
      name: "Home",
      link: "/",
      image: homeIcon,
    },
    {
      name: "About",
      link: "/about",
      image: aboutIcon,
    },
    // {
    //   name: "Ranking",
    //   link: "/ranking",
    //   image: ranking,
    // },
  ];

  if (session) {
    sideBarOptions.push(
      {
        name: "Friends",
        link: "/friends",
        image: clubIcon,
      },
      // {
      //   name: "Store",
      //   link: "/store",
      //   image: store,
      // },
      {
        name: "History",
        link: "/game/history",
        image: historyIcon,
      },
    );
  }
  const onClickLogin = () => {
    router.push("/login");
  };
  const onClickSignUp = () => {
    router.push("/register");
  };
  
  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  }
  
  return (
    <div className="flex w-full z-10 " id="sidebar-toggle">
      <button
        type="button"
        onClick={toggleSideBar}
        className="inline-flex z-10 items-center rounded-base text-sm text-primary hover:bg-secondary focus:outline-none focus:ring-2 min-[1400px]:invisible"
      >
        {isSidebarOpen ? <CloseIcon fontSize="large" /> : <MenuRoundedIcon fontSize="large" />}
      </button>
      <aside
        id="default-sidebar"
        className={`fixed h-full ${nunito.className} border-r-primary border-t-2 shadow-[rgba(0,0,15,0.5)_10px_5px_0px_0px] left-0 top-[69px] z-40 w-[210px] transform border-t-secondary bg-dark-2 transition-transform min-[1400px]:translate-x-0 ${isSidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
          } `}
        aria-label="Sidebar"
      >
        <div className="flex flex-col overflow-y-auto pb-lg">
          {session && <UserInfoSideBar session={session} />}
          <ul className="space-y-1 text-base font-black">
            {sideBarOptions.map((option) => (
              <li key={option.name}>
                <Link href={option.link} className="flex items-center px-lg hover:text-primary hover:underline hover:underline-offset-4 hover:text-lg hover:duration-300">
                  <Image
                    src={option.image}
                    alt={`icon of ${option.name}`}
                    width={40}
                    height={40}
                    className="max-h-6 items-center pr-sm "
                  />
                  <span className="text-md block p-sm px-md  ">
                    {option.name}
                  </span>
                </Link>
              </li>
            ))}
              {gameOptions.map((option) => (
                <li key={option.name}>
                  <Link href={option.link} className="flex items-center px-lg hover:text-primary hover:underline hover:underline-offset-4 hover:text-lg hover:duration-300">
                    <Image
                      src={option.image}
                      alt={`icon of ${option.name}`}
                      width={40}
                      height={40}
                      className="max-h-6 items-center pr-sm"
                    />
                    <span
                      className="text-md block p-sm px-md  "
                    >
                      {option.name}
                    </span>
                  </Link>
                </li>
              ))}
            <div className="flex flex-col overflow-y-auto pb-lg">
            </div>
            {!session && (
              <>
                <div className="p-md px-xl">
                  <StyledButton onClick={onClickLogin} extraClasses="w-full ">
                    Login
                  </StyledButton>
                </div>
                <div className="px-xl">
                  <StyledButton
                    onClick={onClickSignUp}
                    variant="primary"
                    style="outlined"
                    extraClasses="w-full "
                  >
                    Sign Up
                  </StyledButton>
                </div>
              </>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}