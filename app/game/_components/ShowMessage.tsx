export default function ShowMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center border-2 border-error bg-error bg-opacity-15 p-sm">
      <p className="text-center">{message}</p>
    </div>
  );
}
