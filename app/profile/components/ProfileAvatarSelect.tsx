// libs
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "@/app/lib/_axios";

// components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import { Avatar, AvatarRes } from "@/app/lib/interfaces/avatars-res.interface";

interface ProfileAvatarSelectProps {
    onClose: () => void;
    currentAvatarId: string | number;
}

export function ProfileAvatarSelect({
    onClose,
    currentAvatarId,
}: ProfileAvatarSelectProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [avatars, setAvatars] = useState<Avatar[]>([]);

    const closeHandler = (
        event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>,
    ) => {
        if (event instanceof KeyboardEvent && event.key !== "Escape") return;
        setIsClosing(true);
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
    }, [isClosing]);

    return (
        <div className="fixed inset-0 flex flex-wrap-reverse items-center justify-center bg-gray/70">
            <div
                className={clsx(`w-full max-w-lg`, {
                    "animate-fade-out-up": isClosing,
                    "animate-fade-in-down": !isClosing,
                })}
            >
                <header className="flex justify-end">
                    <button
                        className="text-xl"
                        onClick={(e) => closeHandler(e)}
                    >
                        &times;
                    </button>
                </header>
                <div className={`w-full rounded-base bg-primary p-lg`}>
                    <StyledTitle
                        extraClasses="!text-secondary text-center"
                        variant="h3"
                    >
                        Select yor Avatar
                    </StyledTitle>

                    <figure className="mx-auto mb-lg block w-28">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/assets/avatars/${currentAvatarId}`}
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
                            >
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/avatars/${avatar.userAvatarImgId}`}
                                    alt={`Avatar ${avatar.userAvatarImgId}`}
                                />
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
