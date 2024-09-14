'use client'
import {useForm, SubmitHandler} from "react-hook-form"
import { LoginForm } from "../_interfaces"
import { signIn, SignInResponse } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
    const router = useRouter()

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {

        try {

            const res: SignInResponse | undefined = await signIn("credentials", {
                nickname: data.nickname,
                password: data.password,
                redirect: false,
            })

            console.log(res)

            if (!res) {
                alert("Error al iniciar sesion, intente de nuevo")
                return
            }

            if (res.error) {
                console.log("hola a todo el mundo", res.error)
                alert("Error al iniciar sesión")
                
            } else {
                router.push("/")
            }

        } catch (error) {
            console.error("Error al iniciar sesion: ", error)
            alert("Error al iniciar sesion")
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
                    {...register("nickname", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese su usuario"
                        }
                    })
                    }
                    className="text-bg-dark-1 p-3 rounded-md block mb-2 bg-slate-200 text-slate-300 w-full"
                />
                {errors.nickname && (
                    <span className="text-error">
                        {errors.nickname.message}
                    </span>
                )}
                <label className="text-slate-500 block">Password</label>
                <input
                    type="text"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese su contraseña"
                        }
                    })}
                    id="password"
                    placeholder="********"
                    className="text-bg-dark-1 p-3 rounded-md block mb-2 bg-slate-200 text-slate-300 w-full"
                />
                {errors.password && (
                    <span className="text-error">{errors.password.message}</span>
                )}

                <button
                    type="submit"
                    className="bg-primary text-slate-200 w-full p-3 rounded-md"
                >Sign In</button>
            </form>
        </div>
    )
}