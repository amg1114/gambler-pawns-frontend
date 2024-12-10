"use client";

//libs
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

//components
import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

//icons
import ErrorIcon from "@mui/icons-material/Error";
import { sendForgotPasswordEmailRequest } from "@/app/lib/services/auth";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "@/app/lib/interfaces/auth.interface";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      const res = await sendForgotPasswordEmailRequest({ email: data.email });
      if (res.status === 200) {
        setSuccessMessage("The recovery email has been sent successfully");
        setShowSuccessAlert(true);
        return;
      }
      throw new Error();
    } catch {
      setErrorMessage("Failed to send recovery email, please try again");
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <div className="relative z-0 mx-lg mt-lg grid-cols-2 overflow-clip bg-secondary p-lg min-[700px]:grid min-[1200px]:ml-[300px] min-[1200px]:mr-[200px]">
        <div
          className="absolute right-0 -z-10 h-80 rotate-3 transform bg-primary"
          style={{ bottom: "-40px", width: "1500px", left: "-20px" }}
        ></div>
        <div className="z-10 col-span-1 min-h-[520px] w-full bg-dark-2 p-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <StyledTitle
              fontFamily="bungee"
              extraClasses="text-4xl flex justify-center items-center"
            >
              <span>Account Recovery</span>
            </StyledTitle>
            <div className="flex">
              <StyledParagraph extraClasses="text-center">
                Enter your email to receive a recovery link:
              </StyledParagraph>
            </div>
            <StyledInput
              label="Email"
              type="email"
              inputExtraClasses="bg-secondary mb-md"
              wrapperExtraClasses="mb-md"
              {...register("email")}
              id="email"
              placeholder="user@example.com"
            />
            {errors.email && (
              <span className="pb-sm text-error">{errors.email.message}</span>
            )}
            <div className="flex items-center justify-center pt-lg">
              <button
                type="submit"
                className="hover:rounded-md mx-lg w-fit p-sm text-xl font-extrabold text-primary underline underline-offset-8 hover:bg-secondary"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      {showErrorAlert && (
        <GameAlert close={() => setShowErrorAlert(false)}>
          <StyledTitle extraClasses="text-center !flex items-center justify-center gap-sm">
            <ErrorIcon className="!text-4xl text-error" /> Error
          </StyledTitle>
          <StyledParagraph extraClasses="text-center">
            {errorMessage}
          </StyledParagraph>
        </GameAlert>
      )}
      {showSuccessAlert && (
        <GameAlert close={() => setShowSuccessAlert(false)}>
          <StyledTitle extraClasses="text-center !flex items-center justify-center gap-sm">
            Success
          </StyledTitle>
          <StyledParagraph extraClasses="text-center">
            {successMessage}
          </StyledParagraph>
        </GameAlert>
      )}
    </>
  );
}
