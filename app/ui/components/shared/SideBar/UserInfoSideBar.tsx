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
        className="flex w-full items-center justify-center p-md hover:scale-95 hover:shadow-lg hover:duration-300"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${session.data.userAvatarImg.fileName}`}
          alt="avatar"
          width={50}
          height={50}
          className="mr-md"
        />
        <div className="flex flex-col">
          <p className="text-xl font-black">{session.data.nickname}</p>
          <p>My profile</p>
        </div>
      </Link>
      <Link
        onClick={() => markLastNewNotificationAsRead()}
        href="/notification"
        className="relative m-lg mb-2xl flex w-max items-center hover:text-lg hover:text-primary hover:underline hover:underline-offset-4 hover:duration-300"
      >
        {newNotification && (
          <span className="absolute top-0 z-10 h-[10px] w-[10px] rounded-full bg-error"></span>
        )}
        <Image
          src={notification}
          alt="notification icon"
          width={40}
          height={40}
          className="m-[1px] max-h-6 pr-sm"
        />
        <span className="px-md text-base font-black">Notify</span>
      </Link>
    </>
  );
}
