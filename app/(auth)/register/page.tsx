"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { registerRequest } from "@/app/lib/services/auth";
import { RegisterForm } from "../_interfaces";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();
    const router = useRouter();
    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        if (data.password !== data.confirmpassword) {
            return alert("Las contraseñas no coinciden");
        }

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
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert("Error al registrar usuario\n" + error);
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
                            message: "Por favor, ingrese un usuario valido",
                        },
                    })}
                    className="text-bg-dark-1 p-3 rounded-md mb-2 block w-full"
                    placeholder="Gambler45"
                    id="username"
                />

                {errors.nickname && (
                    <span className="text-error">
                        {errors.nickname.message}
                    </span>
                )}

                <label className="text-slate-500 block">Email</label>
                <input
                    type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese su email",
                        },
                    })}
                    id="email"
                    placeholder="user@gmail.com"
                    className="text-bg-dark-1 p-3 rounded-md mb-2 bg-slate-200 text-slate-300 block w-full"
                />

                {errors.email && (
                    <span className="text-error">{errors.email.message}</span>
                )}

                <label className="text-slate-500 block">Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese una contraseña valida",
                        },
                    })}
                    id="password"
                    placeholder="***********"
                    className="text-bg-dark-1 p-3 rounded-md mb-2 bg-slate-200 text-slate-300 block w-full"
                />

                {errors.password && (
                    <span className="text-error">
                        {errors.password.message}
                    </span>
                )}

                <label className="text-slate-500 block">Confirm Password</label>
                <input
                    type="password"
                    {...register("confirmpassword", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese una contraseña valida",
                        },
                    })}
                    id="confirmpassword"
                    placeholder="***********"
                    className="text-bg-dark-1 p-3 rounded-md mb-2 bg-slate-200 text-slate-300 block w-full"
                />

                {errors.password && (
                    <span className="text-error">
                        {errors.confirmpassword?.message}
                    </span>
                )}

                <button
                    type="submit"
                    className="text-slate-200 p-3 rounded-md w-full bg-primary"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
