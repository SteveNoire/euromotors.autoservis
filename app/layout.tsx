import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://euromotors.cz"),
  title: "Kompletní opravy a údržba vozidel | Autoservis EURO-MOTORS",
  description:
    "V Praze 10 provádíme kompletní opravy a údržbu osobních i užitkových vozů všech značek. Zaručujeme vysokou kvalitu práce! Obraťte se na náš autoservis ještě dnes!",
  keywords: [
    "opravy a údržba vozidel",
    "autoservis",
    "autoopravna",
    "autoservis praha",
    "spolehlivý autoservis",
  ],
  authors: [
    {
      name: "euromotorsofficial",
      url: "https://euromotors.cz/author/euromotorsofficial/",
    },
  ],
  alternates: {
    canonical: "/",
    languages: {
      "cs-CZ": "/",
      "ru-CZ": "/ru",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Kompletní opravy a údržba vozidel | Autoservis EURO-MOTORS",
    description:
      "V Praze 10 provádíme kompletní opravy a údržbu osobních i užitkových vozů všech značek. Zaručujeme vysokou kvalitu práce! Obraťte se na náš autoservis ještě dnes!",
    url: "/",
    siteName: "shopshop.cz",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompletní opravy a údržba vozidel | Autoservis EURO-MOTORS",
    description:
      "V Praze 10 provádíme kompletní opravy a údržbu osobních i užitkových vozů všech značek. Zaručujeme vysokou kvalitu práce! Obraťte se na náš autoservis ještě dnes!",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
  },
  other: {
    "og:updated_time": "2024-11-15T20:31:40+01:00",
    "article:published_time": "2024-03-11T12:45:46+01:00",
    "article:modified_time": "2024-11-15T20:31:40+01:00",
    "twitter:label1": "Napsal/a:",
    "twitter:data1": "euromotorsofficial",
    "twitter:label2": "Doba čtení",
    "twitter:data2": "Méně než minuta",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-192x192.png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
    other: {
      rel: "msapplication-TileImage",
      url: "/mstile-270x270.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
