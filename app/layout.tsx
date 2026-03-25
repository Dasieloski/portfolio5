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

const BASE_URL = "https://dasiel.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dasiel Torres — Fullstack Developer",
    template: "%s | Dasiel Torres",
  },
  description:
    "Dasiel Torres, Desarrollador Fullstack especializado en React, Next.js, Node.js y PostgreSQL. Portafolio de proyectos web modernos y escalables.",
  keywords: [
    "Dasiel",
    "Dasiel Torres",
    "Dasiel developer",
    "Dasiel fullstack",
    "fullstack developer",
    "React developer",
    "Next.js developer",
    "Node.js",
    "portfolio",
    "desarrollador web",
    "dasiel.vercel.app",
  ],
  authors: [{ name: "Dasiel Torres", url: BASE_URL }],
  creator: "Dasiel Torres",
  publisher: "Dasiel Torres",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Dasiel Torres — Fullstack Developer",
    description:
      "Dasiel Torres, Desarrollador Fullstack especializado en React, Next.js, Node.js y PostgreSQL.",
    url: BASE_URL,
    siteName: "Dasiel Torres Portfolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dasiel Torres — Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dasiel Torres — Fullstack Developer",
    description:
      "Dasiel Torres, Desarrollador Fullstack especializado en React, Next.js, Node.js y PostgreSQL.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "",
  },
};

import SmoothScrollProvider from '@/app/components/SmoothScrollProvider';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dasiel Torres",
  url: "https://dasiel.vercel.app",
  jobTitle: "Fullstack Developer",
  description:
    "Desarrollador Fullstack especializado en React, Next.js, Node.js y PostgreSQL.",
  knowsAbout: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript", "Fullstack Development"],
  sameAs: [
    "https://github.com/Dasieloski",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmMono.variable} ${fraunces.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
