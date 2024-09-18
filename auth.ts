import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest } from "@/app/lib/services/auth";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                nickname: { label: "nickname", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req: Request) {
                if (!credentials || typeof credentials.nickname !== "string" || typeof credentials.password !== "string") {
                    throw new Error("Credenciales no provistas o incorrectas");
                }
                try {
                    const res = await loginRequest({
                        nickname: credentials.nickname,
                        password: credentials.password
                    })

                    if (res.status === 401) {
                        return null
                    }
                    const user = res.data
                    return user
                } catch (error) {
                    return null
                }

            },

        })],
    session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
    callbacks: {
        async jwt({ token, user }: { token: JWT, user?: any }) {
            if (user) {
                return { ...token, ...user }
            }
            return token
        },
        async session({ session, token }: { session: any , token: JWT }) {
            session.data = token.data
            session.timestamp = token.timestamp

            return session
        }
    },


})