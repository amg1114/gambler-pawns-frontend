"use client";

import { useSession } from "next-auth/react";

import { bungee } from "@/app/ui/fonts";

import Image from "next/image";
import Logo from "@/app/ui/icons/logo.svg";
import Coin from "@/app/ui/icons/coin.svg";
import Fire from "@/app/ui/icons/fire.svg";
import Sidebar from "./SideBar/Sidebar";
<<<<<<< HEAD
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useToggleState from "@/app/lib/hooks/useToggleState";
=======
>>>>>>> d1ba50a05f1ed53562d68a375b7b6d8635e451e6
import Link from "next/link";

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
  const { data: session } = useSession();

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b-2 border-primary bg-dark-1 p-md">
        <div className="flex w-1/3 bg-dark-1 px-sm max-[370px]:w-1/4">
          <Sidebar session={session} />
        </div>
<<<<<<< HEAD
        <Link href="/" passHref>
          <Image
            src={Logo}
            alt=""
=======
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
>>>>>>> d1ba50a05f1ed53562d68a375b7b6d8635e451e6
            width={106}
            height={38.74}
            className="h-auto w-auto max-[200px]:sr-only"
            priority
          />
        </Link>
<<<<<<< HEAD
=======

>>>>>>> d1ba50a05f1ed53562d68a375b7b6d8635e451e6
        <ConditionalRendering
          coins={session?.data.currentCoins}
          streak={session?.data.streakDays}
          session={session}
        />
      </header>
    </>
  );
}
