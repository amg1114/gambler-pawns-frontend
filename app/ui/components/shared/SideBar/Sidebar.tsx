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

// components
import Image from "next/image";
import Link from "next/link";
import { nunito } from "@/app/ui/fonts";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import UserInfoSideBar from "./UserInfoSideBar";

export default function Sidebar({
  isSidebarOpen,
  isMounted,
  session,
}: {
  isSidebarOpen: boolean;
  isMounted: boolean;
  session: Session | null;
}) {
  const router = useRouter();
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
    );
  }
  const onClickLogin = () => {
    router.push("/login");
  };
  const onClickSignUp = () => {
    router.push("/register");
  };

  return (
    <div className="flex">
      <aside
        id="default-sidebar"
        className={`fixed h-full ${nunito.className} left-0 top-[82px] z-40 w-max transform border-r-2 border-t-secondary bg-dark-2 transition-transform min-[1200px]:translate-x-0 ${
          isMounted
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "invisible"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto pb-lg">
          {session && <UserInfoSideBar session={session} />}
          <ul className="space-y-2 pt-lg text-base font-black">
            {sideBarOptions.map((option) => (
              <li key={option.name}>
                <Link href={option.link} className="flex items-center px-lg">
                  <Image
                    src={option.image}
                    alt={`icon of ${option.name}`}
                    width={40}
                    height={40}
                    className="max-h-6 pr-sm"
                  />
                  <span className="text-md block p-sm px-md text-light hover:text-primary hover:underline hover:underline-offset-4">
                    {option.name}
                  </span>
                </Link>
              </li>
            ))}
            <div className="flex h-full flex-col overflow-y-auto pb-md">
              {gameOptions.map((option) => (
                <li key={option.name} className="flex items-center px-lg pb-md">
                  <Image
                    src={option.image}
                    alt=""
                    width={40}
                    height={40}
                    className="max-h-6 items-center pr-sm"
                  />
                  <a
                    href={option.link}
                    className="text-md block p-sm text-light hover:text-primary hover:underline hover:underline-offset-4"
                  >
                    {option.name}
                  </a>
                </li>
              ))}
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
