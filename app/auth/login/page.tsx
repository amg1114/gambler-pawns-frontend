'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { LoginForm } from "../_interfaces"
import { signIn, SignInResponse } from "next-auth/react"

const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    
    
    const res: SignInResponse | undefined = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false
    })
    
    if (!res) {
        alert("Error al iniciar sesion")
    } else {

        if (res.error){
            alert("Error al iniciar sesión")
            console.log(res)
        } else {
            console.log(res)
        }
    }

    

}

export default function LoginPage() {

    const { register, handleSubmit, formState: {errors} } = useForm<LoginForm>()

    
    
    return (
        <div className="h-[calc(100vh/7rem)] flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
                <label className="text-slate-500 block">
                    Username
                </label>
                <input 
                    type="text"
                    {...register("username", { 
                        required:{
                            value: true, 
                            message: "Por favor, ingrese su usuario" }
                        })
                    }  
                    className="text-bg-dark-1 p-3 rounded-md block mb-2 bg-slate-200 text-slate-300 w-full" 
                    />
                {errors.username && (
                    <span className="text-error">
                        {errors.username.message}
                    </span>
                )}
                <label className="text-slate-500 block">Password</label>
                <input 
                    type="password" 
                    {...register("password", { 
                        required: {
                            value: true, 
                            message: "Por favor, ingrese su contraseña"
                        } })} 
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