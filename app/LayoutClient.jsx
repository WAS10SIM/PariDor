"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavbarPublic from "../components/NavbarPublic";
import Footer from "../components/Footer";
import MobileButtons from "../components/MobileButtons";
import ScrollToTop from "../components/ScrollToTop";
import Preloader from "../components/Preloader";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  
  // Vérifier si on est sur une page admin
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      <Preloader />
      
      {/* Navbar publique (masquée sur pages admin) */}
      {!isAdminPage && <NavbarPublic />}
      
      {/* Transitions de page */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Footer (masqué sur pages admin) */}
      {!isAdminPage && <Footer />}
      
      {/* Boutons mobiles (masqués sur pages admin) */}
      {!isAdminPage && <MobileButtons />}
      
      {/* Scroll to top (visible partout) */}
      <ScrollToTop />
    </>
  );
}






