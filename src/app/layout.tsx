import type { Metadata } from "next";
// import { Outfit } from "next/font/google";
import "./globals.css";

// const outfit = Outfit({
//   subsets: ["latin"],
//   weight: "400",
// });

export const metadata: Metadata = {
  title: "plgrnd",
  description: "test test test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
