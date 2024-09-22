import { User } from "../models/user.interface";

export interface UpdateAvatarResponse {
    status:     boolean;
    statusCode: number;
    path:       string;
    data:       User;
    timestamp:  Date;
}

export interface UpdateAvatarError {
    status:     boolean;
    statusCode: number;
    path:       string;
    data:       {
        message: string[];
        error:   string;
    };
    timestamp:  Date;
}