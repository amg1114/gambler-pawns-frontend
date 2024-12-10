export default function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="flex shrink-0 flex-col flex-wrap items-center justify-center gap-sm rounded-base p-sm transition-colors hover:bg-primary hover:text-dark-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
