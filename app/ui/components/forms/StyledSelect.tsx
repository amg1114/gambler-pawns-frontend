import React from "react";
import StyledLabel from "./StyledLabel";

interface StyledSelectProps {
  options: StyledSelectOption[];
  label?: string;
  defaultOption?: StyledSelectOption;
  name?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  wrapperExtraClasses?: string;
  inputExtraClasses?: string;
  labelExtraClasses?: string;
  value?: string;
}

export interface StyledSelectOption {
  value: string;
  label: string;
}

export default function StyledSelect({
  label,
  value,
  wrapperExtraClasses,
  inputExtraClasses,
  options,
  defaultOption,
  onChange,
  ...props
}: StyledSelectProps) {
  return (
    <div className={`flex flex-col ${wrapperExtraClasses}`}>
      {label && <StyledLabel htmlFor={props.id}>{label}</StyledLabel>}
      <select
        className={`cursor-pointer rounded-base bg-dark-2 p-md`}
        onChange={onChange}
        value={value}
        {...props}
      >
        {defaultOption && (
          <option key={defaultOption.value} value={defaultOption.value}>
            {defaultOption.label}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
