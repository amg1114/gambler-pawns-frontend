import clsx from "clsx";
import { useEffect, useState } from "react";
import StyledTitle from "../typography/StyledTitle";
import StyledLink from "../typography/StyledLink";
import StyledButton from "../typography/StyledButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { bungee } from "../../fonts";

interface StoreModalProps {
  children: React.ReactNode;
  close: () => void;
}

export default function StoreModal({ children, close }: StoreModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();
  const closeHandler = (
    event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event instanceof KeyboardEvent && event.key !== "Escape") return;
    setIsClosing(true);
  };

  useEffect(() => {
    document.addEventListener("keydown", closeHandler);

    return () => {
      document.removeEventListener("keydown", closeHandler);
    };
  }, []);

  const onClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        close();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isClosing, close]);

  return (
    <div className="fixed inset-0 flex flex-wrap-reverse items-center justify-center bg-gray/70">
      <div
        className={clsx("w-4/5", {
          "animate-fade-out-up": isClosing,
          "animate-fade-in-down": !isClosing,
        })}
      >
        <header className="flex justify-end lg:mx-[200px]">
          <button className="text-2xl font-semibold" onClick={close}>
            &times;
          </button>
        </header>
        <div className="relative z-0 flex flex-col overflow-clip rounded-base bg-dark-1 text-secondary lg:mx-[200px]">
          <div className="absolute right-0 top-0 h-full w-full translate-x-1/2 -skew-x-[45deg] border-l-[16px] border-primary bg-gray-2 opacity-20 md:block"></div>
          <div className="relative z-10 flex flex-col items-center justify-center p-lg">
            <StyledTitle
              variant="h1"
              extraClasses="text-center text-warning  !mb-md"
            >
              Welcome!!
            </StyledTitle>
            <Link
              href={"/register"}
              className={`${bungee.className} text-warning`}
            >
              DON&apos;T HAVE ACCOUNT?
            </Link>
            <div className="mt-4 grid w-full grid-cols-1 items-center justify-center gap-12 md:grid-cols-2">
              <div className="flex justify-center">
                <StyledButton
                  variant="primary"
                  extraClasses="w-1/3 text-dark-1 my-lg"
                  onClick={onClick}
                >
                  {" "}
                  Login{" "}
                </StyledButton>
              </div>
              <div className="flex justify-center">
                <StyledButton
                  style="outlined"
                  extraClasses="w-1/3 text-warning"
                >
                  {" "}
                  Play As Guest
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
