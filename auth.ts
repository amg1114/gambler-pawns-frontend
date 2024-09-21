import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest } from "@/app/lib/services/auth";
import { JWT } from "next-auth/jwt";
import { decodeJwt } from "jose";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                nickname: { label: "nickname", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, req: Request) {
                if (
                    !credentials ||
                    typeof credentials.nickname !== "string" ||
                    typeof credentials.password !== "string"
                ) {
                    throw new Error("Invalid credentials");
                }

                
                try {
                    const res = await loginRequest({
                        nickname: credentials.nickname,
                        password: credentials.password,
                    });

                    if (res.status === 401) {
                        return null;
                    }
                   
                    const token = decodeJwt(res.data.data.access_token);
                    return token as JWT;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login"
    },
    session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
    callbacks: {
        async jwt({ token, user, trigger, session }: { token: JWT; user?: any, trigger?:"signIn" | "signUp" | "update", session?: any }) {
            if (trigger === "update" && session) {
                token.data = session.data;
                return token;
            }

            if (user) {
                token.data = user;
                return token;
            }

            return token;

        },
        async session({ session, token }: { session: any; token: JWT }) {
            session.data = token.data;
            session.timestamp = token.timestamp;

            return session;
        },
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
});
