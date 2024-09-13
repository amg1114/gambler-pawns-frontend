export default function StyleGuidePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full px-md md:w-4/5 md:max-w-screen-sm mx-auto">
      {children}
    </main>
  );
}
