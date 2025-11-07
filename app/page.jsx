import Hero from "../components/Hero";
import OurStory from "../components/OurStory";
import ChoisirNous from "../components/ChoisirNous";
import Showroom from "../components/Showroom";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pari Dor",
    "description": "Fabricant marocain d'ameublement haut de gamme depuis 10+ ans : matelas premium, canapés sur mesure, banquettes élégantes et têtes de lit.",
    "url": "https://paridor.vercel.app",
    "telephone": "+212-XXX-XXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BLOC A3 N° 80, Hay Al Qods",
      "addressLocality": "Agadir",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.4278",
      "longitude": "-9.5981"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$$",
    "image": "https://paridor.vercel.app/logo.png"
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


