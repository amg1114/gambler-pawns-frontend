import Link from "next/link";

interface StyledLinkProps {
    children: React.ReactNode;
    href: string;
    extraClasses?: string;
}
export default function StyledLink({
    children,
    href,
    extraClasses,
}: StyledLinkProps) {
    return (
        <Link href={href} className={`text-primary underline transition-colors hover:text-secondary ${extraClasses}`}>
            {children}
        </Link>
    );
}
