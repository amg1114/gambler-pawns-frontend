"use client";

// Libs
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { z, ZodError } from "zod";

import axios from "@/app/lib/_axios";

import { Country } from "@/app/lib/interfaces/responses/countries-res.interface";
import { User } from "@/app/lib/interfaces/models/user.interface";
import { UpdateUserResponse } from "@/app/lib/interfaces/responses/updateUser-res.interface";
import { useRouter } from "next/navigation";

// Components
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import GameAlert from "@/app/ui/components/modals/GameAlert";

import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledSelect, {
  StyledSelectOption,
} from "@/app/ui/components/forms/StyledSelect";

import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import PageLoadSpinner from "@/app/ui/components/PageLoadSpinner";

const schema = z.object({
  nickname: z.string().min(3, { message: "Nickname is too short" }).optional(),
  email: z.string().email().optional(),
  countryCode: z.string().min(2, { message: "Invalid country" }).optional(),
  dateOfBirth: z.string().date().optional(),
});

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [form, setForm] = useState<User | null>(null);
  const [changes, setChanges] = useState<Partial<User> | null>(null);

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationError] = useState<{
    [key: string]: string[];
  } | null>(null);

  const [countryList, setCountryList] = useState<StyledSelectOption[]>([]);

  useEffect(() => {
    if (session) {
      setForm(session.data);
    }
  }, [session]);

  useEffect(() => {
    if (countryList.length > 0) {
      return;
    }
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountryList(
          res.data
            .map((country) => ({
              value: country.cca2,
              label: country.name.common,
            }))
            .sort((a, b) => a.label.localeCompare(b.label)),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [countryList]);

  const updateSession = async () => {
    const newSession = {
      ...session,
      data: {
        ...session!.data,
        ...form,
      },
    };

    await update(newSession);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const property = e && (e.target.name as keyof User);
    const value = e.target.value;

    if (!property || Object.keys(session!.data).indexOf(property) === -1) {
      throw new Error(`Property '${property}' not found`);
    }

    setForm((prev) =>
      prev
        ? {
            ...prev,
            [property]: value,
          }
        : prev,
    );

    try {
      schema.parse({
        [property]: value,
      });
      setValidationError((prev) => ({
        ...prev,
        [property]: [],
      }));
    } catch (err: ZodError | any) {
      if (err instanceof ZodError) {
        const messages = err.errors.map((error) => error.message);
        setValidationError((prev) => {
          return {
            ...prev,
            [property]: messages,
          };
        });
        return;
      }
      return;
    }

    if (session?.data[property] === value) {
      return;
    }

    setChanges((prev) =>
      prev === null
        ? { [property]: value }
        : {
            ...prev,
            [property]: value,
          },
    );

    setIsFormChanged(true);
  };

  const handleSubmit = () => {
    if (!changes) {
      setErrorMessage("No changes detected");
      setShowErrorAlert(true);

      return;
    }

    axios
      .patch<UpdateUserResponse>(`/user/${session?.data.userId}`, changes)
      .then((res) => {
        updateSession()
          .then(() => {
            setShowSuccessAlert(true);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        console.error("Error updating user", err);
        setErrorMessage(err.response.data.data.message);
        setShowErrorAlert(true);
      });
  };

  if (status === "loading") {
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
          <form className="space-y-sm">
            <StyledInput
              label="Nickname"
              type="text"
              name="nickname"
              id="nickname"
              errorMessages={validationErrors?.nickname ?? []}
              placeholder="johndoe"
              value={form?.nickname || ""}
              onInput={handleChange}
            />
            <StyledInput
              label="E-mail"
              type="text"
              name="email"
              id="email"
              placeholder="example@mailer.com"
              errorMessages={validationErrors?.email ?? []}
              value={form?.email || ""}
              onInput={handleChange}
            />
            <div className="grid lg:grid-cols-2 lg:gap-md">
              <StyledSelect
                label="Country"
                name="countryCode"
                options={countryList}
                onChange={handleChange}
                defaultOption={{
                  label: "Select a country",
                  value: "",
                }}
                value={form?.countryCode || ""}
              />
              <StyledInput
                label="Birth Date"
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                placeholder="1990-01-01"
                errorMessages={validationErrors?.dateOfBirth ?? []}
                onInput={handleChange}
                value={form?.dateOfBirth || ""}
              />
            </div>
          </form>
        </section>
        <section>
          <StyledTitle
            extraClasses="uppercase text-center mb-lg"
            fontFamily="bungee"
          >
            Change Password
          </StyledTitle>
          <form className="space-y-sm">
            <StyledInput
              label="Current Password"
              type="password"
              placeholder="********"
            />
            <StyledInput
              label="New Password"
              type="password"
              placeholder="********"
            />
          </form>
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
            onClick={() => {
              setForm(null);
              setChanges(null);
              setIsFormChanged(false);
              router.back();
            }}
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
        <GameAlert close={() => setShowErrorAlert(false)}>
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
