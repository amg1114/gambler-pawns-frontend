// lib
import type { Metadata } from "next";

// styles
import "./globals.css";

import { nunito } from "./ui/fonts";

// components
import Providers from "./ui/components/Providers";
import Header from "./ui/components/shared/header";
import Footer from "./ui/components/shared/footer";

import Sidebar from "./ui/components/shared/Sidebar";
import { useState } from "react";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Gambler Pawns",
    default: "Gambler Pawns",
  },
  description: "A chess game with a twist",
  category: "Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={nunito.className + " bg-dark-1 text-light"}>
        <Providers>
          <main className="min-h-screen w-full flex-1">
            <Header />
            {children}
          </main>
          <Footer />|
        </Providers>
      </body>
    </html>
  );
}
