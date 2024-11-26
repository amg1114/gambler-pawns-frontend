import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import notification from "@/app/ui/icons/notification.svg";
import { useNotificationContext } from "@/app/lib/contexts/NotificationContext";

interface UserInfoSideBarProps {
  session: Session;
}

export default function UserInfoSideBar({ session }: UserInfoSideBarProps) {
  const { newNotification, markLastNewNotificationAsRead } =
    useNotificationContext();

  return (
    <>
      <Link
        href="/profile"
        className="flex w-full items-center justify-center p-md hover:bg-secondary"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${session.data.userAvatarImg.fileName}`}
          alt="avatar"
          width={50}
          height={50}
        />
        <div className="flex flex-col p-xs">
          <p className="text-xl font-black">{session.data.nickname}</p>
          <p>My profile</p>
        </div>
      </Link>
      <Link
        onClick={() => markLastNewNotificationAsRead()}
        href={"/notification"}
        className="relative flex w-full items-center px-lg pb-2xl"
      >
        {newNotification && (
          <span className="bg-red-500 absolute right-0 top-0 h-3 w-3 rounded-full"></span>
        )}
        <Image
          src={notification}
          alt="notification icon"
          width={40}
          height={40}
          className="max-h-6 pr-sm"
        />
        <div className="flex flex-col pr-xs">
          <p className="px-md text-base font-black">Notify</p>
        </div>
      </Link>
    </>
  );
}
