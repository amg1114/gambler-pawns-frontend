import { Suspense } from "react";

export default function LayoutGame({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Suspense>{children}</Suspense>;
}
