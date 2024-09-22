export default function ArcadeOptionPage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="mx-auto flex w-full justify-center px-md md:w-4/5">
            {children}
        </main>
    );
}
