"use client";
//Libs
import "/node_modules/flag-icons/css/flag-icons.min.css";

//Components
import Image from "next/image";
import Timer from "./Timer";
import { formatTimer } from "../[id]/_utils/formatTimer.utils";

export interface userDataInterface {
  nickname: string;
  eloRating: number;
  countryCode: string;
  userAvatar: string;
  timer: string | number;
}

interface LoadingState {
  isLoading: true;
  timer: string | number;
}

interface LoadedState {
  isLoading: false;
  userData: userDataInterface;
  isCurrentPlayer: boolean;
}

type UserInfoProps = LoadingState | LoadedState;

function CurrentUserInfo({
  nickname,
  eloRating,
  countryCode,
  userAvatar,
  timer,
}: userDataInterface) {
  if (!countryCode) return null;
  return (
    <>
      <Timer>{formatTimer(timer.toString() ?? "5:00")}</Timer>

      <div className="ml-sm flex flex-grow items-end justify-end space-x-2">
        <span
          className={`fi fi-${countryCode.toLocaleLowerCase()} ml-md text-xl`}
        ></span>
        <span>{eloRating}</span>
        <span className="font-semibold">{nickname} (You)</span>
        <figure className="relative ml-md aspect-square w-10 lg:w-14">
          <Image
            src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${userAvatar}`}
            alt="Avatar"
            className="aspect-square w-full rounded-full"
            width="112"
            height="112"
          />
          {/* <button
            className="absolute aspect-square rounded-full bg-gray-2 p-xs"
            style={{ bottom: "-8px", left: "-4px" }}
          >
            <AddCircleOutlineIcon className="text-t-secondary" />
          </button> */}
        </figure>
      </div>
    </>
  );
}

function OpponentUserInfo({
  nickname,
  eloRating,
  countryCode,
  userAvatar,
  timer,
}: userDataInterface) {
  if (!countryCode) return null;

  return (
    <>
      <figure className="relative aspect-square w-10 lg:w-14">
        <Image
          src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${userAvatar}`}
          alt="Avatar"
          className="aspect-square w-full rounded-full"
          width="112"
          height="112"
        />
      </figure>
      <div className="flex flex-grow items-start justify-start space-x-2">
        <span className="font-semibold">{nickname} (Opponent)</span>
        <span>{eloRating}</span>
        <span
          className={`fi fi-${countryCode.toLocaleLowerCase()} ml-md text-xl`}
        ></span>
      </div>

      <Timer>{timer}</Timer>
    </>
  );
}

function SkelentonUserInfo(props: { timer: string | number }) {
  return (
    <>
      <div className="mr-sm flex aspect-square w-10 items-center justify-center rounded-full bg-light text-t-secondary lg:w-14">
        ??
      </div>
      <div className="flex-1 items-start justify-start space-x-2">
        <span className="p-xs font-semibold">??</span>
        <span className="p-xs">??</span>
        <span className="mr-lg rounded-base bg-dark-2 p-xs">????</span>
      </div>
      <div className="flex items-center">
        <Timer>{formatTimer(props.timer.toString() ?? "5:00")}</Timer>
      </div>
    </>
  );
}

export default function UserInfo(props: UserInfoProps) {
  if (props.isLoading) {
    return <SkelentonUserInfo timer={props.timer} />;
  }

  return (
    <>
      <div className="flex w-full gap-md">
        {props.isCurrentPlayer ? (
          <CurrentUserInfo {...props.userData} />
        ) : (
          <OpponentUserInfo {...props.userData} />
        )}
      </div>
    </>
  );
}
