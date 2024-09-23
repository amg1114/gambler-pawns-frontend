export default function StyleGuidePage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="mx-auto w-full px-md md:w-4/5 md:max-w-screen-sm">
            {children}
        </main>
    );
}
