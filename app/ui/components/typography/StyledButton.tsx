import { nunito } from "@/app/ui/fonts";
import clsx from "clsx";

/**
 * StyledButton component
 * @param {React.ReactNode} children - The content of the button
 * @param {"primary" | "secondary"} variant - The variant of the button
 * @param {"filled" | "outlined"} style - The style of the button
 * @param {string} extraClasses - Extra classes to be added to the button
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} onClick - The click event handler
 * @returns {JSX.Element} The styled button component
 */
interface StyledButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  style?: "filled" | "outlined";
  type?: "button" | "submit" | "reset";
  extraClasses?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const styleClasses = {
  filled: {
    primary: "bg-primary text-secondary hover:bg-secondary hover:text-primary",
    secondary: "bg-secondary text-white hover:bg-primary hover:text-secondary",
  },
  outlined: {
    primary:
      "border border-2 border-primary text-primary hover:bg-primary hover:text-secondary",
    secondary:
      "border border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary",
  },
};

export default function StyledButton(props: StyledButtonProps) {
  const { children, extraClasses, onClick } = props;
  return (
    <button
      className={clsx(
        `relative ${styleClasses[props.style || "filled"][props.variant || "primary"]} w-fit shrink-0 rounded-base px-md py-sm ${nunito.className} cursor-pointer font-bold transition-colors ${extraClasses}`,
        {
          "!pointer-events-none cursor-not-allowed": props.disabled,
        },
      )}
      onClick={(e) => {
        if (!props.disabled) onClick;
      }}
    >
      {children}
      {props.disabled && (
        <span className="absolute inset-0 h-full w-full bg-dark-2/30"></span>
      )}
    </button>
  );
}
