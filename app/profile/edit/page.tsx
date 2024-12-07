"use client";

// Libs
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { User } from "@/app/lib/interfaces/models/user.interface";
import { useRouter } from "next/navigation";

import {
  useEditDetails,
  useEditPassword,
  useGetEditedUserChanges,
} from "./_hooks/useEditUser.hook";
import { PasswordForm as PasswordFormInterface } from "@/app/lib/interfaces/models/password-form.interface";

// Components
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import GameAlert from "@/app/ui/components/modals/GameAlert";

import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";
import DetailsForm from "./_components/DetailsForm";
import PasswordForm from "./_components/PasswordForm";

export default function ProfileEditPage() {
  const router = useRouter();

  const { data: session, update } = useSession();
  const [hasChanges, setChanges] = useState(false);

  const [detailsForm, setDetailsForm] = useState<User | null>(null);
  const [passwordForm, setPasswordForm] =
    useState<PasswordFormInterface | null>({
      currentPassword: "",
      newPassword: "",
    });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!session) {
      return;
    }

    setDetailsForm(session.data);
  }, [session]);

  const handleSubmit = async () => {
    if (hasChanges) {
      if (detailsForm) {
        const newData = useGetEditedUserChanges(detailsForm, session!);

        if (newData) {
          const { success, changes } = await useEditDetails(newData!, session!);

          if (success) {
            setChanges(false);
            updateSession(changes!);
          } else {
            setErrorMessage("An error occurred while updating your profile");
            setShowErrorAlert(true);
            return;
          }
        }
      }

      if (passwordForm) {
        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
          setErrorMessage("Please fill in all fields");
          setShowErrorAlert(true);
          return;
        }

        const { success, message } = await useEditPassword(
          passwordForm,
          session!,
        );

        if (success) {
          setPasswordForm(null);
        } else {
          if (errorMessage) {
            setErrorMessage((val) => val + " and " + message);
          } else {
            setErrorMessage(message);
          }

          setShowErrorAlert(true);
          return;
        }
      }
      setShowSuccessAlert(true);
      handleReset();
      return;
    }

    setShowErrorAlert(true);
    setErrorMessage("No changes were made");
  };

  const handleChanges = (
    form: "details" | "password",
    value: typeof detailsForm | typeof passwordForm,
  ) => {
    if (form === "details") {
      const changes = useGetEditedUserChanges(value as User, session!);
      if (changes) {
        setChanges(true);
        setDetailsForm(value as typeof detailsForm);
      }
    } else {
      setPasswordForm(value as typeof passwordForm);
      setChanges(true);
    }
  };

  const handleReset = () => {
    setDetailsForm(session!.data);
    setPasswordForm(null);
    setChanges(false);

    router.back();
  };

  const updateSession = async (newData: Partial<User>) => {
    const newSession = {
      ...session,
      data: {
        ...session!.data,
        ...newData,
      },
    };
    await update(newSession);
  };

  if (!detailsForm) {
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
            data={detailsForm!}
            setData={(data) => handleChanges("details", data)}
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
            data={passwordForm}
            setData={(data) => handleChanges("password", data)}
          />
        </section>

        <section className="flex justify-end gap-md lg:justify-center">
          <StyledButton
            extraClasses="min-w-32"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </StyledButton>
          <StyledButton
            extraClasses="min-w-32"
            style="outlined"
            onClick={() => handleReset()}
          >
            Discard
          </StyledButton>
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

      {showErrorAlert && (
        <GameAlert
          close={() => {
            setShowErrorAlert(false);
            setErrorMessage("");
          }}
        >
          <StyledTitle extraClasses="text-center !flex items-center justify-center gap-sm">
            <ErrorIcon className="!text-4xl text-error" /> Error
          </StyledTitle>
          <StyledParagraph extraClasses="text-center">
            {errorMessage}
          </StyledParagraph>
        </GameAlert>
      )}
    </>
  );
}
