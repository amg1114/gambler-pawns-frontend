import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a new game",
  description: "Choose your game options",
};
export default function ClassicOptionPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mt-xl">{children}</section>;
}
