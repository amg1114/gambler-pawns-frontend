import { nunito } from "@/app/ui/fonts";

interface StyledParagraphProps {
  children: React.ReactNode;
  extraClasses?: string;
}

export default function StyledParagraph({
  children,
  extraClasses,
}: StyledParagraphProps) {
  return (
    <p className={`text-base ${extraClasses} ${nunito.className} mb-md`}>
      {children}
    </p>
  );
}
