
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/components/shared/header";
import Providers from "./ui/components/Providers";
import Sidebar from "./ui/components/shared/Sidebar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

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

            <body className={inter.className + " bg-dark-1 text-light"}>
                <Providers>
                    <div className="flex">
                        <main className="flex-1 pt-2x1 min-h-screen w-full">
                            <Header />
                            {children}
                        </main>
                    </div>
                    
                </Providers>

            </body>
        </html >
    );
}
