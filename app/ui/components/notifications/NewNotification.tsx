import StyledTitle from "../typography/StyledTitle";
import StyledButton from "../typography/StyledButton";
import StyledParagraph from "../typography/StyledParagraph";
import Image from "next/image";
import useNotificationsWebSockets from "@/app/notification/_hook/useNotificationsWebSockets";
import { Notification } from "@/app/lib/interfaces/responses/notify-res-interface";

interface NewNotificationProps {
  newNotification: Notification;
  onNotificationRead: () => void;
}

export default function NewNotification({
  newNotification,
  onNotificationRead,
}: NewNotificationProps) {
  const { handleClickAction } = useNotificationsWebSockets(
    newNotification.notificationId,
    newNotification.actionLink1,
    newNotification.actionLink2,
  );

  const handleNotificationClick = () => {
    handleClickAction();
    onNotificationRead();
  };

  return (
    <div
      key={newNotification.notificationId}
      className="lg:scale-85 fixed bottom-0 right-0 z-50 h-auto w-auto max-w-sm transform rounded-base bg-dark-2 p-md shadow-xl transition-all duration-300 ease-in-out sm:max-w-sm sm:scale-100 md:max-w-md md:scale-100 lg:max-w-auto xl:max-w-auto xl:scale-100"
    >
      <StyledTitle variant="h3" extraClasses="text-center">
        {newNotification.title}
      </StyledTitle>
      <Image
        src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${newNotification.userWhoSend?.userAvatarImg.fileName}`}
        alt={`${newNotification.userWhoSend?.nickname}'s avatar`}
        className="mx-auto mb-md w-2xl rounded-full"
        width={52}
        height={52}
      />
      <StyledParagraph extraClasses="text-center">
        {newNotification.userWhoSend?.nickname} {newNotification.message}
      </StyledParagraph>
      <div className="flex justify-center">
        {newNotification.actionText1 && (
          <StyledButton
            variant="primary"
            extraClasses="text-center mx-sm"
            onClick={handleNotificationClick}
          >
            {newNotification.actionText1}
          </StyledButton>
        )}
        {newNotification.actionText2 && (
          <StyledButton
            variant="primary"
            style="outlined"
            onClick={handleNotificationClick}
          >
            {newNotification.actionText2}
          </StyledButton>
        )}
      </div>
    </div>
  );
}
