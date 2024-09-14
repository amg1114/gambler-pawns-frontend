"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm } from "../_interfaces";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GameAlert from "@/app/ui/components/modals/GameAlert";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            const res: SignInResponse | undefined = await signIn(
                "credentials",
                {
                    nickname: data.nickname,
                    password: data.password,
                    redirect: false,
                },
            );

            if (!res) {
                setErrorMessage("Error at login");
                console.error("response is undefined");
                return;
            }

            if (res.error) {
                console.error(res.error);
                setErrorMessage(res.error);
                return;
            }

            router.push("/");
        } catch (error) {
            console.error("Login error: ", error);
            setErrorMessage("Error at login");
        }
    };

    return (
        <div className="flex h-[calc(100vh/7rem)] items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
                <label className="text-slate-500 block">Username</label>
                <input
                    type="text"
                    {...register("nickname", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese su usuario",
                        },
                    })}
                    className="text-bg-dark-1 p-3 rounded-md mb-2 bg-slate-200 text-slate-300 block w-full"
                />
                {errors.nickname && (
                    <span className="text-error">
                        {errors.nickname.message}
                    </span>
                )}
                <label className="text-slate-500 block">Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese su contraseña",
                        },
                    })}
                    id="password"
                    placeholder="********"
                    className="text-bg-dark-1 p-3 rounded-md mb-2 bg-slate-200 text-slate-300 block w-full"
                />
                {errors.password && (
                    <span className="text-error">
                        {errors.password.message}
                    </span>
                )}

                <button
                    type="submit"
                    className="text-slate-200 p-3 rounded-md w-full bg-primary"
                >
                    Sign In
                </button>

                {errorMessage ? (
                    <span className="text-error underline">{errorMessage}</span>
                ) : (
                    <></>
                )}
            </form>
        </div>
    );
}
