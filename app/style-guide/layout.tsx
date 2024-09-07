export default function StyleGuidePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen overflow-y-scroll flex-wrap justify-center bg-dark-1 text-light md:flex-row md:overflow-hidden">
      <div className="w-full px-md md:w-4/5 md:max-w-screen-sm">{children}</div>
    </main>
  );
}
