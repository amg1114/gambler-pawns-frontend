"use client";
//libs
import { SubmitHandler, useForm } from "react-hook-form";
import { registerRequest } from "@/app/lib/services/auth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterForm,
} from "@/app/lib/interfaces/auth.interface";
import { useState } from "react";
//components
import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

//icons
import ErrorIcon from "@mui/icons-material/Error";
import Image from "next/image";
import peon from "@/app/ui/icons/peon_logo.svg";
import Board from "@/app/ui/icons/board.svg";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const res = await registerRequest({
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        confirmpassword: "",
        countryCode: "CO",
      });

      if (res.status === 201) {
        router.push("/login");
        return;
      } else if (res.status === 409) {
        setErrorMessage("Username or email already exists, please try again");
        setShowErrorAlert(true);
        return;
      }
      throw new Error();
    } catch {
      setErrorMessage("Register Failed, please try again");
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <div className="relative z-0 mx-lg mt-lg grid-cols-2 overflow-clip bg-secondary p-lg min-[700px]:grid min-[1200px]:ml-[300px] min-[1200px]:mr-[200px]">
        <div
          className="absolute right-0 -z-10 h-80 -rotate-3 transform bg-dark-2"
          style={{ bottom: "-40px", width: "1500px", left: "-20px" }}
        ></div>
        <div className="z-10 col-span-1 min-h-[520px] w-full bg-primary p-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <StyledTitle
              fontFamily="bungee"
              extraClasses="text-4xl flex text-dark-2 justify-center items-center"
            >
              <Image
                src={peon}
                alt="Peon logo"
                width={50}
                height={50}
                className="mt-sm w-auto"
              />
              <span>Register</span>
            </StyledTitle>
            <StyledInput
              label="Nickname"
              type="text"
              inputExtraClasses="bg-secondary mb-md !text-white"
              wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
              {...register("nickname")}
              id="nickname"
              placeholder="Gambler23"
            />

            {errors.nickname && (
              <span className="text-error">{errors.nickname.message}</span>
            )}

            <StyledInput
              label="Email"
              type="email"
              inputExtraClasses="bg-secondary mb-md !text-white"
              wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
              {...register("email")}
              id="email"
              placeholder="user@gmail.com"
            />

            {errors.email && (
              <span className="text-error">{errors.email.message}</span>
            )}

            <StyledInput
              label="Password"
              type="password"
              inputExtraClasses="bg-secondary mb-md !text-white"
              wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
              {...register("password")}
              id="password"
              placeholder="********"
            />

            {errors.password && (
              <span className="text-error">{errors.password.message}</span>
            )}

            <StyledInput
              label="Confirm Password"
              type="password"
              inputExtraClasses="bg-secondary mb-md !text-white"
              wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
              {...register("confirmpassword")}
              id="confirmpassword"
              placeholder="*********"
            />

            {errors.confirmpassword && (
              <span className="text-error">
                {errors.confirmpassword?.message}
              </span>
            )}

            <div className="flex items-center justify-center pt-lg">
              <button
                type="submit"
                className="hover:rounded-md mx-lg w-fit p-sm text-xl font-extrabold text-dark-2 underline underline-offset-8 hover:text-2xl"
              >
                Register
              </button>
              <Link
                href={"/login"}
                className="flex w-fit items-center justify-center"
              >
                <p className="rounded-md mx-md p-sm text-xl font-extrabold text-dark-2 underline underline-offset-8 hover:text-2xl">
                  Login
                </p>
              </Link>
            </div>
          </form>
        </div>

        <div className="z-10 col-span-1 hidden flex-col items-center justify-center bg-secondary p-xl min-[700px]:block">
          <StyledTitle
            fontFamily="bungee"
            extraClasses="text-4xl flex justify-center items-center"
          >
            <span className="text-center">Redy for first check Mate?</span>
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
