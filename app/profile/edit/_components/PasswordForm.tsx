import StyledInput from "@/app/ui/components/forms/StyledInput";
import { updatePasswordSchema } from "@/app/lib/interfaces/auth.interface";
import { z } from "zod";
import { FormEvent, useState } from "react";
import type { PasswordForm } from "@/app/lib/interfaces/models/password-form.interface";
import FormButtons from "./FormButtons";
import { useEditPassword, userDataHasErrors } from "../_hooks/useEditUser.hook";
import { Session } from "next-auth";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import ErrorIcon from "@mui/icons-material/Error";
export default function PasswordForm({
  session,
  setShowSuccessAlert,
}: {
  session: Session;
  setShowSuccessAlert: (value: boolean) => void;
}) {
  const [hasChanges, setChanges] = useState(false);
  const [data, setData] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string[];
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedData = {
      ...data,
      [name]: value,
    };

    try {
      updatePasswordSchema.parse({ [name]: value });
      setData(updatedData);
      setValidationErrors((prev) => {
        return {
          ...prev,
          [name]: [],
        };
      });
      setChanges(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const messages = err.errors[0].message;
        setValidationErrors((prev) => {
          return {
            ...prev,
            [name]: [messages],
          };
        });
        return;
      }
    }
  };

  const handleReset = () => {
    setData({
      currentPassword: "",
      newPassword: "",
    });
    setValidationErrors(null);
    setChanges(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasChanges) {
      const hasErrors = userDataHasErrors(data, updatePasswordSchema);
      if (hasErrors) {
        setErrorMessage("Password fields are Invalid");
        setShowErrorAlert(true);
        return;
      }
    }
    const { success, message } = await useEditPassword(data, session);

    if (success) {
      setShowSuccessAlert(true);
      return;
    }

    setErrorMessage(message);
    setShowErrorAlert(true);
    return;
  };

  return (
    <form className="space-y-sm" onSubmit={(e) => handleSubmit(e)}>
      <StyledInput
        label="Current Password"
        name="currentPassword"
        type="password"
        placeholder="********"
        onInput={handleChange}
        errorMessages={validationErrors?.currentPassword ?? []}
      />
      <StyledInput
        label="New Password"
        name="newPassword"
        type="password"
        placeholder="********"
        onInput={handleChange}
        errorMessages={validationErrors?.newPassword ?? []}
      />

      <FormButtons handleReset={handleReset} hasChanges={hasChanges} />

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
    </form>
  );
}
