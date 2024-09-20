"use client";

import { useSession } from "next-auth/react";

import { auth } from "@/auth";
import { bungee } from "@/app/ui/fonts";

import Image from "next/image";
import Logo from "@/app/ui/icons/logo.svg";
import Coin from "@/app/ui/icons/coin.svg";
import Fire from "@/app/ui/icons/fire.svg";
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
    const { data: session } = useSession();

    return (
        <nav className="fixed flex w-full items-center justify-between border-b-2 border-primary bg-dark-1 p-md">
            <div className="flex w-1/3 max-[370px]:w-1/4">
                <text className="text-light md:sr-only">Menu</text>
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
        </nav>
    );
}
