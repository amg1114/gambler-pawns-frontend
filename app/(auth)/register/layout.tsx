import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "The Gambler Pawns register page.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
