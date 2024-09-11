import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest } from "@/services/auth";
import { JWT } from "next-auth/jwt";

const authOptions = {
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

                    if (res) {
                        return res.data
                    } else {
                        return null
                    }

                } catch (error) {
                    console.log(error)
                    return null
                }

            }
        })],
    callbacks: {
        async jwt({ token, user }: { token: JWT, user?: any }) {
            if (user.token) {
                token.id = user.id
                token.nickname = user.nickname
            }
            return token
        },
        async session({ session, token }: { session: any, token: JWT }) {
            session.accessToken = token.accessToken
            session.id = token.id
            session.username = token.username
            return session
        }
    },

}

const { handlers } = NextAuth(authOptions)

export const { GET, POST } = handlers