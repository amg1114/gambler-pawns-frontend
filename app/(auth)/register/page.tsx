'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { registerRequest } from "@/app/lib/services/auth"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterForm } from "@/app/lib/interfaces/auth.interface"


export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    })

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
                alert("" + res.data.message)
            }
        } catch (error) {
            alert("Error al registrar usuario\n" + error)
        }
    }

    return (
        <div className="h-[calc(100vh/7rem)] flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
                <label className="text-slate-500 block">
                    Username
                </label>
                <input
                    type="text"
                    {...register("nickname")
                    }
                    className="text-bg-dark-1 p-3 rounded-md block mb-2 w-full"
                    placeholder="Gambler45"
                    id="username"
                />

                {errors.nickname && (
                    <span className="text-error">
                        {errors.nickname.message}
                    </span>
                )}

                <label className="text-slate-500 block">
                    Email
                </label>
                <input
                    type="email"
                    {...register("email")}
                    id="email"
                    placeholder="user@gmail.com"
                    className="text-bg-dark-1 p-3 rounded-md block mb-2 bg-slate-200 text-slate-300 w-full"
                />

                {errors.email && (
                    <span className="text-error">
                        {errors.email.message}
                    </span>
                )}

                <label className="text-slate-500 block">
                    Password
                </label>
                <input
                    type="password"
                    {...register("password")
                    }
                    id="password"
                    placeholder="***********"
                    className="text-bg-dark-1 p-3 rounded-md block mb-2 bg-slate-200 text-slate-300 w-full"
                />

                {errors.password && (
                    <span className="text-error">
                        {errors.password.message}
                    </span>
                )}

                <label className="text-slate-500 block">
                    Confirm Password
                </label>
                <input
                    type="password"
                    {...register("confirmpassword")}
                    id="confirmpassword"
                    placeholder="***********"
                    className="text-bg-dark-1 p-3 rounded-md block mb-2 bg-slate-200 text-slate-300 w-full"
                />

                {errors.confirmpassword && (
                    <span className="text-error">
                        {errors.confirmpassword?.message}
                    </span>
                )}

                <button
                    type="submit"
                    className="bg-primary text-slate-200 w-full p-3 rounded-md">
                    Sign Up
                </button>
            </form>
        </div>
    )
}