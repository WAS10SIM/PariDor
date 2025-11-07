export const metadata = {
  title: "Catalogue — Meubles & Matelas sur mesure | Pari Dor",
  description: "Explorez notre collection complète de meubles d'exception. Filtrez par catégorie et prix pour trouver la pièce parfaite. Artisanat marocain authentique.",
  keywords: "catalogue meubles, canapés, matelas, banquettes, têtes de lit, mobilier haut de gamme maroc",
  openGraph: {
    title: "Catalogue — Meubles & Matelas sur mesure | Pari Dor",
    description: "Explorez notre collection complète de meubles d'exception.",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Catalogue Pari Dor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogue — Meubles & Matelas sur mesure | Pari Dor",
    description: "Explorez notre collection complète de meubles d'exception.",
  },
};

export default function CatalogueLayout({ children }) {
  return children;
}

