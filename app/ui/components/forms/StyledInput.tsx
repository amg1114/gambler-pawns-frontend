import React, { forwardRef } from "react";
import { azeret_mono, nunito } from "../../fonts";

interface StyledInputProps {
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  errorMessages?: string[];
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
  disabled?: boolean;
  wrapperExtraClasses?: string;
  inputExtraClasses?: string;
  labelExtraClasses?: string;
}
const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  function StyledInput(
    {
      label,
      wrapperExtraClasses,
      inputExtraClasses,
      labelExtraClasses,
      errorMessages,
      onInput,
      onBlur,
      onChange,
      onFocus,
      ...props
    },
    ref,
  ) {
    return (
      <div className={`flex flex-col ${wrapperExtraClasses}`}>
        {label && (
          <label
            className={`pb-sm text-base font-bold ${azeret_mono.className} ${labelExtraClasses} cursor-pointer`}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input
          className={`flex items-center border-0 text-white ${nunito.className} focus:ring-t-primary rounded-base bg-dark-2 p-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${inputExtraClasses}`}
          onInput={onInput}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={ref}
          {...props}
        />
        {errorMessages && (
          <div className="py-sm text-sm text-error">
            {errorMessages.map((errorMessage, index) => (
              <span key={`erro-lb-${index}`}>{errorMessage}</span>
            ))}
          </div>
        )}
      </div>
    );
  },
);
export default StyledInput;
