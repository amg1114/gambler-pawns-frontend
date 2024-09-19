import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { LoginResponse } from "../app/lib/interfaces/login-res.interface";
import { User } from "../app/lib/interfaces/user.interface";

declare module "next-auth" {
    interface Session {
        data: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends LoginResponse {}
}