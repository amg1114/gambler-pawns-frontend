import clsx from "clsx";
import { useEffect, useState } from "react";
import StyledTitle from "../typography/StyledTitle";
import StyledLink from "../typography/StyledLink";
import StyledButton from "../typography/StyledButton";
import { useRouter } from "next/navigation";

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
  }, [isClosing]);

  return (
    <div className="fixed inset-0 flex flex-wrap-reverse items-center justify-center bg-gray/70">
      <div
        className={clsx("w-4/5", {
          "animate-fade-out-up": isClosing,
          "animate-fade-in-down": !isClosing,
        })}
      >
        <header className="flex justify-end">
          <button className="text-xl" onClick={close}>
            &times;
          </button>
        </header>
        <div className="relative z-0 flex flex-col items-center justify-center overflow-clip rounded-base bg-dark-1 p-lg text-secondary lg:mx-[200px]">
          <div
            className="absolute right-0 -z-10 hidden h-96 rotate-12 transform bg-secondary md:block"
            style={{ height: "450px", width: "600px", right: "-20px" }}
          ></div>
          <StyledTitle
            variant="h1"
            extraClasses="text-center text-warning -mb-xs"
          >
            {" "}
            Welcome!!{" "}
          </StyledTitle>
          <StyledLink href="/register" extraClasses="flex text-warning mb-lg">
            DONT HAVE ACCOUNT?
          </StyledLink>
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
              <StyledButton style="outlined" extraClasses="w-1/3 text-warning">
                {" "}
                Play As Guest
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
