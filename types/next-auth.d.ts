import { User } from "../app/lib/interfaces/models/user.interface";

declare module "next-auth" {
  interface Session {
    data: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    exp?: number;
    iat?: number;
  }
}
