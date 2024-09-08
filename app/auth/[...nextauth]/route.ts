import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { loginRequest } from "../_api";
import { user } from "../_interfaces";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<user | null> {
                if (!credentials) {
                    throw new Error("Credenciales no provistas")
                }
                try {
                   const user = await loginRequest({
                    username: credentials.username, 
                    password: credentials.password}) 
                
                if (user) {
                    return user.data
                } else {
                    return null
                }
                } catch (error) {
                    console.error("Login failed: ", error)
                    return null
                }
                
            }})]}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }