import Image from "next/image";
import Logo from "./ui/icons/logo.svg";

export default function Landing() {
    return (
        <main className="flex items-center justify-center pt-3xl">
            <Image
                className="dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                src={Logo}
                alt="Gambler Pawns Logo"
                width={480}
                priority
            />
        </main>
    );
}
