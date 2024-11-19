export default function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string | React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center rounded-base p-xs text-sm transition-colors hover:bg-primary hover:text-dark-2"
      onClick={onClick}
    >
      <span className="">{icon}</span>
      {label}
    </button>
  );
}
