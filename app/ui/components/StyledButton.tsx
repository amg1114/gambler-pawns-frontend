import { nunito } from "@/app/ui/fonts";

interface StyledButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    style?: "filled" | "outlined";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const styleClasses = {
    filled: {
        primary: "bg-primary text-secondary hover:bg-secondary hover:text-primary",
        secondary: "bg-secondary text-white hover:bg-primary hover:text-secondary",
    },
    outlined: {
        primary: "border border-2 border-primary text-primary hover:bg-primary hover:text-secondary",
        secondary: "border border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary",
    },
};

export default function StyledButton(props: StyledButtonProps) {
    const { children } = props;
    return (
        <button
            className={`${styleClasses[props.style || "filled"][ props.variant || "primary"]} w-fit shrink-0 px-4 py-2 rounded ${nunito.className} font-bold cursor-pointer transition-colors` 
            }
        >
            {children}
        </button>
    );
}
