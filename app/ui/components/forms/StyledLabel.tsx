import { azeret_mono } from "../../fonts";

interface StyledLabelProps {
    children: React.ReactNode;
    htmlFor?: string;
    extraClasses?: string;
}

export default function StyledLabel({
    children,
    htmlFor,
    extraClasses,
}: StyledLabelProps) {
    return (
        <label
            className={`pb-sm text-base font-bold ${extraClasses} ${azeret_mono.className} cursor-pointer`}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
}
