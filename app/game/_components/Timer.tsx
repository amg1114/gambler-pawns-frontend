import AccessTimeIcon from "@mui/icons-material/AccessTime";
export default function Timer({
  extraClasses,
  children,
}: {
  extraClasses?: string;
  children?: React.ReactNode;
}) {
  return (

    <div
      className={`flex items-center rounded-base bg-primary p-xs align-middle font-bold text-dark-1 ${extraClasses}`}
    >
      <AccessTimeIcon className="text-light-1 mx-xs" />
      {children}
    </div>

  );
}
