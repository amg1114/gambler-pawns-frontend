import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification",
};

export default function NotifyPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto px-md md:w-4/5 md:max-w-screen-lg">
      {children}
    </main>
  );
}
