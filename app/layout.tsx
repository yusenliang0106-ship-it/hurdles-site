import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The Hurdles brand faces: Archivo for headings and labels, Source Serif 4 for reading.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--display-face",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--serif-face",
});

export const metadata: Metadata = {
  title: "Hurdles: Training for the Individual",
  description:
    "Every hurdler faces the same barriers. That doesn't mean every hurdler should be trained the same way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
