export const metadata = {
  title: "Pari Dor — L'art du confort sur mesure | Meubles Haut de Gamme Maroc",
  description:
    "Fabricant marocain d'ameublement haut de gamme depuis 10+ ans : matelas premium, canapés sur mesure, banquettes élégantes et têtes de lit. Artisanat marocain authentique, 100% fait au Maroc à Agadir. Livraison dans tout le royaume.",
  keywords: "meubles maroc, canapés sur mesure, matelas premium, banquettes, têtes de lit, ameublement Agadir, mobilier marocain, artisanat maroc",
  authors: [{ name: "Pari Dor" }],
  openGraph: {
    title: "Pari Dor — L'art du confort sur mesure",
    description:
      "Créateur de meubles d'exception au Maroc. Matelas, canapés, banquettes sur mesure. 10+ ans d'excellence artisanale.",
    type: "website",
    locale: "fr_FR",
    siteName: "Pari Dor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pari Dor — L'art du confort sur mesure",
    description: "Meubles haut de gamme 100% marocains. Artisanat d'exception depuis 10+ ans.",
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
      </head>
      <body className="bg-beige">
        <ToastProvider>
          <CartProvider>
            <LayoutClient>{children}</LayoutClient>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}


