import Image from "next/image";
import { nunito } from "@/app/ui/fonts";
import Link from "next/link";

// Importing icons
import ChessTile from "@/app/ui/icons/chess-tile.svg";
import aboutIcon  from "@/app/ui/icons/aboutIcon.svg";
import clubIcon from "@/app/ui/icons/group.svg";
import homeIcon from "@/app/ui/icons/home.svg";
import store from "@/app/ui/icons/store.svg";
import ranking from "@/app/ui/icons/ranking.svg";
import aiIcon from "@/app/ui/icons/helmet.svg";
import puzzlesIcon from "@/app/ui/icons/puzzle.svg";
import arcadeIcon from "@/app/ui/icons/pacman.svg";
import avatar from "@/app/ui/icons/avatar-male.svg";
import notification from "@/app/ui/icons/notification.svg";

import StyledButton from "@/app/ui/components/typography/StyledButton";
import { useRouter } from "next/navigation";

export default function Sidebar({ isSidebarOpen, isMounted,  }: { isSidebarOpen: boolean, isMounted: boolean }) {
    
    const router = useRouter();
    const sideBarOptions = [
        {
            name: 'Home',
            link: '/home',
            image: homeIcon
        },
        {
            name: 'About',
            link: '/about',
            image: aboutIcon
        },
        {
            name: 'Ranking',
            link: '/ranking',
            image: ranking
        }
    ]

    const gameOptions = [
        {
            name: 'Classic',
            link: '/classic',
            image: ChessTile
        },
        {
            name: 'Arcade',
            link: '/arcade',
            image: arcadeIcon
        },
        {
            name: '1 VS AI',
            link: '/ai',
            image: aiIcon
        },
        {
            name: 'Puzzles',
            link: '/puzzles',
            image: puzzlesIcon
        }
    ]

    const session = false;

    if (session) {
        sideBarOptions.push(
        {
            name: 'Clubs',
            link: '/club',
            image: clubIcon
        },
        {
            name: 'Store',
            link: '/store',
            image: store
        })
    }
    const onClickLogin = () => {
        router.push('/login')
    }
    const onClickSignUp = () => {
        router.push('/register')
    }
    
    return (
        <div className="flex">
            <aside
                id="default-sidebar"
                className={`fixed h-screen ${nunito.className} top-[82px] left-0 z-40 w-52 min-[1200px]:translate-x-0 transition-transform transform bg-dark-2 border-r-2 border-t-secondary ${isMounted ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'invisible'
                    } `}
                aria-label="Sidebar"
            >
                <div className=" h-full pb-lg overflow-y-auto ">
                    {session && (
                        <>
                            <Link href="/profile" className="flex p-md w-full items-center hover:bg-secondary justify-center">
                                <Image
                                    src={avatar}
                                    alt="avatar"
                                    width={50}
                                    height={50}

                                />
                                <div className="flex flex-col p-xs">
                                    <p className="text-xl font-black">Morbid</p>
                                    <p>My profile</p>
                                </div>
                            </Link>
                            <Link href={"#"} className="flex px-lg pb-2xl w-full items-center">
                                <Image
                                    src={notification}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    className="max-h-6 pr-sm"

                                />
                                <div className="flex flex-col pr-xs">
                                    <p className="text-base px-md font-black">Notify</p>
                                    
                                </div>
                            </Link>
                        </>  
                    )}
                    <ul className="space-y-2 font-black pt-lg text-base">
                        {sideBarOptions.map((option) => (
                            <li key={option.name} className="flex  items-center px-lg">
                                <Image
                                    src={option.image}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="max-h-6  pr-sm" 
                                />
                                <a
                                    href={option.link}
                                    className=" block px-md p-sm text-md text-light hover:text-primary hover:underline hover:underline-offset-4"
                                >
                                    {option.name}
                                </a>
                            </li>
                        ))}
                        <div className="flex flex-col h-full pb-md pt-3xl overflow-y-auto ">
                            {gameOptions.map((option) => (
                                <li key={option.name} className="flex items-center pb-md px-lg">
                                    <Image
                                        src={option.image}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="max-h-6 items-center pr-sm"
                                    />
                                    <a
                                        href={option.link}
                                        className=" block p-sm text-md text-light hover:text-primary hover:underline hover:underline-offset-4"
                                    >
                                        {option.name}
                                    </a>
                                </li>
                            ))}
                        </div>
                        {!session && (
                            <>
                                <div className="px-xl p-md">
                                    <StyledButton onClick={onClickLogin} extraClasses="w-full ">
                                        Login
                                    </StyledButton>
                                </div>
                                <div className="px-xl ">
                                    <StyledButton onClick={onClickSignUp} variant="primary" style="outlined" extraClasses="w-full ">
                                        Sign Up
                                    </StyledButton>
                                </div>
                            </>
                            
                        )}  
                    </ul>
                </div>
            </aside>
        </div>
            
    )
}