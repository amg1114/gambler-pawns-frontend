"use client";

//libs
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

//components
import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

//icons
import ErrorIcon from "@mui/icons-material/Error";
import { resetPasswordRequest } from "@/app/lib/services/auth";
import {
  ResetPasswordForm,
  resetPasswordSchema,
} from "@/app/lib/interfaces/auth.interface";

function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!token) router.push("/");
  }, [token]);

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    console.log("Entrando al onSubmit");
    if (!token) return;
    try {
      const res = await resetPasswordRequest({
        token,
        newPassword: data.newPassword,
        confirmPassword: "",
      });
      if (res.status === 200) {
        setSuccessMessage("Password has been reset successfully");
        setShowSuccessAlert(true);
        return;
      } else if (res.status === 401) {
        setErrorMessage("Invalid token");
        setShowErrorAlert(true);
        return;
      }
      throw new Error();
    } catch (error) {
      setErrorMessage("Failed to reset password, please try again");
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
              <span>Reset Password</span>
            </StyledTitle>
            <StyledInput
              label="New Password"
              type="password"
              inputExtraClasses="bg-secondary mb-md"
              wrapperExtraClasses="mb-md min-[700px]:px-md"
              {...register("newPassword")}
              id="newPassword"
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <span className="pb-sm text-error">
                {errors.newPassword.message}
              </span>
            )}
            <StyledInput
              label="Confirm Password"
              type="password"
              inputExtraClasses="bg-secondary mb-md"
              wrapperExtraClasses="mb-md min-[700px]:px-md"
              {...register("confirmPassword")}
              id="confirmPassword"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <span className="pb-sm text-error">
                {errors.confirmPassword.message}
              </span>
            )}
            <div className="flex items-center justify-center pt-lg">
              <button
                type="submit"
                className="hover:rounded-md mx-lg w-fit p-sm text-xl font-extrabold text-primary underline underline-offset-8 hover:bg-secondary"
              >
                Submit
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

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
