import { User } from "@/app/lib/interfaces/models/user.interface";
import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledSelect, {
  StyledSelectOption,
} from "@/app/ui/components/forms/StyledSelect";
import axios from "@/app/lib/_axios";
import { Session } from "next-auth";
import { FormEvent, useEffect, useState } from "react";
import { Country } from "@/app/lib/interfaces/responses/countries-res.interface";
import { z } from "zod";
import { useEditForms } from "../_hooks/useEditUser.hook";
import GameAlert from "@/app/ui/components/modals/GameAlert";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import ErrorIcon from "@mui/icons-material/Error";
import FormButtons from "./FormButtons";
export const editUserSchema = z.object({
  nickname: z.string().min(3, { message: "Nickname is too short" }).optional(),
  email: z.string().email().optional(),
  countryCode: z.string().min(2, { message: "Invalid country" }).optional(),
  dateOfBirth: z.string().date().optional(),
});

export default function DetailsForm({
  session,
  sessionUpdate,
  setShowSuccessAlert,
}: {
  session: Session;
  sessionUpdate: (session: Session) => Promise<Session | null>;
  setShowSuccessAlert: (value: boolean) => void;
}) {
  const [data, setData] = useState<User>(session.data);
  const [hasChanges, setChanges] = useState(false);

  const [countryList, setCountryList] = useState<StyledSelectOption[]>([]);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string[];
  } | null>(null);

  const {
    updateSession,
    sendUserDetailUpdates,
    getEditedUserChanges,
    userDataHasErrors,
  } = useEditForms();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
    try {
      editUserSchema.parse({ [name]: value });
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
    setData(session.data);
    setChanges(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasChanges) {
      const newData = getEditedUserChanges(data, session!);
      const hasErrors = userDataHasErrors(newData!, editUserSchema);

      if (hasErrors) {
        setErrorMessage("Invalid data entered");
        setShowErrorAlert(true);

        console.log("Invalid data entered");
        return;
      }

      if (newData) {
        const { success, changes } = await sendUserDetailUpdates(
          newData!,
          session!,
        );

        if (success) {
          await updateSession(changes!, session, sessionUpdate);
        } else {
          setErrorMessage("An error occurred while updating your profile");
          setShowErrorAlert(true);
          return;
        }
      }
    }

    setShowSuccessAlert(true);
    handleReset();
    return;
  };

  useEffect(() => {
    if (countryList.length > 0) return;

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
  }, [countryList.length]);

  return (
    <form className="space-y-sm" onSubmit={(e) => handleSubmit(e)}>
      <StyledInput
        label="Nickname"
        type="text"
        name="nickname"
        id="nickname"
        placeholder="johndoe"
        value={data.nickname || ""}
        onChange={handleChange}
        errorMessages={validationErrors?.nickname ?? []}
      />
      <StyledInput
        label="E-mail"
        type="text"
        name="email"
        id="email"
        placeholder="example@mailer.com"
        value={data.email || ""}
        onChange={handleChange}
        errorMessages={validationErrors?.email ?? []}
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
          value={data.countryCode || ""}
        />
        <StyledInput
          label="Birth Date"
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          placeholder="1990-01-01"
          onChange={handleChange}
          value={data.dateOfBirth || ""}
          errorMessages={validationErrors?.dateOfBirth ?? []}
        />
      </div>

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

      <FormButtons handleReset={handleReset} hasChanges={hasChanges} />
    </form>
  );
}
