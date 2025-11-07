export const metadata = {
  title: "Nos Créations — Salons & Lits sur mesure | Pari Dor",
  description: "Explorez notre portfolio de réalisations sur mesure. Chaque pièce raconte une histoire unique, conçue avec passion et savoir-faire artisanal marocain.",
  keywords: "créations sur mesure, salons sur mesure, lits sur mesure, meubles personnalisés, artisanat marocain",
  openGraph: {
    title: "Nos Créations — Salons & Lits sur mesure | Pari Dor",
    description: "Explorez notre portfolio de réalisations sur mesure. Artisanat d'exception.",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Créations Pari Dor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Créations — Salons & Lits sur mesure | Pari Dor",
    description: "Explorez notre portfolio de réalisations sur mesure.",
  },
};

export default function CreationsLayout({ children }) {
  return children;
}

