import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "The Gambler Pawns login page.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
