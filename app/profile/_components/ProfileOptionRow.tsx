import { nunito } from "@/app/ui/fonts";
import Link from "next/link";

interface ProfileOptionRowProps {
  children: React.ReactNode;
  href: string;
}

export default function ProfileOptionRow({
  children,
  href,
}: ProfileOptionRowProps) {
  return (
    <div className="group relative rounded-base bg-primary p-md transition-colors hover:bg-secondary">
      <Link
        href={href}
        className={`flex items-center gap-md text-xl text-secondary ${nunito.className} group-hover:text-primary`}
      >
        {children} <span className="absolute inset-0"></span>
      </Link>
    </div>
  );
}
