import dynamic from "next/dynamic";

// Dynamic imports pour code-splitting - composants lourds chargés à la demande
const Hero = dynamic(() => import("../components/Hero"), { ssr: true });
const OurStory = dynamic(() => import("../components/OurStory"), { ssr: true });
const ChoisirNous = dynamic(() => import("../components/ChoisirNous"), { ssr: true });
const Showroom = dynamic(() => import("../components/Showroom"), { ssr: true });
const Testimonials = dynamic(() => import("../components/Testimonials"), { ssr: true });
const Contact = dynamic(() => import("../components/Contact"), { ssr: true });

// Revalidation pour mise à jour périodique du contenu statique
export const revalidate = 3600; // 1 heure

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://paridor.vercel.app";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pari Dor",
    "description": "Fabricant marocain de meubles et literie haut de gamme : Pari Dor unit élégance et savoir-faire local. Canapés, matelas et mobilier de luxe fabriqués à Agadir, Maroc.",
    "url": baseUrl,
    "telephone": "+212-670-873-718",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BLOC A3 N° 80, Hay Al Qods",
      "addressLocality": "Agadir",
      "addressRegion": "Souss-Massa",
      "postalCode": "80000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.4278",
      "longitude": "-9.5981"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$$",
    "image": `${baseUrl}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/paridor",
      "https://www.instagram.com/paridor"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <OurStory />
      <ChoisirNous />
      <Showroom />
      <Testimonials />
      <Contact />
    </>
  );
}


