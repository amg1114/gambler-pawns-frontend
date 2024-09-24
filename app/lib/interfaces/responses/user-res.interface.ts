import { User } from "../models/user.interface";

export interface UserRes {
  status: boolean;
  statusCode: number;
  path: string;
  data: User;
  timestamp: Date;
}
