export const metadata = {
  title: "Catalogue — Meubles & Matelas sur mesure | Pari Dor",
  description: "Découvrez notre catalogue complet de meubles haut de gamme : matelas premium, canapés sur mesure, banquettes élégantes et têtes de lit. Artisanat marocain authentique.",
  keywords: "catalogue meubles maroc, canapés sur mesure, matelas premium, banquettes, têtes de lit, mobilier haut de gamme",
  openGraph: {
    title: "Catalogue — Meubles & Matelas sur mesure | Pari Dor",
    description: "Découvrez notre catalogue complet de meubles haut de gamme. Artisanat marocain authentique.",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Catalogue Pari Dor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogue — Meubles & Matelas sur mesure | Pari Dor",
    description: "Découvrez notre catalogue complet de meubles haut de gamme.",
  },
};

export default function ProduitsLayout({ children }) {
  return children;
}


