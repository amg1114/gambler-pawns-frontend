"use client";

// Libs
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import GameAlert from "@/app/ui/components/modals/GameAlert";

import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import DetailsForm from "./_components/DetailsForm";
import PasswordForm from "./_components/PasswordForm";

export default function ProfileEditPage() {
  const { data: session, update } = useSession();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  if (!session) {
    return <PageLoadSpinner />;
  }

  return (
    <>
      <section className="mx-auto w-full space-y-xl px-md py-xl lg:max-w-96 lg:px-none">
        <section>
          <StyledTitle
            extraClasses="uppercase text-center mb-lg"
            fontFamily="bungee"
          >
            Account Settings
          </StyledTitle>

          <DetailsForm
            session={session!}
            sessionUpdate={update}
            setShowSuccessAlert={setShowSuccessAlert}
          />
        </section>

        <section>
          <StyledTitle
            extraClasses="uppercase text-center mb-lg"
            fontFamily="bungee"
          >
            Change Password
          </StyledTitle>
          <PasswordForm
            session={session!}
            setShowSuccessAlert={setShowSuccessAlert}
          />
        </section>
      </section>

      {showSuccessAlert && (
        <GameAlert close={() => setShowSuccessAlert(false)} size="large">
          <StyledTitle extraClasses="text-center">
            <CheckCircleIcon className="!text-4xl text-primary" /> Success
          </StyledTitle>
          <StyledParagraph extraClasses="text-center">
            Your profile has been successfully updated
          </StyledParagraph>
        </GameAlert>
      )}
    </>
  );
}
