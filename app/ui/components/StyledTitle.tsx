import { bungee, azeret_mono } from "../fonts";

const styleClasses = {
    h1: `text-3xl font-bold ${bungee.className} mb-xl`,
    h2: `text-2xl font-semibold ${azeret_mono.className} mb-lg`,
    h3: `text-xl font-semibold ${azeret_mono.className} mb-md`,
    h4: `text-xl font-semibold ${azeret_mono.className} mb-sm`,
};

type TitleLevels = keyof typeof styleClasses;

interface StyledTitleProps {
    variant?: TitleLevels;
    extraClasses?: string;
    children: React.ReactNode;
}

export default function StyledTitle({
    children,
    variant,
    extraClasses,
}: StyledTitleProps) {
    const CustomTag = variant || ("h2" as keyof JSX.IntrinsicElements);
    return (
        <CustomTag
            className={`${styleClasses[variant || "h2"]} mb- ${extraClasses}`}
        >
            {children}
        </CustomTag>
    );
}
