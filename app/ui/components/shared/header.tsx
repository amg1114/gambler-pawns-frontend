"use client";

import { useSession } from "next-auth/react";

import { auth } from "@/auth";
import { bungee } from "@/app/ui/fonts";

import Image from "next/image";
import Logo from "@/app/ui/icons/logo.svg";
import Coin from "@/app/ui/icons/coin.svg";
import Fire from "@/app/ui/icons/fire.svg";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Diversity1Rounded from "@mui/icons-material/Diversity1Rounded";

function ConditionalRendering({
    coins,
    streak,
    session,
}: {
    coins: number | undefined;
    streak: number | undefined;
    session: any;
}) {
    if (!session) {
        return (
            <div className="flex w-1/3 justify-end max-[340px]:sr-only"></div>
        );
    } else {
        return (
            <div className="flex w-1/3 justify-end max-[340px]:sr-only">
                <p className={bungee.className + " pr-xs text-base text-light"}>
                    {coins}
                </p>
                <Image
                    src={Coin}
                    alt=""
                    width={20}
                    height={20}
                    className="h-auto w-auto"
                />
                <p
                    className={
                        bungee.className + " pl-sm pr-xs text-base text-light"
                    }
                >
                    {streak}
                </p>
                <Image src={Fire} alt="" width={14.78} height={20} />
            </div>
        );
    }
}

export default function Header() {

    // Estado para controlar si el sidebar está abierto o cerrado
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Funcion para evitar parpadeo en pantallas pequeñas
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Función que alterna el estado del sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const { data: session } = useSession();

    return (
        <>
            <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b-2 border-primary bg-dark-1 p-md">
                <div className="px-sm py-sm flex w-1/3 max-[370px]:w-1/4 bg-dark-1">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button type="button" onClick={toggleSidebar} className=" inline-flex items-center p-xs text-sm text-primary rounded-base min-[1200px]:invisible hover:bg-secondary focus:outline-none focus:ring-2">
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                    </div>

                </div>

                <Image
                    src={Logo}
                    alt=""
                    width={106}
                    height={38.74}
                    className="h-auto w-auto max-[200px]:sr-only"
                />
                <ConditionalRendering
                    coins={session?.data.currentCoins}
                    streak={session?.data.streakDays}
                    session={session}
                />
            </header>

                <Sidebar isSidebarOpen={isSidebarOpen} isMounted={isMounted} />
        </>
    );
}
