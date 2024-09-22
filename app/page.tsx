import Image from "next/image";
import Logo from "./ui/icons/logo.svg";

export default function Landing() {
    return (
        <div className="">
            <div>
                <Image src={Logo} alt="logo" width={200} height={200} />
            </div>
        </div>
    );
}
