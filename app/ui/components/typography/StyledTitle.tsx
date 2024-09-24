import { bungee, azeret_mono } from "@/app/ui/fonts";

const styleClasses = {
  h1: { className: `text-3xl font-bold mb-xl`, fontFamily: bungee.className },
  h2: {
    className: `text-2xl font-semibold mb-lg`,
    fontFamily: azeret_mono.className,
  },
  h3: {
    className: `text-xl font-semibold mb-md`,
    fontFamily: azeret_mono.className,
  },
  h4: {
    className: `text-xl font-semibold mb-sm`,
    fontFamily: azeret_mono.className,
  },
};

const fontClasses = {
  bungee: bungee.className,
  azeret_mono: azeret_mono.className,
};

type TitleLevels = keyof typeof styleClasses;

interface StyledTitleProps {
  variant?: TitleLevels;
  extraClasses?: string;
  children: React.ReactNode;
  fontFamily?: keyof typeof fontClasses;
}

export default function StyledTitle({
  children,
  variant,
  extraClasses,
  fontFamily,
}: StyledTitleProps) {
  const CustomTag = variant || ("h2" as keyof JSX.IntrinsicElements);
  let className = styleClasses[variant || "h2"].className;

  if (fontFamily) {
    className += ` ${fontClasses[fontFamily]}`;
  } else {
    className += ` ${styleClasses[variant || "h2"].fontFamily}`;
  }

  return (
    <CustomTag className={`${className} ${extraClasses}`}>{children}</CustomTag>
  );
}
