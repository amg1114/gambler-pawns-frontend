'use client'

//libs
import { useForm, SubmitHandler } from "react-hook-form"
import { signIn, SignInResponse } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginForm } from "@/app/lib/interfaces/auth.interface"
import { useState } from "react"

//components
import StyledInput from "@/app/ui/components/forms/StyledInput"
import StyledTitle from "@/app/ui/components/typography/StyledTitle"
import GameAlert from "@/app/ui/components/modals/GameAlert"
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

//icons
import peon from "@/app/ui/icons/peon_logo.svg"
import Image from "next/image"
import Board from "@/app/ui/icons/board.svg"
import Link from "next/link"
import ErrorIcon from "@mui/icons-material/Error";


export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    })
    const router = useRouter()
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            const res: SignInResponse | undefined = await signIn("credentials", {
                nickname: data.nickname,
                password: data.password,
                redirect: false,
            })
            console.log(res)
            if (!res) {
                setErrorMessage("Login Failed, please try again")
                setShowErrorAlert(true)
                return
            }
            if (res.error) {
                setErrorMessage("Username or password incorrect")
                setShowErrorAlert(true)
                return
            } else {
                router.push("/")
            }
        } catch (error) {
            setErrorMessage("Login Failed, please try again")
            setShowErrorAlert(true)
        }
    }
    return (
        <>
            <div className="relative z-0 p-lg min-[1200px]:ml-[300px] min-[1200px]:mr-[200px] mx-lg mt-lg min-[700px]:grid grid-cols-2 bg-secondary overflow-clip">
                <div className="absolute right-0 h-80 bg-primary -z-10 transform rotate-3" style={{ bottom: '-40px', width: '1500px', left: '-20px' }}></div>
                <div className="p-xl hidden z-10 min-[700px]:block flex-col items-center justify-center col-span-1 bg-secondary">
                    <StyledTitle fontFamily="bungee" extraClasses="text-4xl flex justify-center items-center">
                        <Image src={peon} alt="Peon logo" width={50} height={50} className="w-auto mt-sm items-center justify-center" />
                        <span>Welcome Again!!</span>
                    </StyledTitle>
                    <div className="flex items-center justify-center">
                        <Image src={Board} alt="Chess board" width={400} height={400} className="w-auto" />
                    </div>
                </div>
                <div className="bg-dark-2 min-h-[520px] z-10 w-full col-span-1 p-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <StyledTitle fontFamily="bungee" extraClasses="text-4xl flex justify-center items-center">
                            <Image src={peon} alt="Peon logo" width={50} height={50} className="w-auto mt-sm" />
                            <span>Login</span>
                        </StyledTitle>
                        <StyledInput label="Nickname" type="text"
                            inputExtraClasses="bg-secondary mb-md"
                            wrapperExtraClasses="mb-md min-[700px]:px-md"
                            {...register("nickname",)
                            }
                            id="nickname"
                            placeholder="Gambler23"
                        />
                        {errors.nickname && (
                            <span className="text-error pb-md">
                                {errors.nickname.message}
                            </span>
                        )}
                        <StyledInput label="Password" type="password"
                            inputExtraClasses="bg-secondary mb-md"
                            wrapperExtraClasses="mb-md min-[700px]:px-md"
                            {...register("password")}
                            id="password"
                            placeholder="********"
                        />
                        {errors.password && (
                            <span className="text-error pb-sm">{errors.password.message}</span>
                        )}
                        <Link href="/forgot-password" className="flex justify-end py-sm ">
                            <p className="hover:underline underline-offset-4 hover:text-primary">
                                Forgot password?
                            </p>
                        </Link>
                        <div className="flex items-center justify-center pt-lg">
                            <button
                                type="submit"
                                className="w-fit p-sm mx-lg hover:rounded-md underline underline-offset-8 font-extrabold text-xl text-primary hover:bg-secondary"
                            >Sign In</button>
                            <Link href={"/register"} className="w-fit flex items-center justify-center">
                                <p className="p-sm rounded-md text-xl mx-md underline underline-offset-8 font-extrabold text-primary hover:bg-secondary">
                                    Sign Up
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
    )
}