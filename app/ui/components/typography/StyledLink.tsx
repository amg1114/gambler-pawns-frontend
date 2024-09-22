import Link from "next/link";
import { nunito } from "../../fonts";

const styleClasses = {
    plain: {
        primary: "text-primary underline hover:text-secondary",
        secondary: "text-secondary underline hover:text-primary",
    },
    filled: {
        primary:
            "bg-primary text-secondary hover:bg-secondary hover:text-primary",
        secondary:
            "bg-secondary text-white hover:bg-primary hover:text-secondary",
    },
    outlined: {
        primary:
            "border border-2 border-primary text-primary hover:bg-primary hover:text-secondary",
        secondary:
            "border border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary",
    },
};

interface StyledLinkProps {
    children: React.ReactNode;
    href: string;
    extraClasses?: string;
    style?: keyof typeof styleClasses;
    variant?: "primary" | "secondary";
}

export default function StyledLink({
    children,
    href,
    extraClasses,
    ...props
}: StyledLinkProps) {
    return (
        <Link
            href={href}
            className={`${styleClasses[props.style || "plain"][props.variant || "primary"]} w-fit shrink-0 rounded-base px-md py-sm text-center ${nunito.className} transition-colors hover:text-secondary ${extraClasses}`}
        >
            {children}
        </Link>
    );
}
