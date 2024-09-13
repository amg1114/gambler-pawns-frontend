import Image from "next/image";
import Logo from "../../icons/logo.svg";
import Coin from "../../icons/coin.svg";
import Fire from "../../icons/fire.svg";

export default function Header() {
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

            <div className="flex w-1/3 justify-end max-[340px]:sr-only">
                <text className="__className_94ea24 pr-xs text-base text-light">
                    200
                </text>
                <Image
                    src={Coin}
                    alt=""
                    width={20}
                    height={20}
                    className="h-auto w-auto"
                />
                <text className="__className_94ea24 pr-xs pl-sm text-base text-light">
                    14
                </text>
                <Image src={Fire} alt="" width={14.78} height={20} />
            </div>
        </nav>
    );
}
