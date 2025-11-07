"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileButtons() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        setIsHidden(true);
      }
    };

    const handleFocusOut = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        // Petit délai pour éviter les clignotements
        setTimeout(() => setIsHidden(false), 100);
      }
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <>
      {/* Bouton WhatsApp - Toutes les pages */}
      <motion.a
        href="https://wa.me/212678978999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHidden ? 0 : 1, 
          scale: isHidden ? 0 : 1,
          pointerEvents: isHidden ? "none" : "auto"
        }}
        transition={{ 
          delay: isHidden ? 0 : 1.2, 
          type: "spring", 
          damping: 18, 
          stiffness: 160 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Contacter via WhatsApp"
        id="whatsapp-btn"
      >
        <div 
          className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl" 
          style={{ backgroundColor: "#25D366" }}
        >
          <MessageCircle className="h-6 w-6 text-white transition-transform" />
        </div>
      </motion.a>
    </>
  );
}
