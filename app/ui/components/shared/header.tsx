import Image from "next/image";
import Logo from "../../lib/icons/logo.svg";
import Coin from "../../lib/icons/coin.svg";
import Fire from "../../lib/icons/fire.svg";

export default function Header() {
    return (
        <nav className="sticky top-0 flex w-full items-center justify-between overflow-visible border-b-2 border-primary bg-dark-1 p-md">
            <text className="text-light">Hamburguesa</text>
            <Image
                src={Logo}
                alt=""
                className="justify-center"
                width={106}
                height={38.74}
            />
            <div className="container flex w-36 justify-between">
                <text className="__className_94ea24 text-base text-light">
                    100
                </text>
                <Image src={Coin} alt="" width={20} height={20} />
                <text className="__className_94ea24 text-base text-light">
                    200
                </text>
                <Image src={Fire} alt="" width={14.78} height={20} />
            </div>
        </nav>
    );
}
