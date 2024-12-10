"use client";

//libs
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/app/lib/interfaces/auth.interface";
import { useState } from "react";

//components
import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

//icons
import peon from "@/app/ui/icons/peon_logo.svg";
import Image from "next/image";
import Board from "@/app/ui/icons/board.svg";
import Link from "next/link";
import ErrorIcon from "@mui/icons-material/Error";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res: SignInResponse | undefined = await signIn("credentials", {
        nickname: data.nickname,
        password: data.password,
        redirect: false,
      });
      if (!res) {
        setErrorMessage("Login Failed, please try again");
        setShowErrorAlert(true);
        return;
      }
      if (res.error) {
        setErrorMessage("Username or password incorrect");
        setShowErrorAlert(true);
        return;
      } else {
        router.push("/");
      }
    } catch {
      setErrorMessage("Login Failed, please try again");
      setShowErrorAlert(true);
    }
  };
  return (
    <>
      <div className="relative z-0 m-lg grid-cols-2 overflow-clip bg-secondary min-[700px]:grid min-[700px]:p-lg min-[1400px]:ml-[300px] min-[1400px]:mr-[200px]">
        <div
          className="absolute right-0 -z-10 h-80 rotate-3 transform bg-primary max-[700px]:hidden"
          style={{ bottom: "-40px", width: "1500px", left: "-20px" }}
        ></div>
        <div className="z-10 col-span-1 hidden flex-col items-center justify-center bg-secondary p-xl min-[700px]:block">
          <StyledTitle
            fontFamily="bungee"
            extraClasses="text-4xl flex justify-center items-center"
          >
            <Image
              src={peon}
              alt="Peon logo"
              width={50}
              height={50}
              className="mt-sm w-auto items-center justify-center"
            />
            <span>Welcome back!</span>
          </StyledTitle>
          <div className="flex items-center justify-center">
            <Image
              src={Board}
              alt="Chess board"
              width={400}
              height={400}
              className="w-auto"
            />
          </div>
        </div>
        <div className="relative z-10 col-span-1 min-h-[520px] w-full bg-dark-2 p-xl">
          <div
            className="absolute right-0 -z-10 h-80 rotate-6 transform bg-primary min-[700px]:hidden"
            style={{ bottom: "-250px", width: "1500px", left: "-20px" }}
          ></div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <StyledTitle
              fontFamily="bungee"
              extraClasses="text-4xl flex justify-center items-center"
            >
              <Image
                src={peon}
                alt="Peon logo"
                width={50}
                height={50}
                className="mt-sm w-auto"
              />
              <span>Login</span>
            </StyledTitle>
            <StyledInput
              label="Nickname"
              type="text"
              inputExtraClasses="bg-secondary mb-md"
              wrapperExtraClasses="mb-md min-[700px]:px-md"
              {...register("nickname")}
              id="nickname"
              placeholder="Gambler23"
            />
            {errors.nickname && (
              <span className="pb-md text-error">
                {errors.nickname.message}
              </span>
            )}
            <StyledInput
              label="Password"
              type="password"
              inputExtraClasses="bg-secondary mb-md"
              wrapperExtraClasses="mb-md min-[700px]:px-md"
              {...register("password")}
              id="password"
              placeholder="********"
            />
            {errors.password && (
              <span className="pb-sm text-error">
                {errors.password.message}
              </span>
            )}
            <p className="flex justify-end py-sm">
              <Link
                href="/forgot-password"
                className="underline-offset-4 hover:text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </p>
            <div className="flex items-center justify-center pt-lg">
              <button
                type="submit"
                className="hover:rounded-md mx-lg w-fit p-sm text-xl font-extrabold text-primary underline underline-offset-8 hover:scale-105 hover:rounded-base hover:bg-secondary hover:text-primary hover:duration-300 max-[700px]:text-dark-2"
              >
                Login
              </button>
              <Link
                href={"/register"}
                className="flex w-fit items-center justify-center"
              >
                <p className="rounded-md mx-md p-sm text-xl font-extrabold text-primary underline underline-offset-8 hover:scale-105 hover:rounded-base hover:bg-secondary hover:text-primary hover:duration-300 max-[700px]:text-dark-2">
                  Register
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {showErrorAlert && (
        <GameAlert close={() => setShowErrorAlert(false)}>
          <StyledTitle extraClasses="text-center !flex items-center justify-center gap-sm">
            <ErrorIcon className="!text-4xl text-error" /> Error
          </StyledTitle>
          <StyledParagraph extraClasses="text-center">
            {errorMessage}
          </StyledParagraph>
        </GameAlert>
      )}
    </>
  );
}
