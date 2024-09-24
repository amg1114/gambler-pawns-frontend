import { Bungee, Nunito, Azeret_Mono } from "next/font/google";

export const bungee = Bungee({ subsets: ["latin"], weight: ["400"] });

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "300", "600"],
});

export const azeret_mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "300", "600", "700"],
});
