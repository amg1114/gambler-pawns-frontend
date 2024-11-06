"use client";
//Libs
import "/node_modules/flag-icons/css/flag-icons.min.css";

//Components
import Image from "next/image";
import Timer from "./Timer";

//Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface userDataInterface {
  nickname: string;
  eloRating: number;
  countryCode: string;
  userAvatar: string;
  timer: string;
}

interface LoadingState {
  isLoading: true;
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
      <div className="flex items-center justify-center">
        <Timer>{timer}</Timer>
      </div>
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
          <button
            className="absolute aspect-square rounded-full bg-gray-2 p-xs"
            style={{ bottom: "-8px", left: "-4px" }}
          >
            <AddCircleOutlineIcon className="text-t-secondary" />
          </button>
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

function SkelentonUserInfo() {
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
        <Timer>5:00</Timer>
      </div>
    </>
  );
}

export default function UserInfo(props: UserInfoProps) {
  // const [userAvatar, setUserAvatar] = useState("1.png");

  // useEffect(() => {
  //   console.log(userInfoProp);
  //   if (userInfoProp) {
  //     setUserAvatar(userInfoProp?.user.userAvatarImg.fileName || "1.png");
  //   }
  // }, [userInfoProp]);

  if (props.isLoading) {
    return (
      <div className="my-lg flex w-full">
        <SkelentonUserInfo />
      </div>
    );
  }

  return (
    <>
      <div className="my-lg flex w-full">
        {props.isCurrentPlayer ? (
          <CurrentUserInfo {...props.userData} />
        ) : (
          <OpponentUserInfo {...props.userData} />
        )}
      </div>
    </>
  );
}
