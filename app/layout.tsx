// lib
import type { Metadata } from "next";

// styles
import { nunito } from "./ui/fonts";

import "./globals.css";

// components
import Header from "./ui/components/shared/header";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body className={nunito.className + " bg-dark-1 text-light"}>
                <header>
                    <Header />
                </header>
                <main className="pt-2xl">{children}</main>
            </body>
        </html>
    );
}
