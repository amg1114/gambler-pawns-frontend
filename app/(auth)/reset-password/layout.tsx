import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "The Gambler Pawns Reset Password page.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
