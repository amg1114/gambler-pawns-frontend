"use client";
// libs
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "@/app/lib/_axios";

// components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import {
  Avatar,
  AvatarRes,
} from "@/app/lib/interfaces/responses/avatars-res.interface";
import { UpdateAvatarResponse } from "@/app/lib/interfaces/responses/updateAvatar-res.interface";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ProfileAvatarSelectProps {
  onClose: () => void;
  userId: number;
  currentAvatar: string;
}

export function ProfileAvatarSelect({
  onClose,
  userId,
  currentAvatar,
}: ProfileAvatarSelectProps) {
  const { data: session, update } = useSession();
  const [isClosing, setIsClosing] = useState(false);
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  const closeHandler = (
    event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event instanceof KeyboardEvent && event.key !== "Escape") return;
    setIsClosing(true);
  };

  const changeHandler = (filename: string) => {
    axios
      .patch<UpdateAvatarResponse>(
        `/user/${userId}/avatar`,
        { filename },
        { headers: { Authorization: `Bearer ${session?.data.token}` } },
      )
      .then((res) => {
        if (res.data.status) {
          const newSession = {
            ...session,
            data: {
              ...session!.data,
              userAvatarImg: res.data.data.userAvatarImg,
            },
          };

          return update(newSession);
        }
        throw new Error("Error updating avatar");
      })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error updating avatar: ", error);
      });
  };

  useEffect(() => {
    document.addEventListener("keydown", closeHandler);

    axios
      .get<AvatarRes>("/assets/avatars")
      .then((res) => {
        if (res.data.status) {
          setAvatars(res.data.data);
          return;
        }
        throw new Error("Error fetching avatars");
      })
      .catch((error) => {
        console.error("Error fetching avatars: ", error);
      });

    return () => {
      document.removeEventListener("keydown", closeHandler);
    };
  }, []);

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-wrap-reverse items-center justify-center bg-gray/70">
      <div
        className={clsx(`w-4/5 max-w-lg`, {
          "animate-fade-out-up": isClosing,
          "animate-fade-in-down": !isClosing,
        })}
      >
        <div
          className={`max-h-[600px] w-full overflow-y-scroll rounded-base bg-primary px-lg py-md xl:max-h-none xl:overflow-y-auto`}
        >
          <header className="flex justify-end">
            <button
              className="text-2xl font-bold text-gray hover:text-secondary"
              onClick={(e) => closeHandler(e)}
            >
              &times;
            </button>
          </header>
          <StyledTitle extraClasses="!text-secondary text-center" variant="h3">
            Select your avatar
          </StyledTitle>

          <figure className="mx-auto mb-lg block w-28">
            <Image
              src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${currentAvatar}`}
              alt="Avatar"
              className="aspect-square w-full rounded-full border-4 border-secondary"
              width="112"
              height="112"
            />
          </figure>

          <div className="grid grid-cols-3 gap-md lg:grid-cols-5">
            {avatars.map((avatar) => (
              <figure
                className="cursor-pointer transition-transform hover:scale-110"
                key={`avatar-${avatar.userAvatarImgId}`}
                onClick={() => changeHandler(avatar.fileName)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${avatar.fileName}`}
                  alt={`Avatar ${avatar.userAvatarImgId}`}
                  width={77}
                  height={77}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
