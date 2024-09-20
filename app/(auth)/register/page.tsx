'use client'
//libs
import { SubmitHandler, useForm } from "react-hook-form"
import { registerRequest } from "@/app/lib/services/auth"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterForm } from "@/app/lib/interfaces/auth.interface"
import { useState } from "react"
//components
import StyledInput from "@/app/ui/components/forms/StyledInput"
import StyledTitle from "@/app/ui/components/typography/StyledTitle"
import GameAlert from "@/app/ui/components/modals/GameAlert"
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph"

//icons
import ErrorIcon from "@mui/icons-material/Error";
import Image from "next/image"
import peon from "@/app/ui/icons/peon_logo.svg"
import Board from "@/app/ui/icons/board.svg"
import Link from "next/link"

export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    })
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const router = useRouter()
    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        try {
            const res = await registerRequest({
                nickname: data.nickname, email: data.email, password: data.password,
                confirmpassword: "", countryCode: "CO"
            })

            if (res.status === 201) {
                router.push("/login")
            } else {
                setErrorMessage("Username or email already exists")
                setShowErrorAlert(true)
            }
        } catch (error) {
            setErrorMessage("Register Failed, please try again")
            setShowErrorAlert(true)
        }
    };

    return (
        <>
            <div className="relative z-0 p-lg min-[1200px]:ml-[300px] min-[1200px]:mr-[200px] mx-lg mt-lg min-[700px]:grid grid-cols-2 bg-secondary overflow-clip">
                <div className="absolute right-0 h-80 bg-dark-2 -z-10 transform -rotate-3" style={{ bottom: '-40px', width: '1500px', left: '-20px' }}></div>
                <div className="bg-primary min-h-[520px] z-10 w-full col-span-1 p-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <StyledTitle fontFamily="bungee" extraClasses="text-4xl flex text-dark-2 justify-center items-center">
                            <Image src={peon} alt="Peon logo" width={50} height={50} className="w-auto mt-sm" />
                            <span>Register</span>
                        </StyledTitle>
                        <StyledInput label="Nickname" type="text"
                            inputExtraClasses="bg-secondary mb-md"
                            wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
                            {...register("nickname")
                            }
                            id="nickname"
                            placeholder="Gambler23"
                        />

                        {errors.nickname && (
                            <span className="text-error">
                                {errors.nickname.message}
                            </span>
                        )}
                        
                        <StyledInput label="Email" type="email"
                            inputExtraClasses="bg-secondary mb-md"
                            wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
                            {...register("email")
                            }
                            id="email"
                            placeholder="user@gmail.com"
                        />

                        {errors.email && (
                            <span className="text-error">
                                {errors.email.message}
                            </span>
                        )}

                        <StyledInput label="Password" type="password"
                            inputExtraClasses="bg-secondary mb-md"
                            wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
                            {...register("password")
                            }
                            id="password"
                            placeholder="********"
                        />

                        {errors.password && (
                            <span className="text-error">
                                {errors.password.message}
                            </span>
                        )}

                        <StyledInput label="Confirm Password" type="password"
                            inputExtraClasses="bg-secondary mb-md"
                            wrapperExtraClasses="mb-md text-dark-2 min-[700px]:px-md"
                            {...register("password")
                            }
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
                                className="w-fit p-sm mx-lg hover:rounded-md underline underline-offset-8 font-extrabold text-xl text-dark-2 hover:text-2xl"
                            >Sign Up</button>
                            <Link href={"/login"} className="w-fit flex items-center justify-center">
                                <p className="p-sm rounded-md text-xl mx-md underline underline-offset-8 font-extrabold text-dark-2 hover:text-2xl">
                                    Sign In
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
                
                <div className="p-xl hidden z-10 min-[700px]:block flex-col items-center justify-center col-span-1 bg-secondary">
                    <StyledTitle fontFamily="bungee" extraClasses="text-4xl flex justify-center items-center">
                        <span className="text-center">Redy for first check Mate?</span>
                    </StyledTitle>
                    <div className="flex items-center justify-center">
                        <Image src={Board} alt="Chess board" width={400} height={400} className="w-auto" />
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
        
    )
}
