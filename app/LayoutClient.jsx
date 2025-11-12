"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import NavbarPublic from "../components/NavbarPublic";
import HydrationFix from "../components/HydrationFix";
import Loader from "../components/Loader";
import ScrollProgress from "../components/ScrollProgress";
import MiniCart from "../components/MiniCart";

// Code-splitting pour les composants lourds - chargement différé après TTI
const Footer = dynamic(() => import("../components/Footer"), { ssr: true });
const MobileButtons = dynamic(() => import("../components/MobileButtons"), { 
  ssr: false,
  loading: () => null // Pas de loader pour éviter les sauts visuels
});
const ScrollToTop = dynamic(() => import("../components/ScrollToTop"), { 
  ssr: false,
  loading: () => null
});
// Preloader supprimé pour éliminer le délai initial - le contenu s'affiche immédiatement

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const [isInteractive, setIsInteractive] = useState(false);
  
  // Scroll to top sur changement de route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  
  // Détecter quand la page est interactive (TTI)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Marquer comme interactif après un court délai pour laisser le rendu initial se terminer
      const timer = setTimeout(() => {
        setIsInteractive(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Vérifier si on est sur une page admin
  const isAdminPage = pathname?.startsWith("/admin");
  // Masquer le footer sur la page success pour un rendu plus professionnel
  const isSuccessPage = pathname === "/success" || pathname?.startsWith("/success") || pathname?.includes("/succes");
  
  // Charger Stripe uniquement sur la page checkout et après TTI
  const isCheckoutPage = pathname === "/checkout";

  return (
    <div suppressHydrationWarning>
      <HydrationFix />
      
      {/* Loader d'accueil luxueux - Optimisé pour la performance */}
      <Loader />
      
      {/* Barre de progression de scroll dorée */}
      <ScrollProgress />
      
      {/* Scripts chargés après TTI pour ne pas bloquer le rendu initial */}
      {isInteractive && isCheckoutPage && (
        <Script
          src="https://js.stripe.com/v3/"
          strategy="lazyOnload"
        />
      )}
      
      {/* Navbar publique (masquée sur pages admin) - Chargée immédiatement */}
      {!isAdminPage && <NavbarPublic />}
      
      {/* Contenu principal - Rendu immédiat sans délai avec transition fade */}
      <main
        className={`page-transition ${isSuccessPage ? "min-h-screen" : "min-h-[80vh]"}`}
        suppressHydrationWarning
        key={pathname}
      >
        {children}
      </main>

      {/* Footer (masqué sur pages admin et success) */}
      {!isAdminPage && !isSuccessPage && <Footer />}
      
      {/* Boutons mobiles (masqués sur pages admin et success) */}
      {!isAdminPage && !isSuccessPage && <MobileButtons />}
      
      {/* Mini-panier sticky (mobile uniquement) */}
      {!isAdminPage && !isSuccessPage && <MiniCart />}
      
      {/* Scroll to top (visible partout) */}
      <ScrollToTop />
    </div>
  );
}











