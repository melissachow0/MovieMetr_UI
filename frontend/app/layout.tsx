import type { Metadata } from "next";
import { Inter } from "next/font/google"; // TODO: FIND FONTS
import "@/ui/global.css";
import Header from "@/ui/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Meter",
  description: "TODO", //TODO: METADATA
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}