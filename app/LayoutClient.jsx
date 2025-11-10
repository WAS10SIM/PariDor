"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import NavbarPublic from "../components/NavbarPublic";
import HydrationFix from "../components/HydrationFix";

// Code-splitting pour les composants lourds
const Footer = dynamic(() => import("../components/Footer"), { ssr: true });
const MobileButtons = dynamic(() => import("../components/MobileButtons"), { ssr: false });
const ScrollToTop = dynamic(() => import("../components/ScrollToTop"), { ssr: false });
const Preloader = dynamic(() => import("../components/Preloader"), { ssr: false });

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  
  // Scroll to top sur changement de route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  
  // Vérifier si on est sur une page admin
  const isAdminPage = pathname?.startsWith("/admin");
  // Masquer le footer sur la page success pour un rendu plus professionnel
  const isSuccessPage = pathname === "/success" || pathname?.startsWith("/success") || pathname?.includes("/succes");

  return (
    <>
      <HydrationFix />
      <Preloader />
      
      {/* Navbar publique (masquée sur pages admin) */}
      {!isAdminPage && <NavbarPublic />}
      
      {/* Transitions de page */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={isSuccessPage ? "min-h-screen" : "min-h-[80vh]"}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Footer (masqué sur pages admin et success) */}
      {!isAdminPage && !isSuccessPage && <Footer />}
      
      {/* Boutons mobiles (masqués sur pages admin et success) */}
      {!isAdminPage && !isSuccessPage && <MobileButtons />}
      
      {/* Scroll to top (visible partout) */}
      <ScrollToTop />
    </>
  );
}











