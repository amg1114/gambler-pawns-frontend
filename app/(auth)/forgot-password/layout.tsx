import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "The page to reset your password",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
