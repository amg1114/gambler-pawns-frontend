import Image from "next/image";
import Peon from "@/app/ui/icons/peon.svg";
import StyledTitle from "./typography/StyledTitle";

export default function PageLoadSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-1 bg-opacity-90">
      <div className="flex flex-col items-center gap-md">
        <Image
          src={Peon}
          alt="Loading"
          width={40}
          height={40}
          className="animate-bounce text-primary drop-shadow-1"
        />
        <StyledTitle
          variant="h4"
          fontFamily="bungee"
          extraClasses="text-primary"
        >
          Loading...
        </StyledTitle>
      </div>
    </div>
  );
}
