import type { Metadata } from "next";
import { Syne, DM_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["100", "300"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dasiel — Fullstack Developer",
  description:
    "Desarrollador Fullstack especializado en crear aplicaciones web modernas y escalables. Experiencia en React, Next.js, Node.js, PostgreSQL y más.",
  keywords: ["fullstack developer", "React", "Next.js", "Node.js", "portfolio", "Dasiel"],
  authors: [{ name: "Dasiel", url: "https://dasiel.vercel.app" }],
  openGraph: {
    title: "Dasiel — Fullstack Developer",
    description:
      "Desarrollador Fullstack especializado en crear aplicaciones web modernas y escalables.",
    url: "https://dasiel.vercel.app",
    siteName: "Dasiel Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dasiel — Fullstack Developer",
    description: "Desarrollador Fullstack especializado en crear aplicaciones web modernas.",
  },
};

import SmoothScrollProvider from '@/app/components/SmoothScrollProvider';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmMono.variable} ${fraunces.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
