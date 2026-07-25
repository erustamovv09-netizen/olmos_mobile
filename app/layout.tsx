import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Olmos Mobile",
  description: "Tanish bilishdan ham arzon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${outfit.variable} antialiased`}>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
