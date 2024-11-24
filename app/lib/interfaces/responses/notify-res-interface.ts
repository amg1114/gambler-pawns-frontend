export interface Notification {
  notificationId: number;
  title: string;
  message: string;
  actionLink1: string | null;
  actionText1: string | null;
  actionLink2: string | null;
  actionText2: string | null;
  isRead: boolean;
  timeStamp: string; // ISO string
  type: string;
  userWhoSend: {
    userId: number;
    nickname: string;
    email: string;
    userAvatarImg: {
      fileName: string;
      userAvatarImgId: number;
    };
  };
  userWhoReceive: {
    userId: number;
    nickname: string;
    email: string;
  };
}

export interface UpdateNotifyResponse {
  status: boolean;
  statusCode: number;
  path: string;
  data: Notification;
  timestamp: Date;
}
