import Image from "next/image";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";

interface StatsCardProps {
  title: string;
  imgSrc: any;
  imgAlt: string;
  statValue: string | number;
  description: string | null;
  extraClasses?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  imgSrc,
  imgAlt,
  statValue,
  description,
}) => {
  return (
    <div className="flex h-40 w-32 flex-col items-center justify-center space-y-3 rounded-base bg-dark-1 shadow-lg">
      <StyledTitle variant="h3" extraClasses="space-y-auto">
        {title}
      </StyledTitle>
      <Image src={imgSrc} alt={imgAlt} className="h-12 w-9 space-y-auto" />
      <p className="text-slate-300 text-lg">
        {statValue} {description}
      </p>
    </div>
  );
};

export default StatsCard;
