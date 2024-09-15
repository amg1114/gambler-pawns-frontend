import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session{
        data: {
            access_token: string
        },
        user: "hola" | "chau"
        timestamp: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        data: {
            access_token: string
        }
        timestamp: string
    }
}