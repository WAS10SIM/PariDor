export const metadata = {
  title: "Notre Histoire — Artisanat Marocain d'Excellence | Pari Dor",
  description: "Plus de 10 ans d'excellence artisanale au service du confort et de l'élégance. Découvrez l'histoire de Pari Dor, fabricant marocain de meubles haut de gamme.",
  keywords: "histoire Pari Dor, artisanat marocain, meubles Agadir, fabricant meubles maroc, 10 ans d'expérience",
  openGraph: {
    title: "Notre Histoire — Artisanat Marocain d'Excellence | Pari Dor",
    description: "Plus de 10 ans d'excellence artisanale au service du confort et de l'élégance.",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Notre Histoire Pari Dor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notre Histoire — Artisanat Marocain d'Excellence | Pari Dor",
    description: "Plus de 10 ans d'excellence artisanale.",
  },
};

export default function NotreHistoireLayout({ children }) {
  return children;
}

