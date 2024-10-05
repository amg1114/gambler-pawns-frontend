import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "The page to view and edit your profile",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
