export interface AvatarRes {
    status:     boolean;
    statusCode: number;
    path:       string;
    data:       Avatar[];
    timestamp:  Date;
}

export interface Avatar {
    userAvatarImgId: number;
    fileName:        string;
}
