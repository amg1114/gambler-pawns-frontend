import React from "react";
import { azeret_mono, nunito } from "../../fonts";

interface StyledInputProps {
    label?: string;
    value?: string;
    name?: string;
    id?: string;
    onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
export default function StyledInput({
    label,
    wrapperExtraClasses,
    inputExtraClasses,
    labelExtraClasses,
    onInput,
    onBlur,
    onFocus,
    ...props
}: StyledInputProps) {
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
                className={`text-white flex items-center border-0 ${nunito.className} focus:ring-t-primary rounded-base bg-dark-2 p-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${inputExtraClasses}`}
                onInput={onInput}
                onBlur={onBlur}
                onFocus={onFocus}
                {...props}
            />
        </div>
    );
}
