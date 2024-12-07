import { User } from "@/app/lib/interfaces/models/user.interface";
import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledSelect, {
  StyledSelectOption,
} from "@/app/ui/components/forms/StyledSelect";
import axios from "@/app/lib/_axios";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Country } from "@/app/lib/interfaces/responses/countries-res.interface";

export default function DetailsForm({
  data,
  setData,
}: {
  data: User;
  setData: (data: User) => void;
}) {
  const [countryList, setCountryList] = useState<StyledSelectOption[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (value && data[name as keyof User] !== value) {
      setData({
        ...data,
        [name]: value,
      });
    }
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
  }, []);

  return (
    <form className="space-y-sm">
      <StyledInput
        label="Nickname"
        type="text"
        name="nickname"
        id="nickname"
        placeholder="johndoe"
        value={data.nickname || ""}
        onInput={handleChange}
      />
      <StyledInput
        label="E-mail"
        type="text"
        name="email"
        id="email"
        placeholder="example@mailer.com"
        value={data.email || ""}
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
          value={data.countryCode || ""}
        />
        <StyledInput
          label="Birth Date"
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          placeholder="1990-01-01"
          onInput={handleChange}
          value={data.dateOfBirth || ""}
        />
      </div>
    </form>
  );
}
