// lib
import type { Metadata } from "next";

// styles
import "./globals.css";

import { nunito } from "./ui/fonts";

// components
import Providers from "./lib/contexts/Providers";
import Header from "./ui/components/shared/Header";
import Footer from "./ui/components/shared/Footer";

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
      <body
        className={nunito.className + " z-0 bg-dark-1 text-light"}
        id="primary-container"
      >
        <Providers>
          <Header />
          <main className="min-h-screen w-full flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
