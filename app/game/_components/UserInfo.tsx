'use client'
//Libs
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useEffect, useState } from "react";

//Components
import Image from "next/image";
import Timer from "./Timer";

//Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function UserInfo({
  userInfoProp,
  awaiting,
  style,
  
}: {
  userInfoProp?: any | null;
  awaiting?: boolean;
  style?: string;
  
}) {
  const [userAvatar, setUserAvatar] = useState("1.png");
  console.log(userInfoProp);

  useEffect(() => {
    if (userInfoProp) {
      setUserAvatar(userInfoProp?.user.userAvatarImg.fileName || "1.png");
    }
  }, [userInfoProp]);


  return (
    <>
      <div className="my-lg flex w-full">
        {awaiting ? (
          <>
            <div className="mr-sm flex aspect-square w-10 items-center justify-center rounded-full bg-light text-t-secondary lg:w-14">
              ??
            </div>
            <div className="flex-1 items-start justify-start space-x-2">
              <span className="p-xs font-semibold">??</span>
              <span className="p-xs">??</span>
              <span className="mr-lg rounded-base bg-dark-2 p-xs">????</span>
            </div>
            <div className="">
              <Timer extraClasses="">5:00</Timer>
            </div>
          </>
        ) : ( style === "primary" ? (
          <>
            <div>
                <Timer extraClasses="">{userInfoProp.timer ? userInfoProp.timer : "5:00"}</Timer>
            </div>

            <div className="ml-sm flex flex-grow items-end justify-end space-x-2">
              <span
                className={`fi fi-${userInfoProp?.countryCode.toLocaleLowerCase()} ml-md text-xl`}
              ></span>
              <span className="">{userInfoProp?.eloArcade}</span>
              <span className="font-semibold">
                {userInfoProp?.nickname} (You)
              </span>
            </div>
            <figure className="relative ml-md aspect-square w-10 lg:w-14">
              <Image
                src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${userAvatar}`}
                alt="Avatar"
                className="aspect-square w-full rounded-full"
                width="112"
                height="112"
              />
              {style === "primary" && (
                <button
                  className="absolute aspect-square rounded-full bg-gray-2 p-xs"
                  style={{ bottom: "-8px", left: "-4px" }}
                >
                  <AddCircleOutlineIcon className="text-t-secondary" />
                </button>
              )}
            </figure>
          </>
        ) : (
          <>
            <figure className="relative mr-md aspect-square w-10 lg:w-14">
              <Image
                src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${userAvatar}`}
                alt="Avatar"
                className="aspect-square w-full rounded-full"
                width="112"
                height="112"
              />

            </figure>
            <div className="flex flex-grow items-start justify-start space-x-2">
              <span className="font-semibold">
                {userInfoProp?.nickname} (Opponent)
              </span>
              <span className="">{userInfoProp?.eloArcade}</span>
              <span
                className={`fi fi-${userInfoProp?.countryCode.toLocaleLowerCase()} ml-md text-xl`}
              ></span>
            </div>
            <div>
                  <Timer extraClasses="">{userInfoProp.timer ? userInfoProp.timer : "5:00"}</Timer>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
