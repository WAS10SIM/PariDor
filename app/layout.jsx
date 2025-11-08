export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app'),
  title: "Pari Dor — L'art du confort sur mesure au Maroc | Meubles & Literie Haut de Gamme",
  description:
    "Fabricant marocain de meubles et literie haut de gamme : Pari Dor unit élégance et savoir-faire local. Canapés, matelas et mobilier de luxe fabriqués à Agadir, Maroc.",
  keywords: "meubles maroc, canapés sur mesure, matelas premium, banquettes, têtes de lit, ameublement Agadir, mobilier marocain, artisanat maroc, literie haut de gamme",
  authors: [{ name: "Pari Dor" }],
  openGraph: {
    title: "Pari Dor — Meubles & Literie Haut de Gamme",
    description:
      "Canapés, matelas et mobilier de luxe fabriqués au Maroc. Artisanat d'exception depuis 10+ ans.",
    url: "https://paridor.vercel.app",
    type: "website",
    locale: "fr_FR",
    siteName: "Pari Dor",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Pari Dor - Meubles haut de gamme marocains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pari Dor — L'art du confort sur mesure",
    description: "Meubles et literie premium conçus à Agadir, Maroc.",
  },
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
};

import "./globals.css";
import LayoutClient from "./LayoutClient";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../components/toast/ToastProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#C7A451" />
      </head>
      <body className="bg-[#FAF8F5]">
        <ToastProvider>
          <CartProvider>
            <LayoutClient>{children}</LayoutClient>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}


