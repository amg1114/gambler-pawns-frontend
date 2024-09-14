import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/components/shared/header";
import  Providers  from "./ui/components/Providers";

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
                <header>
                    <Header />
                </header>
                <main className="pt-2xl">{children}</main>
            </body>
        </html>
    );
  return (
    <html lang="en">

      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
          </body>
    </html>
  );
}
