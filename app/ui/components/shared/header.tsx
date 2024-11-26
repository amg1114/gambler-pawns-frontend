"use client";

import { useSession } from "next-auth/react";

import { bungee } from "@/app/ui/fonts";

import Image from "next/image";
import Logo from "@/app/ui/icons/logo.svg";
import Coin from "@/app/ui/icons/coin.svg";
import Fire from "@/app/ui/icons/fire.svg";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useToggleState from "@/app/lib/hooks/useToggleState";

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
    return <div className="flex w-1/3 justify-end max-[340px]:sr-only"></div>;
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
        <p className={bungee.className + " pl-sm pr-xs text-base text-light"}>
          {streak}
        </p>
        <Image src={Fire} alt="" width={14.78} height={20} />
      </div>
    );
  }
}

export default function Header() {
  const [isSidebarOpen, toggleSideBar] = useToggleState();
  const [isMounted, setIsMounted] = useState(false);

  // Funcion para evitar parpadeo en pantallas pequeñas
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: session } = useSession();

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b-2 border-primary bg-dark-1 p-md">
        <div className="flex w-1/3 bg-dark-1 px-sm py-sm max-[370px]:w-1/4">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              onClick={toggleSideBar}
              className="inline-flex items-center rounded-base p-xs text-sm text-primary hover:bg-secondary focus:outline-none focus:ring-2 min-[1200px]:invisible"
            >
              <MenuRoundedIcon />
            </button>
          </div>
        </div>

        <Image
          src={Logo}
          alt=""
          width={106}
          height={38.74}
          className="h-auto w-auto max-[200px]:sr-only"
          priority
        />
        <ConditionalRendering
          coins={session?.data.currentCoins}
          streak={session?.data.streakDays}
          session={session}
        />
      </header>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMounted={isMounted}
        session={session}
      />
    </>
  );
}
